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

export function hexToRGB(hexColor) {
  const hexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (!hexRegex.test(hexColor)) {
    throw new Error("Invalid HEX color code");
  }

  hexColor = hexColor.replace(/^#/, "");

  let r, g, b;
  if (hexColor.length === 3) {
    r = parseInt(hexColor[0] + hexColor[0], 16);
    g = parseInt(hexColor[1] + hexColor[1], 16);
    b = parseInt(hexColor[2] + hexColor[2], 16);
  } else {
    r = parseInt(hexColor.slice(0, 2), 16);
    g = parseInt(hexColor.slice(2, 4), 16);
    b = parseInt(hexColor.slice(4, 6), 16);
  }

  return { r, g, b };
}

export function rgbToHex(r, g, b) {
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  const hexColor = `#${((1 << 24) | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)}`;

  return hexColor;
}

export function hexToHSL(hexColor) {
  const hexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (!hexRegex.test(hexColor)) {
    throw new Error("Invalid HEX color code");
  }

  hexColor = hexColor.replace(/^#/, "");

  let r, g, b;
  if (hexColor.length === 3) {
    r = parseInt(hexColor[0] + hexColor[0], 16);
    g = parseInt(hexColor[1] + hexColor[1], 16);
    b = parseInt(hexColor[2] + hexColor[2], 16);
  } else {
    r = parseInt(hexColor.slice(0, 2), 16);
    g = parseInt(hexColor.slice(2, 4), 16);
    b = parseInt(hexColor.slice(4, 6), 16);
  }

  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;

  const max = Math.max(normalizedR, normalizedG, normalizedB);
  const min = Math.min(normalizedR, normalizedG, normalizedB);

  const lightness = (max + min) / 2;

  let saturation;
  if (max === min) {
    saturation = 0;
  } else {
    saturation =
      lightness > 0.5
        ? (max - min) / (2 - max - min)
        : (max - min) / (max + min);
  }

  let hue;
  if (max === min) {
    hue = 0;
  } else if (max === normalizedR) {
    hue = (60 * ((normalizedG - normalizedB) / (max - min)) + 360) % 360;
  } else if (max === normalizedG) {
    hue = 60 * ((normalizedB - normalizedR) / (max - min)) + 120;
  } else {
    hue = 60 * ((normalizedR - normalizedG) / (max - min)) + 240;
  }

  hue = (hue + 360) % 360;

  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

export function hslToHex(hslColor) {
  const { h, s, l } = hslColor;

  const hue = ((h % 360) + 360) % 360;
  const saturation = Math.min(100, Math.max(0, s));
  const lightness = Math.min(100, Math.max(0, l));

  const normalizedHue = hue / 360;
  const normalizedSaturation = saturation / 100;
  const normalizedLightness = lightness / 100;

  const q =
    normalizedLightness < 0.5
      ? normalizedLightness * (1 + normalizedSaturation)
      : normalizedLightness +
        normalizedSaturation -
        normalizedLightness * normalizedSaturation;
  const p = 2 * normalizedLightness - q;

  const normalizedR = hueToRGB(p, q, normalizedHue + 1 / 3);
  const normalizedG = hueToRGB(p, q, normalizedHue);
  const normalizedB = hueToRGB(p, q, normalizedHue - 1 / 3);

  const r = Math.round(normalizedR * 255);
  const g = Math.round(normalizedG * 255);
  const b = Math.round(normalizedB * 255);

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

export function rgbToHSL(rgbColor) {
  const { r, g, b } = rgbColor;

  const red = Math.min(255, Math.max(0, r));
  const green = Math.min(255, Math.max(0, g));
  const blue = Math.min(255, Math.max(0, b));

  const normalizedRed = red / 255;
  const normalizedGreen = green / 255;
  const normalizedBlue = blue / 255;

  const max = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
  const min = Math.min(normalizedRed, normalizedGreen, normalizedBlue);

  const lightness = (max + min) / 2;

  let saturation;
  if (max === min) {
    saturation = 0;
  } else {
    saturation =
      lightness > 0.5
        ? (max - min) / (2 - max - min)
        : (max - min) / (max + min);
  }

  let hue;
  if (max === min) {
    hue = 0;
  } else if (max === normalizedRed) {
    hue = (60 * ((normalizedGreen - normalizedBlue) / (max - min)) + 360) % 360;
  } else if (max === normalizedGreen) {
    hue = 60 * ((normalizedBlue - normalizedRed) / (max - min)) + 120;
  } else {
    hue = 60 * ((normalizedRed - normalizedGreen) / (max - min)) + 240;
  }

  hue = (hue + 360) % 360;

  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  };
}

export function hslToRGB(hslColor) {
  const { h, s, l } = hslColor;

  const hue = ((h % 360) + 360) % 360;
  const saturation = Math.min(100, Math.max(0, s));
  const lightness = Math.min(100, Math.max(0, l));

  const normalizedHue = hue / 360;
  const normalizedSaturation = saturation / 100;
  const normalizedLightness = lightness / 100;

  const q =
    normalizedLightness < 0.5
      ? normalizedLightness * (1 + normalizedSaturation)
      : normalizedLightness +
        normalizedSaturation -
        normalizedLightness * normalizedSaturation;
  const p = 2 * normalizedLightness - q;

  const normalizedR = hueToRGB(p, q, normalizedHue + 1 / 3);
  const normalizedG = hueToRGB(p, q, normalizedHue);
  const normalizedB = hueToRGB(p, q, normalizedHue - 1 / 3);

  const r = Math.round(normalizedR * 255);
  const g = Math.round(normalizedG * 255);
  const b = Math.round(normalizedB * 255);

  return { r, g, b };
}

export function getComplementaryColor(hexColor) {
  const hexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (!hexRegex.test(hexColor)) {
    throw new Error("Invalid HEX color code");
  }

  hexColor = hexColor.replace(/^#/, "");

  let r, g, b;
  if (hexColor.length === 3) {
    r = parseInt(hexColor[0] + hexColor[0], 16);
    g = parseInt(hexColor[1] + hexColor[1], 16);
    b = parseInt(hexColor[2] + hexColor[2], 16);
  } else {
    r = parseInt(hexColor.slice(0, 2), 16);
    g = parseInt(hexColor.slice(2, 4), 16);
    b = parseInt(hexColor.slice(4, 6), 16);
  }

  let hue = rgbToHSL({ r, g, b }).h;
  hue = (hue + 180) % 360;

  const { r: compR, g: compG, b: compB } = hslToRGB({ h: hue, s: 100, l: 50 });

  const complementaryHexColor = `#${(
    (1 << 24) |
    (compR << 16) |
    (compG << 8) |
    compB
  )
    .toString(16)
    .slice(1)}`;

  return complementaryHexColor;
}

export function blend(hexColor1, hexColor2, weight = 0.5) {
  const hexRegex = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (!hexRegex.test(hexColor1) || !hexRegex.test(hexColor2)) {
    throw new Error("Invalid HEX color code");
  }

  hexColor1 = hexColor1.replace(/^#/, "");
  hexColor2 = hexColor2.replace(/^#/, "");

  const rgbColor1 = {
    r: parseInt(hexColor1.slice(0, 2), 16),
    g: parseInt(hexColor1.slice(2, 4), 16),
    b: parseInt(hexColor1.slice(4, 6), 16),
  };

  const rgbColor2 = {
    r: parseInt(hexColor2.slice(0, 2), 16),
    g: parseInt(hexColor2.slice(2, 4), 16),
    b: parseInt(hexColor2.slice(4, 6), 16),
  };

  const blendedColor = {
    r: Math.round((1 - weight) * rgbColor1.r + weight * rgbColor2.r),
    g: Math.round((1 - weight) * rgbColor1.g + weight * rgbColor2.g),
    b: Math.round((1 - weight) * rgbColor1.b + weight * rgbColor2.b),
  };

  const blendedHexColor = `#${(
    (1 << 24) |
    (blendedColor.r << 16) |
    (blendedColor.g << 8) |
    blendedColor.b
  )
    .toString(16)
    .slice(1)}`;

  return blendedHexColor;
}

function hueToRGB(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
