export const TICK_RATE = 3000; // 3000 ms = 3s
export const ICONS = ["fish", "poop", "weather"];
export const RAIN_CHANCE = .2;
export const SCENE = ["day", "rain"];
export const DAY_LENGTH = 60;
export const NIGHT_LENGTH = 4;

export const getNextHungryTime = (clock) => {
  return Math.floor(Math.random() * 3) + 5 + clock;
}

export const getNextDieTime = (clock) => {
  return Math.floor(Math.random() * 3) + 3 + clock;
}