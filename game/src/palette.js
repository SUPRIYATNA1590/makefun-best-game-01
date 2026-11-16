// The art direction, as data. Kestrel Relay is a desert relay station at dusk:
// warm sand and rust below, a violet dusk sky above, amber for the Vipers and cool
// teal for the Sentinels. The scene lighting derives every shade the game needs from
// these, so no colour literal appears anywhere else. index.html uses the same names
// as its CSS custom properties.
export const PALETTE = {
  canvas: '#2f2438', // the dusk sky, and the page behind the canvas
  surface: '#3a2f26', // packed sand and poured concrete
  hairline: '#5c4a38', // crates, low barriers, cover
  ink: '#efe7d8', // sun-bleached walls, and the HUD text
  muted: '#9a8d7a', // shadowed metal, distant shapes
  accent: '#f0a830', // Viper amber: spike, buy menu, tracers
  sentinel: '#7fb4c7', // Sentinel teal: their markers, their site
  rust: '#8a4a2a', // container rust, the antenna mast
  olive: '#6a6a4a', // sandbags, camo netting
};

// Look a palette entry up by name; a missing name gives undefined, same as indexing.
export const shade = (name) => PALETTE[name];
