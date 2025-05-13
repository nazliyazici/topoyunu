let balls = [];
let intervals = [];
let rankings = [];
let gameStarted = false;
const startX = 10;

function getRandomSpeed() { //Dalganın hızı
    return Math.random() * 1 + 1;
}

function getRandomAmplitude() { //Dalganın yüksekliği
    return Math.random() * 20 + 20;
}

function getRandomFrequency() {  //Dalganın hareketi
    return Math.random() * 0.05 + 0.03;
}

function startGame() {
    if (gameStarted) return; //oyun başladıysa birdaha başlamasını önler
    gameStarted = true;
    rankings = [];
    clearRankings();
    document.getElementById("ranking-buttons").style.display = "none";

    balls = [
        {
            element: document.getElementById('ball1'),
            speed: getRandomSpeed(),
            amplitude: getRandomAmplitude(),
            frequency: getRandomFrequency(),
            phase: 0,
            positionX: startX,
            color: "Kırmızı"
        },
        {
            element: document.getElementById('ball2'),
            speed: getRandomSpeed(),
            amplitude: getRandomAmplitude(),
            frequency: getRandomFrequency(),
            phase: Math.PI / 2,
            positionX: startX,
            color: "Mor"
        },
        {
            element: document.getElementById('ball3'),
            speed: getRandomSpeed(),
            amplitude: getRandomAmplitude(),
            frequency: getRandomFrequency(),
            phase: Math.PI,
            positionX: startX,
            color: "Mavi"
        }
    ];

    balls.forEach((ball, index) => {
        intervals[index] = setInterval(() => moveBall(ball), 20);
    });
}

function moveBall(ball) {
    ball.phase += ball.frequency;
    let y = Math.sin(ball.phase) * ball.amplitude + 30;
    ball.positionX += ball.speed;

    if (ball.positionX >= 800) {
        clearInterval(intervals[balls.indexOf(ball)]); 
        if (!rankings.includes(ball)) {
            rankings.push(ball);
            if (rankings.length === 3) {
                showRanking();
            }
        }
    }

    ball.element.style.left = ball.positionX + 'px';
    ball.element.style.top = y + 'px';
}

function showRanking() {
    const rank1 = document.getElementById("rank1");
    const rank2 = document.getElementById("rank2");
    const rank3 = document.getElementById("rank3");
    const kazanDiv = document.getElementById("kazan"); // Kazanma divini al

    const buttonSizes = ["190px", "145px", "90px"];

    rankings.forEach((ball, index) => {
        const rankButton = document.getElementById(`rank${index + 1}`);
        const rankNumber = document.getElementById(`rank-number${index + 1}`);
        rankButton.style.width = buttonSizes[index];
        rankButton.style.height = buttonSizes[index];
        rankButton.style.backgroundColor = ball.element.style.backgroundColor;
        rankButton.innerHTML = `${ball.color}<br>`;  //Sonuç alanını sıfırlar
        rankNumber.textContent = `${index + 1}`;
    });
    kazanDiv.style.display = "block";
    document.getElementById("ranking-buttons").style.display = "flex";
}

function clearRankings() {
    for (let i = 1; i <= 3; i++) {
        const rankButton = document.getElementById(`rank${i}`);
        rankButton.style.width = "50px";
        rankButton.style.height = "60px";
        rankButton.style.backgroundColor = "#555";
        rankButton.innerHTML = "";
    }
}

function resetGame() {
    gameStarted = false;
    balls.forEach((ball, index) => {
        clearInterval(intervals[index]);
        ball.positionX = startX;
        ball.phase = 0;  //Dalganın hareketinin başlangıç fazı
        ball.element.style.left = ball.positionX + 'px';
        ball.element.style.top = '30px';
    });
    clearRankings();
    document.getElementById("ranking-buttons").style.display = "none";   //Ranking-buttons gizle
    document.getElementById("kazan").style.display = "none";  // Kazanma durumunu gizle
}













