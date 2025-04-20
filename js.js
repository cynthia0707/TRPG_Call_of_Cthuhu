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
  const name = document.getElementById("charName").value || "無名氏";
  const age = document.getElementById("charAge").value || "年齡未知的古神";
  const gender = getRandomOption("charGender");
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
    location,
    birthplace,
    attributes
  };

  // 儲存角色到 localStorage
  localStorage.setItem("characterData", JSON.stringify(character));

  // ✅ 跳轉到結果頁（你自己命名叫 character.html）
  window.location.href = "character.html";
}
