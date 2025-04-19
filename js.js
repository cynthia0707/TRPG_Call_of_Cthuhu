//你好
function roll3d6() {
  let total = 0;
  for (let i = 0; i < 3; i++) {
    total += Math.floor(Math.random() * 6) + 1;
  }
  return total;
}

let result = roll3d6();
console.log("你骰出：" + result);
