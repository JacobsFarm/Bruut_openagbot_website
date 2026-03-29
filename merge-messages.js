// scripts/merge-messages.js
// Merges all JSON files in messages/{locale}/ into messages/{locale}.json
// Run with: node scripts/merge-messages.js

import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join, resolve } from "path";

const messagesDir = resolve("messages");
const locales = readdirSync(messagesDir).filter((entry) =>
  statSync(join(messagesDir, entry)).isDirectory()
);

for (const locale of locales) {
  const localeDir = join(messagesDir, locale);
  const files = readdirSync(localeDir).filter((f) => f.endsWith(".json"));

  let merged = {};

  for (const file of files) {
    const content = JSON.parse(readFileSync(join(localeDir, file), "utf-8"));
    const duplicates = Object.keys(content).filter((key) => key in merged);

    if (duplicates.length > 0) {
      console.warn(
        `⚠️  Duplicate keys in ${locale}/${file}: ${duplicates.join(", ")}`
      );
    }

    merged = { ...merged, ...content };
  }

  const outPath = join(messagesDir, `${locale}.json`);
  writeFileSync(outPath, JSON.stringify(merged, null, 2), "utf-8");
  console.log(`✅ ${locale}.json written (${Object.keys(merged).length} keys)`);
}