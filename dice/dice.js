function rollDice(times, sides, bonus = 0, multiplier = 1) {
    let total = 0;
    for (let i = 0; i < times; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return (total + bonus) * multiplier;
  }
  fetch("../components/navbar.html")
  .then(res => {
    if (!res.ok) throw new Error("載入 navbar 失敗！");
    return res.text();
  })
  .then(data => {
    document.getElementById("navbar-placeholder").innerHTML = data;
  })
  .catch(err => console.error(err));