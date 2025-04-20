/* eslint-disable no-console */

// 通用骰子函式
function rollDice(times, sides, bonus = 0, multiplier = 1) {
  let total = 0;
  for (let i = 0; i < times; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return (total + bonus) * multiplier;
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
  const name = document.getElementById("charName").value || "無名角色";
  const age = document.getElementById("charAge").value || "??";
  const gender = getRandomOption("charGender");
  const location = getRandomOption("charLocation");
  const birthplace = getRandomOption("charBirthplace");
  
  const attrNames = {
    STR: "力量 STR",
    CON: "體質 CON",
    SIZ: "體型 SIZ",
    DEX: "敏捷 DEX",
    APP: "外貌 APP",
    INT: "智力 INT",
    POW: "意志 POW",
    EDU: "教育 EDU",
    LUCK: "幸運 LUCK"
  };
  
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
    location,
    birthplace,
    attributes
  };

  // 儲存角色到 localStorage
  localStorage.setItem("characterData", JSON.stringify(character));

  // ✅ 跳轉到結果頁（你自己命名叫 character.html）
  window.location.href = "character.html";
}
