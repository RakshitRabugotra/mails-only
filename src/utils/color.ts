export function rgbaToAndroidHex(color: string): string {
  const match = color.match(
    /rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([\d.]+))?\s*\)/i
  );

  if (!match) {
    throw new Error(`Invalid RGB(A) color format: ${color}`);
  }

  const [, rStr, gStr, bStr, aStr] = match;
  const r = Number(rStr);
  const g = Number(gStr);
  const b = Number(bStr);
  const a = aStr !== undefined ? parseFloat(aStr) : 1;

  if ([r, g, b].some(n => isNaN(n) || n < 0 || n > 255) || isNaN(a) || a < 0 || a > 1) {
    throw new Error(`Color values out of range in: ${color}`);
  }

  const alpha = Math.round(a * 255);

  const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();

  return `#${toHex(alpha)}${toHex(r)}${toHex(g)}${toHex(b)}`;
}
