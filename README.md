# Minimal Bluesky Feed Generator (TypeScript)

## Overview

This is a minimalist Feed Generator written in TypeScript. It shows how to host a Feed Generator service, publish the feed so it can be accessed in Bluesky and how to return a hardcoded list of post URIs. The goal is to help you understand the integration of a custom Feed Generator service.

This project does NOT show you how to:
- listen to the Firehose (or Jetstream)
- store relevant posts in a database
- implement multiple feed algorithms
- use a cursor to implement paging
- remove stored posts that are no longer needed


## Getting Started
 1. Clone the repo and install dependencies

 ```sh
 $ git clone https://github.com/rmtuckerphx/minimal-bluesky-feed-typescript

 $ cd minimal-bluesky-feed-typescript
 $ npm install
 ```

2. Copy [.env.example](.env.example) to `.env` and update the value of `FEEDGEN_HOSTNAME`. If you know the host name of the server where this code will be deployed, go ahead and update now. You need to update the value of `FEEDGEN_HOSTNAME` before you can run the service or call `/scripts/publishFeedGen.ts`.

**You can choose to deploy the code to a server now.**

3. Build the code

```sh
$ npm run build
```

4. Deploy the code in `/dist` to whatever server you want.


**OR, you can run it on localhost and use a tool like `ngrok` to expose it to the internet.**

5. Install [ngrok](https://download.ngrok.com) on your local machine and create a free account.

6. Run `ngrok` pointing to the localhost:port that the local server will be running at. This can be done even if the local server is not running.

It is easier if you do this in a second terminal window.

```sh
$ ngrok http http://localhost:3000
```
Copy the Forwarding endpoint that starts with "https" and ends with ".ngrok-free.app". The portion after "https://" is the `FEEDGEN_HOSTNAME` that you need to save to `.env`.

NOTE: If you cancel the `ngrok` process and start it again, a new and temporary hostname will be generated.

7. Now run the local Feed Generator service:

```sh
$ npm start
```

8. Test these local and forwarded URLs to make sure the server is running correctly:

- http://localhost:3000
- http://localhost:3000/.well-known/did.json
- http://localhost:3000/xrpc/app.bsky.feed.getFeedSkeleton

- https://xyz.ngrok-free.app (update "xyz." with the generated ngrok subdomain)
- https://xyz.ngrok-free.app/.well-known/did.json
- https://xyz.ngrok-free.app/xrpc/app.bsky.feed.getFeedSkeleton

9. Publish the Feed so Bluesky can see it. This is best done in a new terminal window separate from the one that is running ngrok and the other that is running the local feed server. Remember that you must set `FEEDGEN_HOSTNAME` in `.env` to the ngrok generated hostname.

```sh
$ npm run publishFeed
```

Answer the prompts to link the feed to your account. Feel free to accept the defaults.

10. In Bluesky, go to your Profile and click the Feeds tab. Your feed should be listed. Click on the feed and you should see the hardcoded posts that make up this feed.


11. Unpublish the feed. When you are done with your local testing, unpublish the feed:

```sh
$ npm run unpublishFeed
```

## Links
- [Video: Absolute Minimum Bluesky Feed Generator using TypeScript](https://www.youtube.com/watch?v=iRIcPKS-C1U)
- [Bluesky Developer Guide](https://github.com/rmtuckerphx/bluesky-developer-guide)
- [Video: Developer Quick Start to Bluesky, AT Protocol and Jetstream](https://www.youtube.com/watch?v=DYc9enmwu5Y)
- [AT Proto Browser](https://atproto-browser.vercel.app)
- [GitHub: bluesky-social/feed-generator (TypeScript)](https://github.com/bluesky-social/feed-generator/blob/c14c54bd65eb2ea638e0be4303a4b1af53a211a6/src/well-known.ts)
- [GitHub: MarshalX/bluesky-feed-generator (Python)](https://github.com/MarshalX/bluesky-feed-generator/blob/main/server/app.py)
- [Bluesky Docs: getFeedSkeleton](https://docs.bsky.app/docs/api/app-bsky-feed-get-feed-skeleton)
