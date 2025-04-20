/* eslint-disable no-console */

// 通用骰子函式
function rollDice(times, sides, bonus = 0, multiplier = 1) {
  let total = 0;
  for (let i = 0; i < times; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return (total + bonus) * multiplier;
}

// 能力清單 + 骰法設定
const attributes = [
  { name: "力量 STR",      roll: () => rollDice(3, 6, 0, 5) },
  { name: "體質 CON",      roll: () => rollDice(3, 6, 0, 5) },
  { name: "體型 SIZ",      roll: () => rollDice(2, 6, 6, 5) },
  { name: "敏捷 DEX",      roll: () => rollDice(3, 6, 0, 5) },
  { name: "外貌 APP",      roll: () => rollDice(3, 6, 0, 5) },
  { name: "智力 INT",      roll: () => rollDice(2, 6, 6, 5) },
  { name: "意志 POW",      roll: () => rollDice(3, 6, 0, 5) },
  { name: "教育 EDU",      roll: () => rollDice(2, 6, 6, 5) },
  { name: "幸運 LUCK",    roll: () => rollDice(3, 6, 0, 5) }
];

// 執行所有屬性擲骰並輸出結果
attributes.forEach(attr => {
  const result = attr.roll();
  console.log(`${attr.name}：${result}`);
});
