# Client

This is a [Next.js](https://nextjs.org) + Storyblok starter project

## Configure local environment

Create a new `client/.env.development`, paste the following, this will get you rendering Stories from our sample space using the preview (Draft) token.
```
STORYBLOK_REGION=eu

# Preview token:
STORYBLOK_TOKEN=hBAE5oaZPdaIQyb1XKE58wtt
STORYBLOK_VERSION=draft
```

### To run cypress e2e tests

```sh
cd client
pnpm cypress:install
pnpm cypress:open
```

### To run dev server

```sh
cd client
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Access app from Storyblok visual editor

### Generate SSL Certificates

>Storyblok requires **HTTPS** for the Visual Editor. Since Next.js runs on HTTP locally, you can use `local-ssl-proxy` to create an SSL-secured connection.

If you don’t have SSL certificates (localhost.pem and localhost-key.pem), generate them using OpenSSL:

When prompted:

- Enter any values for fields like country, organization, etc.
- For "Common Name (CN)", enter localhost.

This will generate:

- localhost.pem (SSL Certificate)
- localhost-key.pem (Private Key)

```sh
cd client
pnpm openssl:generate-ssls
```

- Start `local-ssl-proxy` in another terminal:

```sh
cd client
pnpm storyblok:proxy
# if you want to give a different port, try below command and update port number
# pnpm local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem
```

- Open [https://localhost:3010](https://localhost:3010) with your browser, and browser may warn `Not Secure` due to Self-Signed SSL certificates. You can simply ignore and click prceed anyway option
- Now, you should able to access app from Storyblok Visual Editor
