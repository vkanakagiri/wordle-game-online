const dino = document.getElementById("dino");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");
const jumpSound = document.getElementById("jumpSound");
const bgMusic = document.getElementById("bgMusic");

let jumping = false;
let score = 0;
let gameRunning = true;

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

function jump() {
    if (!jumping && gameRunning) {

        bgMusic.play().catch(() => {});
        jumpSound.currentTime = 0;
        jumpSound.play().catch(() => {});

        jumping = true;

        let position = 50;
        let up = setInterval(() => {
            if (position >= 180) {
                clearInterval(up);

                let down = setInterval(() => {
                    if (position <= 50) {
                        clearInterval(down);
                        jumping = false;
                    }

                    position -= 5;
                    dino.style.bottom = position + "px";
                }, 20);
            }

            position += 5;
            dino.style.bottom = position + "px";
        }, 20);
    }
}

function createObstacle() {
    if (!gameRunning) return;

    const cactus = document.createElement("div");
    cactus.classList.add("cactus");

    let position = window.innerWidth;

    cactus.style.left = position + "px";
    game.appendChild(cactus);

    const move = setInterval(() => {

        if (!gameRunning) {
            clearInterval(move);
            cactus.remove();
            return;
        }

        position -= 8;
        cactus.style.left = position + "px";

        const dinoLeft = 100;
        const dinoRight = 150;
        const cactusLeft = position;
        const cactusRight = position + 30;

        const dinoBottom = parseInt(
            window.getComputedStyle(dino).bottom
        );

        if (
            cactusRight > dinoLeft &&
            cactusLeft < dinoRight &&
            dinoBottom < 100
        ) {
            gameOver();
        }

        if (position < -50) {
            clearInterval(move);
            cactus.remove();

            score++;
            scoreText.textContent = "Score: " + score;
        }

    }, 20);

    const nextSpawn = Math.random() * 1500 + 1000;
    setTimeout(createObstacle, nextSpawn);
}

function gameOver() {
    gameRunning = false;
    gameOverScreen.style.display = "block";
    bgMusic.pause();
}

function restartGame() {
    location.reload();
}

createObstacle();