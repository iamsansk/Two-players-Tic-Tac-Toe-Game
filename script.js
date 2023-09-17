//Code for getting HTML elements
const buttons = document.querySelectorAll(".buttons");
const xScore = document.getElementById("xScore");
const oScore = document.getElementById("oScore");
const playerTurn = document.getElementById("playerTurn");
const scoreBoard = document.getElementsByClassName("scoreBoard")[0];
const playerTurnLbl = document.getElementsByClassName("playerTurn")[0];
const gameBoard = document.getElementsByClassName("gameBoard")[0];
const playAgainBtn = document.querySelector("#playAgainBtn");
const resultBox = document.getElementsByClassName("resultBox")[0];
const winnerName = document.getElementById("winnerName");
const winMsg = document.getElementById("message");

//variables
let turn = "X";
let gameOver = false;
let winningChances = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];
let xScr = 0;
let oScr = 0;
let index = 0;
// Function for button click
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!gameOver) {
            btn.textContent = turn;
            btn.disabled = true;
            turn = (turn == "X") ? "O" : "X";
            playerTurn.innerHTML = `${turn}'s Turn`;
            index++;
            checkWin();
            checkGameOver();
        }
    });
});
//function for checking win
function checkWin() {
    for (let i = 0; i < winningChances.length; i++) {
        let chance = winningChances[i];
        let btn1 = buttons[chance[0]].textContent;
        let btn2 = buttons[chance[1]].textContent;
        let btn3 = buttons[chance[2]].textContent;
        if (btn1 == btn2 && btn2 == btn3 && btn1 != "" && btn2 != "" && btn3 != "") {
            if (btn1 == "X") {
                xScr++;
                xScore.innerHTML = `X : ${xScr}`;
            }
            else if (btn1 == "O") {
                oScr++;
                oScore.innerHTML = `O : ${oScr}`;
            }
            buttons[chance[0]].style.backgroundColor = "rgba(73,197,182,0.5)";
            buttons[chance[1]].style.backgroundColor = "rgba(73,197,182,0.5)";
            buttons[chance[2]].style.backgroundColor = "rgba(73,197,182,0.5)";
            gameOver = true;
            winnerName.innerHTML = btn1;
            winMsg.innerHTML = "Wins";
            scoreBoard.classList.add('active');
            playerTurnLbl.classList.add('active');
            gameBoard.classList.add('active');
            resultBox.classList.add("active");
        }
    }
}
//function for checking gameover
function checkGameOver(){
    if(index===9 && !gameOver){
        gameOver = true;
        winnerName.innerHTML = "XO";
        winMsg.innerHTML = "DRAW!!!";
        scoreBoard.classList.add('active');
        playerTurnLbl.classList.add('active');
        gameBoard.classList.add('active');
        resultBox.classList.add("active");
    }
}
//play again button click function for reset the game
playAgainBtn.onclick = function () {
    scoreBoard.classList.remove('active');
    playerTurnLbl.classList.remove('active');
    gameBoard.classList.remove('active');
    resultBox.classList.remove("active");
    gameOver = false;
    turn="X";
    playerTurn.innerHTML = `${turn}'s Turn`;
    index = 0;
    buttons.forEach(btn=>{
        btn.disabled = false;
        btn.textContent="";
        btn.style.backgroundColor = "transparent";
    });
}
