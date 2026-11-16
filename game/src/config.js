// Kestrel Relay's tuning, all in one module. Every other system reads its numbers
// from here, so the balance the HUD shows and the balance the sim plays are never
// two different games. Change a value here and the whole game follows.
export const CONFIG = {
  // A round lasts 100 s after an 8 s freeze. First side to 5 rounds wins the match,
  // and no match runs past 9 rounds.
  roundSeconds: 100,
  freezeSeconds: 8,
  roundsToWin: 5,
  maxRounds: 9,
  // The spike: 3.5 s held to plant, 5 s to defuse, and 35 s from plant to blast.
  plantSeconds: 3.5,
  defuseSeconds: 5,
  spikeSeconds: 35,
  // The economy: $800 to start, $300 a kill, $300 a plant, $3,250 for a round won
  // and $1,900 for a round lost.
  startMoney: 800,
  killReward: 300,
  plantReward: 300,
  winReward: 3250,
  lossReward: 1900,
  health: 100,
  armorReduction: 0.5,
};

// One row per gun: price, fire mode, damage, headshot multiplier, magazine, spare
// rounds, time between shots, reload time, spread standing and moving, kick, reach
// and tracer colour. The buy menu and the HUD read the same rows.
export const WEAPONS = {
  pistol: { name: 'P9 Sidearm', price: 0, auto: false, damage: 26, headMult: 4, mag: 12, reserve: 36, fireGap: 0.16, reload: 1.4, spreadStill: 0.004, spreadMove: 0.03, kick: 0.006, range: 55, tracer: 0xe8c25a },
  smg: { name: 'VK-9 Ripper', price: 1500, auto: true, damage: 22, headMult: 4, mag: 28, reserve: 84, fireGap: 0.075, reload: 1.9, spreadStill: 0.006, spreadMove: 0.034, kick: 0.007, range: 48, tracer: 0xe8c25a },
  rifle: { name: 'AR-77 Longshot', price: 2700, auto: true, damage: 33, headMult: 4, mag: 30, reserve: 90, fireGap: 0.096, reload: 1.9, spreadStill: 0.0022, spreadMove: 0.028, kick: 0.009, range: 80, tracer: 0xf0a830 },
  sniper: { name: 'LRS-50 Warden', price: 4750, auto: false, damage: 110, headMult: 4, mag: 5, reserve: 15, fireGap: 1.1, reload: 2.8, spreadStill: 0.0004, spreadMove: 0.06, kick: 0.03, range: 120, tracer: 0x9fd8ff },
};

// The grenade: $300, a 6.5 m blast that hurts up to 95, on a 1.6 s fuse.
export const GRENADE = { name: 'Frag grenade', price: 300, radius: 6.5, maxDamage: 95, fuse: 1.6 };

// Kevlar: $650, halves the damage of every hit that lands.
export const ARMOR = { name: 'Kevlar vest', price: 650 };

// The two sides: amber Vipers attack from the south, teal Sentinels defend the north.
export const TEAMS = {
  vipers: { name: 'Vipers', color: 0xf0a830, spawn: { x: 0, z: 20 } },
  sentinels: { name: 'Sentinels', color: 0x7fb4c7, spawn: { x: 0, z: -20 } },
};
