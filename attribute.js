
// 通用骰子函式
function rollDice(times, sides, bonus = 0, multiplier = 1) {
  let total = 0;
  for (let i = 0; i < times; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }
  return (total + bonus) * multiplier;
}

// 隨機選擇選項
function getRandomOption(selectId) {
  const select = document.getElementById(selectId);
  if (select.value === "隨機") {
    const options = Array.from(select.options).filter(opt => opt.value !== "隨機");
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex].value;
  }
  return select.value;
}

// 年齡輸入驗證
function validateAgeInput(ageInput) {
  if (!ageInput) return null; // 空值 → 用隨機
  const age = parseInt(ageInput, 10);
  if (isNaN(age)) {
    alert("請輸入數字格式的年齡（例如 25）");
    return null;
  }
  if (age < 15 || age > 90) {
    alert("年齡請輸入 15 到 90 之間的數字");
    return null;
  }
  return age;
}

// 加權隨機年齡（減少極端值）
function getWeightedRandomAge() {
  const weighted = [];
  for (let i = 15; i <= 90; i++) {
    const weight = i <= 30 ? 3 : i <= 60 ? 2 : 1;
    for (let j = 0; j < weight; j++) weighted.push(i);
  }
  return weighted[Math.floor(Math.random() * weighted.length)];
}

// 教育增強檢定
function applyEduCheck(currentEdu, times) {
  let result = currentEdu;
  for (let i = 0; i < times; i++) {
    const check = rollDice(1, 100);
    if (check > result) {
      result += rollDice(1, 10);
      if (result > 99) result = 99;
    }
  }
  return result;
}

// 年齡調整處理
function applyAgeAdjustment(character) {
  const age = character.age;
  const attr = character.attributes;

  if (age < 20) {
    attr.EDU -= 5;
    let total = attr.STR + attr.SIZ;
    if (total > 5) {
      if (attr.STR >= 3) attr.STR -= 3;
      else attr.STR = Math.max(1, attr.STR - 2);
      attr.SIZ = Math.max(1, attr.SIZ - (5 - (attr.STR || 0)));
    }
    const luck1 = rollDice(3, 6, 0, 5);
    const luck2 = rollDice(3, 6, 0, 5);
    attr.LUCK = Math.max(luck1, luck2);
  } else if (age < 40) {
    attr.EDU = applyEduCheck(attr.EDU, 1);
  } else if (age < 50) {
    attr.EDU = applyEduCheck(attr.EDU, 2);
    const loss = 5;
    attr.STR -= 2;
    attr.CON -= 2;
    attr.DEX -= 1;
    attr.APP -= 5;
  } else if (age < 60) {
    attr.EDU = applyEduCheck(attr.EDU, 3);
    attr.STR -= 4;
    attr.CON -= 3;
    attr.DEX -= 3;
    attr.APP -= 10;
  } else if (age < 70) {
    attr.EDU = applyEduCheck(attr.EDU, 4);
    attr.STR -= 7;
    attr.CON -= 7;
    attr.DEX -= 6;
    attr.APP -= 15;
  } else if (age < 80) {
    attr.EDU = applyEduCheck(attr.EDU, 4);
    attr.STR -= 15;
    attr.CON -= 15;
    attr.DEX -= 10;
    attr.APP -= 20;
  } else {
    attr.EDU = applyEduCheck(attr.EDU, 4);
    attr.STR -= 40;
    attr.CON -= 30;
    attr.DEX -= 10;
    attr.APP -= 25;
  }

  // 不讓屬性變負數
  for (let key in attr) {
    if (attr[key] < 0) attr[key] = 0;
  }
}

// 主要功能：產生角色並跳轉
function generateCharacter() {
  const name = document.getElementById("charName").value || "無名氏";
  const ageInput = document.getElementById("charAge").value;
  let age = validateAgeInput(ageInput);
  if (age === null) age = getWeightedRandomAge();

  const gender = getRandomOption("charGender");
  const location = getRandomOption("charLocation");
  const birthplace = getRandomOption("charBirthplace");
  const era = document.getElementById("charEra").value || "1920";

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

  const character = {
    name,
    age,
    gender,
    location,
    birthplace,
    era,
    attributes
  };

  applyAgeAdjustment(character);

  localStorage.setItem("characterData", JSON.stringify(character));
  window.location.href = "character.html";
}
//珍愛生命，遠離程式...KP008關心您
