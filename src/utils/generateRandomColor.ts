export default function generateRandomColor({
  minBrightness = 30,
  maxBrightness = 200,
}: { minBrightness?: number; maxBrightness?: number } = {}): string {
  const randomChannel = () =>
    Math.floor(
      Math.random() * (maxBrightness - minBrightness + 1) + minBrightness
    );

  const r = randomChannel();
  const g = randomChannel();
  const b = randomChannel();

  // Convert RGB to hex
  const hexCode = `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}`;

  return hexCode;
}
