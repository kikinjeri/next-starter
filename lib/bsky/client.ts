import { BskyAgent } from '@atproto/api';

export async function getBskyAgent() {
  const identifier = process.env.BSKY_HANDLE;
  const password = process.env.BSKY_PASSWORD;

  if (!identifier || !password) {
    throw new Error("Missing Bluesky credentials");
  }

  const agent = new BskyAgent({ service: "https://bsky.social" });

  await agent.login({
    identifier,
    password,
  });

  return agent;
}
