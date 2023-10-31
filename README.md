# EdgeSnip - URL Shortener

[![Image from Gyazo](https://i.gyazo.com/22139039fd2777c89c0446eda8fce993.png)](https://gyazo.com/22139039fd2777c89c0446eda8fce993)

EdgeSnip - URL Shortener built with [Cloudflare Workers](https://workers.cloudflare.com/)

## See it in action

Send a POST request to `https://edgesnip.dev/` with the following body

```json
{
    "url": "https://google.com"
}
```

Or visit [https://edgesnip.dev/](https://edgesnip.dev/) to see the UI

_frontend is not my strong suit lol_

## Installation

You will need to create a `wrangler.toml` file in the root. [docs](https://developers.cloudflare.com/workers/wrangler/configuration/)

```bash
npm install
npm run dev
```

## License

[MLP 2.0](https://choosealicense.com/licenses/mpl-2.0/)
