/* ==========================================
   GLOBAL VARIABLES
========================================== */

let completedGames = 0;

let balloonScore = 0;
let balloonTime = 30;
let balloonInterval;
let balloonTimer;

let heartScore = 0;
let heartLives = 3;
let heartGameRunning = false;

let quizIndex = 0;
let quizScore = 0;


/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader =
            document.getElementById("loader");

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 800);

    }, 1200);

});


/* ==========================================
   COUNTDOWN
========================================== */

// CHANGE THIS TO HIS BIRTHDAY

const birthday =
    new Date(
        "August 30, 2026 00:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    let difference =
        birthday - now;

    if (difference < 0) {
        difference = 0;
    }

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );

    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);

updateCountdown();


/* ==========================================
   GAME PROGRESS
========================================== */

function completeGame() {

    completedGames++;

    if (completedGames > 3) {
        completedGames = 3;
    }

    const percentage =
        (completedGames / 3) * 100;

    document.getElementById("progress")
        .style.width =
        percentage + "%";

    document.getElementById("progressText")
        .textContent =
        `${completedGames} / 3 Games Completed`;

    if (completedGames === 3) {

        setTimeout(() => {

            alert(
                "🎉 Congratulations! You completed all three birthday games! ❤️"
            );

        }, 300);

    }

}


/* ==========================================
   GAME 1
   POP THE BALLOONS
========================================== */

function startBalloonGame() {

    clearInterval(balloonTimer);
    clearInterval(balloonInterval);

    balloonScore = 0;
    balloonTime = 30;

    document.getElementById("balloonScore")
        .textContent = "0";

    document.getElementById("balloonTime")
        .textContent = "30";

    const area =
        document.getElementById("balloonGame");

    area.style.display = "block";

    area.innerHTML = "";

    balloonTimer =
        setInterval(() => {

            balloonTime--;

            document.getElementById("balloonTime")
                .textContent =
                balloonTime;

            if (balloonTime <= 0) {

                clearInterval(balloonTimer);
                clearInterval(balloonInterval);

                endBalloonGame();

            }

        }, 1000);


    balloonInterval =
        setInterval(createBalloon, 650);

}


function createBalloon() {

    const area =
        document.getElementById("balloonGame");

    if (!area) return;

    const balloon =
        document.createElement("div");

    balloon.className = "balloon";

    const balloons = [
        "🎈",
        "🎈",
        "🎈",
        "🎈"
    ];

    balloon.textContent =
        balloons[
            Math.floor(
                Math.random() *
                balloons.length
            )
        ];

    balloon.style.left =
        Math.random() * 85 + "%";

    balloon.style.top =
        Math.random() * 80 + "%";

    balloon.addEventListener(
        "click",
        () => {

            balloonScore++;

            document.getElementById(
                "balloonScore"
            ).textContent =
                balloonScore;

            balloon.remove();

        }
    );

    area.appendChild(balloon);


    setTimeout(() => {

        if (balloon.parentElement) {
            balloon.remove();
        }

    }, 1600);

}


function endBalloonGame() {

    document.getElementById("balloonGame")
        .innerHTML = `
            <div style="
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:column;
                text-align:center;
            ">
                <div style="font-size:50px;">🎉</div>

                <h3>Time's Up!</h3>

                <p>
                    You popped ${balloonScore} balloons!
                </p>
            </div>
        `;

    completeGame();

}


/* ==========================================
   GAME 2
   CATCH THE HEARTS
========================================== */

function startHeartGame() {

    if (heartGameRunning) return;

    heartGameRunning = true;

    heartScore = 0;
    heartLives = 3;

    document.getElementById("heartScore")
        .textContent = "0";

    document.getElementById("heartLives")
        .textContent = "3";

    const area =
        document.getElementById("heartGame");

    area.style.display = "block";

    const basket =
        document.getElementById("basket");

    basket.style.left = "50%";

    area.addEventListener(
        "mousemove",
        moveBasket
    );

    area.addEventListener(
        "touchmove",
        moveBasketTouch
    );

    const heartSpawner =
        setInterval(() => {

            if (!heartGameRunning) {

                clearInterval(heartSpawner);

                return;
            }

            createFallingHeart();

        }, 700);

}


function moveBasket(event) {

    const area =
        document.getElementById("heartGame");

    const rect =
        area.getBoundingClientRect();

    let x =
        event.clientX -
        rect.left;

    x =
        Math.max(
            25,
            Math.min(
                rect.width - 25,
                x
            )
        );

    document.getElementById("basket")
        .style.left =
        x + "px";

}


function moveBasketTouch(event) {

    const touch =
        event.touches[0];

    const area =
        document.getElementById("heartGame");

    const rect =
        area.getBoundingClientRect();

    let x =
        touch.clientX -
        rect.left;

    x =
        Math.max(
            25,
            Math.min(
                rect.width - 25,
                x
            )
        );

    document.getElementById("basket")
        .style.left =
        x + "px";

}


function createFallingHeart() {

    if (!heartGameRunning) return;

    const area =
        document.getElementById("heartGame");

    const heart =
        document.createElement("div");

    heart.className =
        "falling-heart";

    heart.textContent = "❤️";

    heart.style.left =
        Math.random() * 90 + "%";

    area.appendChild(heart);

    let position = -40;

    const fallSpeed = 3;

    const fall =
        setInterval(() => {

            position += fallSpeed;

            heart.style.top =
                position + "px";

            const heartRect =
                heart.getBoundingClientRect();

            const basketRect =
                document
                    .getElementById("basket")
                    .getBoundingClientRect();

            if (
                heartRect.bottom >=
                basketRect.top &&

                heartRect.left <
                basketRect.right &&

                heartRect.right >
                basketRect.left
            ) {

                heartScore++;

                document.getElementById(
                    "heartScore"
                ).textContent =
                    heartScore;

                heart.remove();

                clearInterval(fall);

                return;
            }


            if (
                position >
                area.clientHeight
            ) {

                heartLives--;

                document.getElementById(
                    "heartLives"
                ).textContent =
                    heartLives;

                heart.remove();

                clearInterval(fall);

                if (heartLives <= 0) {

                    endHeartGame();

                }

            }

        }, 20);

}


function endHeartGame() {

    heartGameRunning = false;

    const area =
        document.getElementById("heartGame");

    area.innerHTML = `
        <div style="
            width:100%;
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:column;
        ">
            <div style="font-size:50px;">
                ❤️
            </div>

            <h3>Game Over!</h3>

            <p>
                You caught ${heartScore} hearts!
            </p>
        </div>
    `;

    completeGame();

}


/* ==========================================
   GAME 3
   BIRTHDAY QUIZ
========================================== */

const questions = [

    {
        question:
            "What is the most important thing on a birthday?",

        options: [
            "Cake 🎂",
            "Presents 🎁",
            "Happiness ❤️",
            "Everything!"
        ],

        answer: 3
    },

    {
        question:
            "What should this birthday year bring?",

        options: [
            "More adventures 🚀",
            "More success 🏆",
            "More happiness 😊",
            "All of them!"
        ],

        answer: 3
    },

    {
        question:
            "What makes a birthday truly special?",

        options: [
            "Good memories",
            "Great people",
            "Lots of laughter",
            "All of the above ❤️"
        ],

        answer: 3
    },

    {
        question:
            "What should you do today?",

        options: [
            "Smile 😄",
            "Have fun 🎉",
            "Eat cake 🎂",
            "ALL OF THEM!"
        ],

        answer: 3
    }

];


function startQuiz() {

    quizIndex = 0;

    quizScore = 0;

    showQuestion();

}


function showQuestion() {

    const area =
        document.getElementById("quizArea");

    const question =
        questions[quizIndex];

    let html = `

        <div class="quiz-question">

            ${question.question}

        </div>

        <div class="quiz-options">

    `;

    question.options.forEach(
        (option, index) => {

            html += `

                <button
                    class="quiz-option"
                    onclick="answerQuiz(${index})">

                    ${option}

                </button>

            `;

        }
    );

    html += `</div>`;

    area.innerHTML = html;

}


function answerQuiz(selected) {

    const question =
        questions[quizIndex];

    if (selected === question.answer) {

        quizScore++;

    }

    quizIndex++;

    if (quizIndex < questions.length) {

        setTimeout(
            showQuestion,
            300
        );

    } else {

        showQuizResult();

    }

}


function showQuizResult() {

    const area =
        document.getElementById("quizArea");

    let message;

    if (quizScore === questions.length) {

        message =
            "Perfect score! 🏆❤️";

    } else if (quizScore >= 2) {

        message =
            "Amazing job! 🎉";

    } else {

        message =
            "Nice try! 😄";

    }

    area.innerHTML = `

        <div style="
            text-align:center;
        ">

            <div style="
                font-size:55px;
            ">
                🎉
            </div>

            <h3>
                ${message}
            </h3>

            <p style="
                margin-top:10px;
                color:#777;
            ">

                You scored
                ${quizScore}
                /
                ${questions.length}

            </p>

            <button
                class="game-btn"
                onclick="startQuiz()">

                Play Again

            </button>

        </div>

    `;

    completeGame();

}


/* ==========================================
   FINAL SURPRISE
========================================== */

function showFinalSurprise() {

    document
        .getElementById("finalSurprise")
        .classList.add("active");

    createConfetti();

}


function closeFinalSurprise() {

    document
        .getElementById("finalSurprise")
        .classList.remove("active");

}


/* ==========================================
   CONFETTI
========================================== */

function createConfetti() {

    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const confetti =
            document.createElement("div");

        confetti.style.position =
            "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            "-20px";

        confetti.style.width =
            "8px";

        confetti.style.height =
            "14px";

        confetti.style.background =
            `hsl(
                ${Math.random() * 360},
                80%,
                65%
            )`;

        confetti.style.zIndex =
            "2000";

        document.body.appendChild(
            confetti
        );

        const duration =
            Math.random() * 3 + 2;

        confetti.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0)"
                },

                {
                    transform:
                        "translateY(110vh) rotate(720deg)"
                }
            ],

            {
                duration:
                    duration * 1000,

                easing:
                    "ease-out"
            }

        );

        setTimeout(
            () => confetti.remove(),
            duration * 1000
        );

    }

}


/* ==========================================
   ESCAPE TO CLOSE
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeFinalSurprise();

        }

    }
);