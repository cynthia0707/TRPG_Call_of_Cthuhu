
function roll3d6() {
  let total = 0;
  for (let i = 0; i < 3; i++) {
    total += Math.floor(Math.random() * 6) + 1;
  }
  return total;
}

let result3d6 = roll3d6();
console.log("你骰出 3D6：" + result3d6);

function roll1d6() {
  return Math.floor(Math.random() * 6) + 1;
}

let result1d6 = roll1d6();
console.log("你骰出了 1D6：" + result1d6);

