export const drawLetters = () => {
  const letterPool = [
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "A",
    "B",
    "B",
    "C",
    "C",
    "D",
    "D",
    "D",
    "D",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "F",
    "F",
    "G",
    "G",
    "G",
    "H",
    "H",
    "I",
    "I",
    "I",
    "I",
    "I",
    "I",
    "I",
    "I",
    "I",
    "J",
    "K",
    "L",
    "L",
    "L",
    "L",
    "M",
    "M",
    "N",
    "N",
    "N",
    "N",
    "N",
    "N",
    "O",
    "O",
    "O",
    "O",
    "O",
    "O",
    "O",
    "O",
    "P",
    "P",
    "Q",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "S",
    "S",
    "S",
    "S",
    "T",
    "T",
    "T",
    "T",
    "T",
    "T",
    "U",
    "U",
    "U",
    "U",
    "V",
    "V",
    "W",
    "W",
    "X",
    "Y",
    "Y",
    "Z",
  ];

  const shuffledLetterPool = letterPool.sort(() => Math.random() - 0.5);

  let hand = shuffledLetterPool.slice(0, 10);

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  let loop_count = 0;
  for (let letter of input) {
    for (let handLetter of lettersInHand) {
      if (letter.toUpperCase() == handLetter.toUpperCase()) {
        loop_count++;
        const index = lettersInHand.indexOf(handLetter);
        if (index > -1) {
          lettersInHand.splice(index, 1);
        }
      }
    }
  }
  if (loop_count === input.length) {
    return true;
  } else {
    return false;
  }
};

export const scoreWord = (word) => {
  let score = 0;

  if (word.length > 6 && word.length < 11) {
    score += 8;
  }

  for (let letterCaseSensitive of word) {
    const letter = letterCaseSensitive.toUpperCase();
    if (
      letter === "A" ||
      letter === "E" ||
      letter === "I" ||
      letter === "O" ||
      letter === "U" ||
      letter === "L" ||
      letter === "N" ||
      letter === "R" ||
      letter === "S" ||
      letter === "T"
    ) {
      score += 1;
    } else if (letter === "D" || letter === "G") {
      score += 2;
    } else if (
      letter === "B" ||
      letter === "C" ||
      letter === "M" ||
      letter === "P"
    ) {
      score += 3;
    } else if (
      letter === "F" ||
      letter === "H" ||
      letter === "V" ||
      letter === "W" ||
      letter === "Y"
    ) {
      score += 4;
    } else if (letter === "K") {
      score += 5;
    } else if (letter === "J" || letter === "X") {
      score += 8;
    } else if (letter === "Q" || letter === "Z") {
      score += 10;
    }
  }

  return score;
};

console.log(scoreWord("A"));

export const highestScoreFrom = (words) => {
  let wordsAndScores = {};

  for (let word of words) {
    const key = word;
    const value = scoreWord(word);

    wordsAndScores[key] = value;
  }

  let potentialWinners = [];
  const vals = Object.values(wordsAndScores);
  const max = Math.max(...vals);
  for (let word in wordsAndScores) {
    if (wordsAndScores[word] === max) {
      potentialWinners.push(word);
    }
  }

  let tenLetteredWinners = [];
  let shortestWinners = [];
  if (potentialWinners.length === 1) {
    return { word: potentialWinners[0], score: scoreWord(potentialWinners[0]) };
  } else {
    for (let word of potentialWinners) {
      if (word.length === 10) {
        tenLetteredWinners.push(word);
      } else {
        var min = Math.min(...words.map((o) => o.length));
        if (word.length === min) {
          shortestWinners.push(word);
        }
      }
    }
  }
  if (tenLetteredWinners.length === 1 || tenLetteredWinners.length > 1) {
    return {
      word: tenLetteredWinners[0],
      score: scoreWord(tenLetteredWinners[0]),
    };
  } else if (tenLetteredWinners.length === 0 && shortestWinners.length === 1) {
    return {
      word: shortestWinners[0], 
      score: scoreWord(shortestWinners[0]) 
    };
  }
};
