// Day one, day seven — entry program for the make.fun TikTok bounty.
//
// The entry itself is the TikTok video named in VIDEO.json. This program
// only has to copy VIDEO.json from the repository into /output; the house
// reads the video itself and writes its counts to /output/video.counts.json.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "VIDEO.json");
if (!existsSync(source)) {
  throw new Error(`VIDEO.json not found in ${botDir}`);
}

// Fail loudly on a malformed VIDEO.json instead of copying it through:
// the gate wants a JSON object whose url is a TikTok video address.
const parsed: unknown = JSON.parse(readFileSync(source, "utf8"));
const url = (parsed as { url?: unknown } | null)?.url;
if (typeof url !== "string" || !url.includes("tiktok.com/")) {
  throw new Error("VIDEO.json must hold a TikTok video url");
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, join(outputDir, "VIDEO.json"));
