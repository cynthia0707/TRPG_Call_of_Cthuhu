const nameData = {
  "美國": {
    "surnames": [
      "史密斯",
      "強森",
      "布朗",
      "戴維斯"
    ],
    "male": [
      "詹姆士",
      "傑克",
      "喬治"
    ],
    "female": [
      "艾瑪",
      "莉莉",
      "蘇珊"
    ],
    "other": [
      "亞歷克斯",
      "凱西",
      "喬丹"
    ]
  },
  "中國": {
    "surnames": [
      "魏",
      "李",
      "王",
      "石",
      "林",
      "蕭"
    ],
    "male": [
      "逸弘",
      "偉",
      "柏森",
      "祐嘉",
      "修民",
      "凡"
    ],
    "female": [
      "靜",
      "婷",
      "可涵",
      "承穎",
      "羽若"
    ],
    "other": [
      "晨",
      "曉",
      "玉雲",
      "寧晏",
      "思岑"
    ]
  },
  "古神": {
    "names": [
      "克蘇魯",
      "奈亞拉托提普",
      "莎布尼古拉斯",
      "猶格索托斯"
    ]
  }
};

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomCharacterName(birthplace, gender) {
  if (Math.random() < 0.001) {
    return randomFrom(nameData["古神"].names);
  }
  const place = nameData[birthplace] || nameData["美國"];
  let genderKey = "other";
  if (gender === "男") genderKey = "male";
  else if (gender === "女") genderKey = "female";

  const surname = randomFrom(place.surnames);
  const name = randomFrom(place[genderKey]);

  const westernCountries = ["美國", "英國", "法國", "德國", "義大利", "西班牙", "俄羅斯", "印度"];
  const isWestern = westernCountries.includes(birthplace);

  return isWestern ? `${name}·${surname}` : `${surname}${name}`;
}
