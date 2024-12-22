import dotenv from 'dotenv'
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

dotenv.config()

app.get('/', (req: Request, res: Response) => {
  res.send(`Minimal Bluesky (atproto) Feed Generator - ${new Date().toISOString()}`);
});

app.get('/.well-known/did.json', (req: Request, res: Response) => {
  res.json({
    '@context': ['https://www.w3.org/ns/did/v1'],
    'id': `did:web:${process.env.FEEDGEN_HOSTNAME}`,
    'service': [
      {
        'id': '#bsky_fg',
        'type': 'BskyFeedGenerator',
        'serviceEndpoint': `https://${process.env.FEEDGEN_HOSTNAME}`
      }
    ]
  })
});

app.get('/xrpc/app.bsky.feed.getFeedSkeleton', (req: Request, res: Response) => {
  // TODO: use algorithm to create list of post URIs for feed

  // Hardcode feed for now
  const feed = [
    { post: 'at://did:plc:f3ogrsjaauomtyodoxmyuuig/app.bsky.feed.post/3lduckan53s2c' },
    { post: 'at://did:plc:f3ogrsjaauomtyodoxmyuuig/app.bsky.feed.post/3ldqxfhdxgs27' },
    { post: 'at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.post/3lc4n2cohf22a' },
  ];

  res.json({
    feed,
  })
});


app.listen(port, () => {
  console.log(`Local server listening on port: ${port}`);
});