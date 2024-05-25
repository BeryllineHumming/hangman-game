("use strict");

const startingEl = document.querySelector(".splash");
const playBtn = document.querySelectorAll(".start-game");
// const titleEl = document.querySelector(".game-title");
const gameEl = document.querySelector(".game");
// const answerTitleEl = document.querySelector("#answer-title");
const letterDisplayEl = document.querySelector(".letter-display");
const keyboardEl = document.querySelector(".keyboard");
// const wrongLettersTitleEl = document.querySelector("#wrong-letters-title");
const wrongLettersEl = document.querySelector(".wrong-letters");
const hintBtn = document.querySelector(".gimme-hint");
const hintContainerEl = document.querySelector(".hint-container");
const hintExitEl = document.querySelector(".hint-exit");
const hintTextEl = document.querySelector(".hint-text");
const stickFigureEl = document.querySelectorAll(".sf");
const hangHeadEl = document.querySelector(".head");
const hangTorsoEl = document.querySelector(".torso");
const hangLArmEl = document.querySelector(".left-arm");
const hangRArmEl = document.querySelector(".right-arm");
const hangLLegEl = document.querySelector(".left-leg");
const hangRLegEl = document.querySelector(".right-leg");
const resultEl = document.querySelector(".result");
const animContainerEl = document.querySelector(".anim-container");
const resultTextEl = document.querySelector(".result-text");
const replayBtn = document.querySelector(".replay");

// ["answer", "hint"]
let wordList = [
  ["APPLE", "A fruit from a tree in the rosaceae family."],
  ["PILLOW", "I lay my weary head to rest."],
  ["HOSPITAL", "Where you go if you're not feeling well."],
  ["SPARROW", "A small bird."],
  ["FOX", "A sly figure in much folklore."],
  ["PENCIL", "A writing implement."],
  ["UNIVERSITY", "After high school."],
  ["APPLICATION", "Used for documents, software, and makeup."],
  ["XYLOPHONE", "A many-keyed instrument."],
  ["QUEEN", "Featured in playing cards."],
  ["DAZZLING", `Another word for "blinding."`],
  ["JOUSTING", "How knights played in the middle ages."],
  ["VALOR", "Great courage."],
  ["HEART", "Featured heavily during Valentine's Day."],
  ["CHAIR", "Furniture for sitting."],
  ["MARINE", "Of the ocean."],
  ["KITE", "Diamond shapes flying in the sky."],
  ["HYPNOSIS", "A trance-like state."],
];

// Other starting variables
let answer, select, keyboardExists;
let lostPoint = 0;

const setKeyboard = () => {
  let p, letter, button;
  keyboardExists = true;
  for (i = 65; i <= 90; i++) {
    if (i == 65 || i == 74 || i == 83) {
      p = document.createElement("p");
    }
    letter = String.fromCharCode(i);
    button = document.createElement("button");
    button.innerHTML = letter;
    p.appendChild(button);
    keyboardEl.appendChild(p);
  }
};

const init = () => {
  // reset screen
  startingEl.classList.add("hidden");
  resultEl.classList.add("hidden");
  gameEl.classList.remove("hidden");
  resultTextEl.classList.remove("winner");
  replayBtn.classList.remove("bounce");
  animContainerEl.classList.remove("loser");
  letterDisplayEl.textContent = "";
  hintTextEl.textContent = "";
  wrongLettersEl.textContent = "";
  lostPoint = 0;
  stickFigureEl.forEach(item => {
    item.classList.add("hidden");
  });

  // start up
  if (!keyboardExists) setKeyboard();
  select = Math.trunc(Math.random() * wordList.length);
  answer = wordList[select][0];
  for (i = 0; i < answer.length; i++) {
    letterDisplayEl.textContent += "_";
  }
};

playBtn.forEach(item => {
  item.addEventListener("click", init);
});

String.prototype.replaceAt = function (index, cha) {
  return this.substring(0, index) + cha + this.substring(index + 1);
};

const missedLetter = letter => {
  wrongLettersEl.textContent += letter;
  lostPoint++;
  switch (lostPoint) {
    case 1:
      hangHeadEl.classList.remove("hidden");
      break;
    case 2:
      hangTorsoEl.classList.remove("hidden");
      break;
    case 3:
      hangLArmEl.classList.remove("hidden");
      break;
    case 4:
      hangRArmEl.classList.remove("hidden");
      break;
    case 5:
      hangLLegEl.classList.remove("hidden");
      break;
    case 6:
      hangRLegEl.classList.remove("hidden");
      setTimeout(gameEnd, 700);
      break;
  }
};

const gameEnd = () => {
  resultEl.classList.remove("hidden");
  if (lostPoint < 6) {
    resultTextEl.classList.add("winner");
    replayBtn.classList.add("bounce");
    resultTextEl.textContent = "You won!";
  } else {
    animContainerEl.classList.add("loser");
    resultTextEl.textContent = "You lost!";
  }
};

keyboardEl.addEventListener("click", function (e) {
  let letter = e.target.innerHTML;
  console.log(letter);
  let correct = false;
  // check if the letter matches; check length to fix error that puts code into wrongLettersEl
  if (letter.length === 1) {
    for (i = 0; i < answer.length; i++) {
      if (answer.at(i) === letter) {
        correct = true;
        letterDisplayEl.textContent = letterDisplayEl.textContent.replaceAt(
          i,
          letter
        );
      }
    }
    // win game
    if (letterDisplayEl.textContent === answer) {
      setTimeout(gameEnd, 700);
    } else if (!correct) {
      // wrong letter
      missedLetter(letter);
    }
  }
});

hintBtn.addEventListener("click", function () {
  hintContainerEl.classList.remove("hidden");
  hintTextEl.textContent = wordList[select][1];
});

const exitHint = () => {
  hintContainerEl.classList.add("hidden");
};

hintExitEl.addEventListener("click", exitHint);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !hintContainerEl.classList.contains("hidden")) {
    exitHint();
  }
});
