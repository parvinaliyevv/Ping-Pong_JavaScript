const gameBoard = {
    height: document.documentElement.clientHeight - 100,
    width: document.documentElement.clientWidth - 150,
    color: "#006043",
     
    create() {
        let gameBoard = document.createElement("div");
        gameBoard.id = "game-board";

        this.elem = gameBoard;
        document.body.style.height = document.documentElement.clientHeight + "px";

        let line = document.createElement("hr");
        line.id = "line";

        document.body.append(gameBoard);
        this.elem.append(line);

        this.show();
    },

    reset() {
        gameBoard.height = document.documentElement.clientHeight - 100;
        gameBoard.width = document.documentElement.clientWidth - 150;
    },

    show() {
        gameBoard.elem.style.height = gameBoard.height + "px";
        gameBoard.elem.style.width = gameBoard.width + "px";

        line.style.height = gameBoard.height - 25 + "px";
        line.style.left = gameBoard.width / 2 - line.style.width / 2 + "px"; 

        gameBoard.elem.style.background = gameBoard.color;
    }
}

const gameBall = {
    height: 20,
    width: 20,
    posY: gameBoard.height / 2 + 20 / 2,
    posX: gameBoard.width / 2 + 20 / 2,
    speedY: -5,
    speedX: -5,
    color: "#EB455F",

    create() {
        let ball = document.createElement("div");
        ball.id = "game-ball";

        this.elem = ball;

        gameBoard.elem.append(ball);
        this.show(1);
    },

    show(state = 0) {
        if (state) {
            gameBall.elem.style.height = gameBall.height + "px";
            gameBall.elem.style.width = gameBall.width + "px";
    
            gameBall.elem.style.borderRadius = "50%";
            gameBall.elem.style.background = gameBall.color;
        }

        gameBall.elem.style.top = gameBall.posY + "px";
        gameBall.elem.style.left = gameBall.posX + "px";
    },

    reset() {
        gameBall.height = 20;
        gameBall.width = 20;
        gameBall.posY = gameBoard.height / 2 - gameBall.height / 2;
        gameBall.posX = gameBoard.width / 2 - gameBall.width / 2;
        gameBall.speedX = -5;
        gameBall.speedY = -5;

        gameBall.show(1);
    },

    move() {
        if (gameBall.posY <= 0 || gameBall.posY >= gameBoard.height - gameBall.height) gameBall.speedY *= -1;

        if (gameBall.posX <= firstPlayerBar.posX + firstPlayerBar.width && gameBall.posY + gameBall.height >= firstPlayerBar.posY && gameBall.posY <= firstPlayerBar.posY + firstPlayerBar.height) {
            
            (gameBall.speedY < 0) ? gameBall.speedY-- : gameBall.speedY++;

            gameBall.speedX--;
            gameBall.speedX *= -1;

            if (gameBall.posY + gameBall.height <= firstPlayerBar.posY + 10 && gameBall.speedY > 0) gameBall.speedY *= -1;
            else if (gameBall.posY >= firstPlayerBar.posY + firstPlayerBar.height - 10 && gameBall.speedY < 0) gameBall.speedY *= -1;
        }
        else if (gameBall.posX + gameBall.width >= secondPlayerBar.posX && gameBall.posY + gameBall.height >= secondPlayerBar.posY && gameBall.posY <= secondPlayerBar.posY + secondPlayerBar.height) {
            
            (gameBall.speedY < 0) ? gameBall.speedY-- : gameBall.speedY++;

            gameBall.speedX++;
            gameBall.speedX *= -1;

            if (gameBall.posY + gameBall.height <= secondPlayerBar.posY + 10 && gameBall.speedY > 0) gameBall.speedY *= -1;
            else if (gameBall.posY >= secondPlayerBar.posY + secondPlayerBar.height - 10 && gameBall.speedY < 0) gameBall.speedY *= -1;
        }

        gameBall.posX += gameBall.speedX;
        gameBall.posY += gameBall.speedY;
    }
};

const firstPlayerBar = {
    height: 100,
    width: 10,
    posY: gameBoard.height / 2 - 100 / 2,
    posX: 15,
    speedY: 10,
    color: "#BAD7E9",
    direction: null,
    point: 0,

    create() {
        let bar = document.createElement("div");
        bar.id = "first-player-bar";

        this.elem = bar;

        let point = document.createElement("p");
        point.id = "first-player-point";

        gameBoard.elem.append(bar);
        gameBoard.elem.append(point);

        this.show(1);
    },

    reset() {
        firstPlayerBar.height = 100;
        firstPlayerBar.width = 10;
        firstPlayerBar.posY = gameBoard.height / 2 - firstPlayerBar.height / 2;
        firstPlayerBar.posX = 15;
        firstPlayerBar.speedY = 10;
        firstPlayerBar.direction = null;

        firstPlayerBar.show(1);
    },

    show(state = 0) {
        if (state) {
            firstPlayerBar.elem.style.height = firstPlayerBar.height + "px";
            firstPlayerBar.elem.style.width = firstPlayerBar.width + "px";
    
            firstPlayerBar.elem.style.borderRadius = "3px";
            firstPlayerBar.elem.style.background = firstPlayerBar.color;
        }

        firstPlayerBar.elem.style.top = firstPlayerBar.posY + "px";
        firstPlayerBar.elem.style.left = firstPlayerBar.posX + "px";

        const point = document.getElementById("first-player-point");

        point.style.left = gameBoard.width / 2 - 100 + "px";
        point.innerHTML = firstPlayerBar.point;
    },

    move() {
        if (firstPlayerBar.direction == "up") firstPlayerBar.posY -= firstPlayerBar.speedY;
        else if (firstPlayerBar.direction == "down") firstPlayerBar.posY += firstPlayerBar.speedY;

        if (firstPlayerBar.posY < 10) firstPlayerBar.posY = 10;
        else if (firstPlayerBar.posY > gameBoard.height - firstPlayerBar.height - 10) firstPlayerBar.posY = gameBoard.height - firstPlayerBar.height - 10;
    }
};

const secondPlayerBar = {
    height: 100,
    width: 10,
    posY: gameBoard.height / 2 - 100 / 2,
    posX: gameBoard.width - 30,
    speedY: 10,
    color: "#BAD7E9",
    direction: null,
    point: 0,

    create() {
        let bar = document.createElement("div");
        bar.id = "second-player-bar";

        this.elem = bar;

        let point = document.createElement("p");
        point.id = "second-player-point";

        gameBoard.elem.append(bar);
        gameBoard.elem.append(point);

        this.show(1);
    },

    show(state = 0) {
        if (state) {
            secondPlayerBar.elem.style.height = secondPlayerBar.height + "px";
            secondPlayerBar.elem.style.width = secondPlayerBar.width + "px";
    
            secondPlayerBar.elem.style.borderRadius = "3px";
            secondPlayerBar.elem.style.background = secondPlayerBar.color;
        }

        secondPlayerBar.elem.style.top = secondPlayerBar.posY + "px";
        secondPlayerBar.elem.style.left = secondPlayerBar.posX + "px";
        
        const point = document.getElementById("second-player-point");

        point.style.left = gameBoard.width / 2 + 100 + "px";
        point.innerHTML = secondPlayerBar.point;
    },

    reset() {
        secondPlayerBar.height = 100;
        secondPlayerBar.width = 10;
        secondPlayerBar.posY = gameBoard.height / 2 - secondPlayerBar.height / 2;
        secondPlayerBar.posX = gameBoard.width - 30;
        secondPlayerBar.speedY = 10;
        secondPlayerBar.direction = null;

        secondPlayerBar.show(1);
    },

    move() {
        if (secondPlayerBar.direction == "up") secondPlayerBar.posY -= secondPlayerBar.speedY;
        else if (secondPlayerBar.direction == "down") secondPlayerBar.posY += secondPlayerBar.speedY;

        if (secondPlayerBar.posY < 10) secondPlayerBar.posY = 10;
        else if (secondPlayerBar.posY > gameBoard.height - secondPlayerBar.height - 10) secondPlayerBar.posY = gameBoard.height - secondPlayerBar.height - 10;
    }
};

gameBoard.create();
gameBall.create();
firstPlayerBar.create();
secondPlayerBar.create();

document.onkeydown = function(e) {
    if (e.keyCode == 87) firstPlayerBar.direction = "up";
    else if (e.keyCode == 83) firstPlayerBar.direction = "down";
    else if (e.keyCode == 38) secondPlayerBar.direction = "up";
    else if (e.keyCode == 40) secondPlayerBar.direction = "down";
};

document.onkeyup = function (e) {
    if (e.keyCode == 87 || e.keyCode == 83) firstPlayerBar.direction = null;
    else if (e.keyCode == 38 || e.keyCode == 40) secondPlayerBar.direction = null;
}

window.onresize = function(e) {
    if (document.documentElement.clientHeight < 400 || document.documentElement.clientWidth < 600) return;

    document.body.style.height = document.documentElement.clientHeight + "px";

    gameBoard.reset();
    gameBall.reset();
    firstPlayerBar.reset();
    secondPlayerBar.reset();

    gameBoard.show();
    gameBall.show();
    firstPlayerBar.show();
    secondPlayerBar.show();
}

function game() {
    if (gameBall.posX <= 0 || gameBall.posX + gameBall.width >= gameBoard.width) {

        (gameBall.posX <= 0) ? secondPlayerBar.point++ : firstPlayerBar.point++;

        gameBall.reset();
        firstPlayerBar.reset();
        secondPlayerBar.reset();

        gameBoard.show();
    }

    gameBall.move();
    firstPlayerBar.move();
    secondPlayerBar.move();
    
    gameBall.show();
    firstPlayerBar.show();
    secondPlayerBar.show();
}

var loop = setInterval(game, 20);
