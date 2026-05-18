import { readFile, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SplatFileType, SpzReader, transcodeSpz } from "@sparkjsdev/spark";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const input = resolve(root, "public", "hero-image-gigapixel.ply");
const output = resolve(root, "public", "hero-image-gigapixel.spz");

function formatSize(size) {
  const units = ["B", "KiB", "MiB", "GiB"];
  let value = size;

  for (const unit of units) {
    if (value < 1024 || unit === units.at(-1)) {
      return `${value.toFixed(2)} ${unit}`;
    }
    value /= 1024;
  }

  return `${size} B`;
}

const fileBytes = await readFile(input);
const { fileBytes: spzBytes, clippedCount } = await transcodeSpz({
  inputs: [
    {
      fileBytes,
      fileType: SplatFileType.PLY,
      pathOrUrl: input,
    },
  ],
});

await writeFile(output, spzBytes);

const reader = new SpzReader({ fileBytes: spzBytes });
await reader.parseHeader();

const inputSize = (await stat(input)).size;
const outputSize = (await stat(output)).size;
const ratio = inputSize / outputSize;

console.log(`Input:  ${input}`);
console.log(`Output: ${output}`);
console.log(`SPZ version: ${reader.version}`);
console.log(`Points: ${reader.numSplats.toLocaleString()}`);
console.log(`Clipped: ${clippedCount.toLocaleString()}`);
console.log(`PLY:    ${formatSize(inputSize)}`);
console.log(`SPZ:    ${formatSize(outputSize)}`);
console.log(`Ratio:  ${ratio.toFixed(2)}x smaller`);
