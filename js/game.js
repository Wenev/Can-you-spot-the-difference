// global vars
let currentLevel, currentTimeMs, currentScore;
let game_over = false;

function generate_side_length(level) {
  if (level > 10) {
    return 4;
  }

  if (level > 5) {
    return 3;
  }

  return 2;
}

function level_difficulty(level) {
  return {
    sideLength: 3,
    colorRange: 100,
  };
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
    console.log("asmadm");
    next_level();
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
        element = create_circle_html(randomColorBase);
      }

      rowElement.appendChild(element);
    }
    circleContainer.appendChild(rowElement);
  }
}

function next_level() {
  currentLevel++;

  start_level();
}

function end_game() {}

function start_level() {
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

  start_level();
}

document.addEventListener("DOMContentLoaded", () => {
  start_game();
});
