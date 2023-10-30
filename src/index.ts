import { Hono, Context } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { KVNamespace } from "@cloudflare/workers-types";
import { z } from "zod";

import indexHtml from './public/index.html'

type Bindings = {
  MY_BUCKET: KVNamespace;
  HOST_URL: string;
};

function generateShortHash(): string {
  return btoa(Math.random() + "").slice(0, 9);
}

const urlSchema = z.string().url();

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", prettyJSON());
app.use("*", cors());

app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

app.get("/", (c) =>
  c.html(indexHtml)
);

app.post("/", async (c: Context) => {
  const json = await c.req.json();
  const longLink = json?.url;

  const validationResult = urlSchema.safeParse(longLink);
  if (!validationResult.success) {
    return c.json({ message: "Invalid URL", ok: false }, 400);
  }
  let slug = generateShortHash();
  let existing = await c.env.SHORTENER_KV.get(slug);
  while (existing) {
    slug = generateShortHash();
    existing = await c.env.SHORTENER_KV.get(slug);
  }
  await c.env.SHORTENER_KV.put(slug, longLink);
  return c.json({ url: `${c.env.HOST_URL}/${slug}` });
});

app.get("/:slug", async (c: Context) => {
  const slug = c.req.param("slug");
  const redirectTo = await c.env.SHORTENER_KV.get(slug);
  if (redirectTo) {
    return c.redirect(redirectTo);
  }
  return c.json({ message: "Not Found", ok: false }, 404);
});

export default app;
