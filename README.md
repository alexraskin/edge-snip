# EdgeSnip - URL Shortener

EdgeSnip is URL Shortener built with [Cloudflare Workers](https://workers.cloudflare.com/)

## See it in action

Send a POST request to `https://edgesnip.dev/` with the following body

```json
{
    "url": "https://google.com"
}
```

## Installation

You will need to create a `wrangler.toml` file in the root. [docs](https://developers.cloudflare.com/workers/wrangler/configuration/)

```bash
npm install
npm run dev
```

## License

[MLP 2.0](https://choosealicense.com/licenses/mpl-2.0/)