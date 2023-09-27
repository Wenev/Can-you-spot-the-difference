// global vars
let currentLevel, currentTimeMs, currentScore, checkPointTime;

/**
 * Level Generation related Functions
 */
function generate_side_length(level) {
  if (level > 10) {
    return 4;
  }

  if (level > 5) {
    return 3;
  }

  return 2;
}

function generate_target_position(sideLength) {
  // generates random position for target
  // input:
  //      - size: the size from generated boxes
  // output:
  //      - target_pos: an array contains position of target

  const randomRow = Math.floor(Math.random() * sideLength);
  const randomCol = Math.floor(Math.random() * sideLength);

  return [randomRow, randomCol];
}

function generate_base_color() {
  // generate random color
  const red = Math.floor(Math.random() * 255 + 1);
  const green = Math.floor(Math.random() * 255 + 1);
  const blue = Math.floor(Math.random() * 255 + 1);

  return [red, green, blue];
}

function generate_target_color(baseColor, currentLevel) {
  let [red, green, blue] = baseColor;

  let colorDifficulty = 100;

  // 0 / 1
  const isUp = Math.floor(Math.random() + 1);

  if (isUp) {
    red += colorDifficulty;
    green += colorDifficulty;
    blue += colorDifficulty;
  } else {
    red -= colorDifficulty;
    green -= colorDifficulty;
    blue -= colorDifficulty;
  }

  return [red, green, blue];
}

function create_circle_target_html(color) {
  const element = create_circle_html(color);
  element.addEventListener("click", () => {
    next_level();
  });

  return element;
}

function create_circle_base_html(color) {
  const element = create_circle_html(color);
  element.addEventListener("click", () => {
    wrong();
  });
  return element;
}

function create_circle_html(color) {
  const [red, green, blue] = color;

  const element = document.createElement("div");
  element.className = "circle";

  // https://stackoverflow.com/a/14323127/12125511
  element.style.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";

  return element;
}

function render_boxes(sideLength, randomPosition, randomColorBase, randomColorTarget) {
  const circleContainer = document.getElementById("circleContainer");

  circleContainer.innerHTML = "";

  const [targetRow, targetCol] = randomPosition;

  for (let row = 0; row < sideLength; row++) {
    const rowElement = document.createElement("div");
    rowElement.className = "row";

    for (let col = 0; col < sideLength; col++) {
      let element;

      if (targetRow === row && targetCol === col) {
        element = create_circle_target_html(randomColorTarget);
      } else {
        element = create_circle_base_html(randomColorBase);
      }

      rowElement.appendChild(element);
    }
    circleContainer.appendChild(rowElement);
  }
}

function render_level() {
  const level_element = document.getElementById("level");
  level_element.innerText = currentLevel;
}
/**
 * Score related functions
 */

function calculate_bonus() {
  if (currentLevel === 1) {
    return 0;
  }

  const now = Date.now();
  const solvingTime = now - checkPointTime;

  let bonus = 0;

  if (solvingTime <= 3000) {
    bonus = Math.round((3000 - solvingTime) / 10);
  }

  return bonus;
}

function add_score(scoreAdder) {
  const basicScore = 100;

  currentScore += basicScore + scoreAdder;
  render_score();
}

function render_score() {
  const scoreElement = document.getElementById("score");
  scoreElement.innerText = `Score: ${currentScore}`;
}

/**
 * Timer related functions
 */

function timer() {
  let startTime = Date.now();
  let interval = setInterval(function () {
    let elapsedTime = Date.now() - startTime;
    let timeLeft = currentTimeMs - elapsedTime;
    if (timeLeft <= 0) {
      timeLeft = 0;
      clearInterval(interval);
      end_game();
    }

    let minute = Math.floor(timeLeft / (1000 * 60));
    if (minute < 10) {
      minute = "0" + minute;
    }
    document.getElementById("minutes").innerHTML = minute;

    let second = Math.floor(timeLeft / 1000);
    if (second >= 60) {
      second -= minute * 60;
    }
    if (second < 10) {
      second = "0" + second;
    }
    document.getElementById("seconds").innerHTML = second;

    let milli = timeLeft % 1000;
    if (milli < 100) {
      milli = "0" + milli;
    }
    if (milli < 10) {
      milli = "0" + milli;
    }
    document.getElementById("millisec").innerHTML = milli;
  }, 50);
}

/**
 * game related functions
 */

function next_level() {
  currentLevel++;
  currentTimeMs += 3000;

  const bonus = calculate_bonus();

  checkPointTime = Date.now();

  // todo: get bonus points from remaining time
  add_score(bonus);

  // todo: increase remaining time
  
  start_level();
}

function wrong() {
  currentTimeMs -= 1500;
}

function end_game() {
  alert("waktu abis oi");
}

function start_level() {
  render_level();
  const sideLength = generate_side_length(currentLevel);
  const randomPosition = generate_target_position(sideLength);

  const randomColorBase = generate_base_color();
  const randomColorTarget = generate_target_color(randomColorBase, 100);
  console.log(randomColorBase, randomColorTarget, randomPosition);

  render_boxes(sideLength, randomPosition, randomColorBase, randomColorTarget);
}

// resets global vars
function start_game() {
  currentLevel = 1;
  currentTimeMs = 30_000;
  currentScore = 0;

  checkPointTime = Date.now();

  start_level();
}

document.addEventListener("DOMContentLoaded", () => {
  start_game();
});
