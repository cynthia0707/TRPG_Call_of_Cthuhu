function rollDice(times, sides, bonus = 0, multiplier = 1) {
    let total = 0;
    for (let i = 0; i < times; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return (total + bonus) * multiplier;
  }