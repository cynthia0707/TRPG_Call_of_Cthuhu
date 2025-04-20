/* eslint-disable no-console */

// 通用骰子函式
function rollDice(times, sides, bonus = 0, multiplier = 1) {
  let total = 0;
  for (let i = 0; i < times; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return (total + bonus) * multiplier;
}
//非線性隨機年齡
function getWeightedRandomAge() {
  const pool = [
    ...Array(10).fill().map(() => getRandomBetween(20, 30)),
    ...Array(7).fill().map(() => getRandomBetween(31, 39)),
    ...Array(5).fill().map(() => getRandomBetween(15, 19)),
    ...Array(4).fill().map(() => getRandomBetween(40, 49)),
    ...Array(3).fill().map(() => getRandomBetween(50, 59)),
    ...Array(2).fill().map(() => getRandomBetween(60, 69)),
    ...Array(1).fill().map(() => getRandomBetween(70, 89)),
  ];
  return pool[Math.floor(Math.random() * pool.length)];
  //年齡調整
}
function applyAgeAdjustment(character) {
  const age = parseInt(character.age);
  const attr = character.attributes;
  let eduTests = 0;

  if (age >= 15 && age <= 19) {
    reduceRandomTotal(["STR", "SIZ"], 5, attr);
    attr.EDU -= 5;
    attr.LUCK = Math.max(
      rollDice(3, 6, 0, 5),
      rollDice(3, 6, 0, 5)
    );
  } else if (age <= 39) {
    eduTests = 1;
  } else if (age <= 49) {
    eduTests = 2;
    reduceRandomTotal(["STR", "CON", "DEX"], 5, attr);
    attr.APP -= 5;
  } else if (age <= 59) {
    eduTests = 3;
    reduceRandomTotal(["STR", "CON", "DEX"], 10, attr);
    attr.APP -= 10;
  } else if (age <= 69) {
    eduTests = 4;
    reduceRandomTotal(["STR", "CON", "DEX"], 20, attr);
    attr.APP -= 15;
  } else if (age <= 79) {
    eduTests = 4;
    reduceRandomTotal(["STR", "CON", "DEX"], 40, attr);
    attr.APP -= 20;
  } else if (age <= 89) {
    eduTests = 4;
    reduceRandomTotal(["STR", "CON", "DEX"], 80, attr);
    attr.APP -= 25;
  }

  // 教育增強檢定
  for (let i = 0; i < eduTests; i++) {
    const roll = Math.floor(Math.random() * 100) + 1;
    if (roll > attr.EDU) {
      attr.EDU += Math.floor(Math.random() * 10) + 1;
      attr.EDU = Math.min(attr.EDU, 99);
    }
  }

  // 最低值為 1，避免為負
  for (const key in attr) {
    if (attr[key] < 1) attr[key] = 1;
  }
}

function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 處理「隨機」選項
function getRandomOption(selectId) {
  const select = document.getElementById(selectId);
  if (select.value === "隨機") {
    const options = Array.from(select.options).filter(opt => opt.value !== "隨機");
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex].value;
  }
  return select.value;
}

// ✅ 主要功能：產生角色並跳轉
function generateCharacter() {
  const name = document.getElementById("charName").value || "無名氏";
  const ageInput = document.getElementById("charAge").value;
const age = ageInput ? parseInt(ageInput) : getWeightedRandomAge();
  const gender = getRandomOption("charGender");
  const era = getRandomOption("charEra").value || "1920";
  const location = getRandomOption("charLocation");
  const birthplace = getRandomOption("charBirthplace")
  // 建立屬性值
  const attributes = {
    STR: rollDice(3, 6, 0, 5),
    CON: rollDice(3, 6, 0, 5),
    SIZ: rollDice(2, 6, 6, 5),
    DEX: rollDice(3, 6, 0, 5),
    APP: rollDice(3, 6, 0, 5),
    INT: rollDice(2, 6, 6, 5),
    POW: rollDice(3, 6, 0, 5),
    EDU: rollDice(2, 6, 6, 5),
    LUCK: rollDice(3, 6, 0, 5)
  };

  // 建立角色物件
  const character = {
    name,
    age,
    gender,
    era,
    location,
    birthplace,
    attributes
  };

applyAgeAdjustment(character);

// 然後儲存資料
localStorage.setItem("characterData", JSON.stringify(character));

  // ✅ 跳轉到結果頁
  window.location.href = "character.html";
}
//珍愛生命，遠離程式語言