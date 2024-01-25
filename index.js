export function darken(hexColor, percentage = 0.5) {
  percentage = Math.min(1, Math.max(0, percentage));

  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  const adjust = 1 - percentage;
  r = Math.floor(r * adjust);
  g = Math.floor(g * adjust);
  b = Math.floor(b * adjust);

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  const darkenedHexColor = `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)}`;

  return darkenedHexColor;
}

export function lighten(hexColor, percentage = 0.5) {
  percentage = Math.min(1, Math.max(0, percentage));

  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  const adjust = 1 + percentage;

  r = Math.min(255, Math.floor(r * adjust));
  g = Math.min(255, Math.floor(g * adjust));
  b = Math.min(255, Math.floor(b * adjust));

  const lightenedHexColor = `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)}`;

  return lightenedHexColor;
}
