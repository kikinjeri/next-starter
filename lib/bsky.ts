import { BskyAgent } from "@atproto/api";

let agent: BskyAgent | null = null;

export async function getBskyAgent() {
  if (agent) return agent;

  agent = new BskyAgent({ service: "https://bsky.social" });

  await agent.login({
    identifier: process.env.BSKY_HANDLE!,
    password: process.env.BSKY_PASSWORD!,
  });

  return agent;
}

export async function uploadImage(agent: BskyAgent, file: Buffer, alt: string) {
  const blob = await agent.uploadBlob(file, { encoding: "image/jpeg" });

  return {
    $type: "app.bsky.embed.images",
    images: [
      {
        image: blob.data.blob,
        alt,
      },
    ],
  };
}

export async function createPoll(agent: BskyAgent, poll: { options: string[], duration: number }) {
  const record = {
    $type: "app.bsky.feed.post",
    text: "",
    createdAt: new Date().toISOString(),
    embed: {
      $type: "app.bsky.embed.record",
      record: {
        $type: "app.bsky.feed.post",
        facets: [],
        createdAt: new Date().toISOString(),
        embed: {
          $type: "app.bsky.embed.poll",
          options: poll.options.map((text) => ({ text })),
          duration: poll.duration,
        },
      },
    },
  };

  const res = await agent.post(record);
  return res.uri;
}

export async function postToBsky({ text, embed }: { text: string; embed?: any }) {
  const agent = await getBskyAgent();

  const record: any = {
    $type: "app.bsky.feed.post",
    text,
    createdAt: new Date().toISOString(),
  };

  if (embed) record.embed = embed;

  return agent.post(record);
}
