/* eslint-disable no-console */

// 通用骰子函式
function rollDice(times, sides, bonus = 0, multiplier = 1) {
  let total = 0;
  for (let i = 0; i < times; i++) {   total += Math.floor(Math.random() * sides) + 1;
  }
  return (total + bonus) * multiplier;
}
//隨機角色設定
function getRandomOption(selectId) {
  const select = document.getElementById(selectId);
  if (select.value === "隨機") {
    const options = Array.from(select.options).filter(opt => opt.value !== "隨機");
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex].value;
  }
  return select.value;
}
{
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


const character = {
  name,
  age,
  gender,
  location,
  birthplace,
  attributes
};

// 儲存到 localStorage
localStorage.setItem("characterData", JSON.stringify(character));

// 跳轉到顯示頁（例如 result.html）
function generateCharacter() 
  // ...取得資料...
  const character = { /* 名字、年齡、屬性等 */ };
  localStorage.setItem("characterData", JSON.stringify(character));

window.location.href = "character.html";
}