const game = Controller();
const cells = document.querySelectorAll('.cell');
const text_turn = document.getElementById('text-turn');
const game_board = document.getElementById('game');
const game_start = document.getElementById('start-game');
const player1_name = document.getElementById('player1_input');
const player2_name = document.getElementById('player2_input');
cells.forEach(item => item.addEventListener('click', clickCells));
game_start.addEventListener('click', startGame);

function Gameboard() {
    const rows = 3;
    const colum = 3;
    const board = [];
    for (let i = 0; i < rows; i++) {
         board[i] = [];
        for (let j = 0; j < colum; j++) {
            board[i].push(Cell());
        }
    }
    const getBoard = () => board;
    const dropToken = (column, row, player) => {
        if (board[row][column].getValue() == '') {
            board[row][column].addToken(player);
        }
    }
    return { getBoard, dropToken };
}

function Cell() {
    let value = '';
    const addToken = (player) => {value = player;};
    const getValue = () => value;
    return {addToken, getValue};
}

function Controller() {
    let board = Gameboard();
    let player1 = {name: 'Player1', marker: 'X'};
    let player2 = {name: 'Player2', marker: 'O'};
    let activePlayer = player1;

    const createNamePlayer = (player,name) => {
        player.name = name;
    }

    const getPlayer1 = () => player1;
    const getPlayer2 = () => player2;

    const switchActivePlayer = () => {activePlayer = (activePlayer === player1) ? player2 : player1};

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        board.dropToken(column, row, getActivePlayer().marker);
        if (isVictory()) {
            text_turn.innerText = `${getActivePlayer().name} win`;
        }
        else if (board.getBoard().every(row => row.every(item => item.getValue() != ''))) {
            text_turn.innerText = `Draw`;
        }
        else {
            switchActivePlayer();
            printNewRound();
        }
    };

    const isVictory = () => {
        for (let i = 0; i < board.getBoard().length; i++) {
            if (board.getBoard()[i].every(item => (item.getValue() == board.getBoard()[0][0].getValue() && item.getValue() != ''))) {
                return true;
            }
        }
        if (board.getBoard()[0][0].getValue() == board.getBoard()[1][1].getValue() && board.getBoard()[1][1].getValue() == board.getBoard()[2][2].getValue() && board.getBoard()[0][0].getValue() != '') {
            return true;
        }
        if (board.getBoard()[0][2].getValue() == board.getBoard()[1][1].getValue() && board.getBoard()[1][1].getValue() == board.getBoard()[2][0].getValue() && board.getBoard()[0][2].getValue() != '') {
            return true;
        }
        if ((board.getBoard()[0][0].getValue() == board.getBoard()[1][0].getValue() && board.getBoard()[1][0].getValue() == board.getBoard()[2][0].getValue() && board.getBoard()[0][0].getValue() != '') ||
            (board.getBoard()[0][1].getValue() == board.getBoard()[1][1].getValue() && board.getBoard()[1][1].getValue() == board.getBoard()[2][1].getValue() && board.getBoard()[0][1].getValue() != '') ||
            (board.getBoard()[0][2].getValue() == board.getBoard()[1][2].getValue() && board.getBoard()[1][2].getValue() == board.getBoard()[2][2].getValue() && board.getBoard()[0][2].getValue() != '')) {
            return true;
        }

    }

    const printNewRound = () => {
        text_turn.innerText = `${getActivePlayer().name}'s turn`;
    };

    const newBoard = () => {
        board = Gameboard();
    }

    return {playRound, getActivePlayer, isVictory, newBoard, createNamePlayer, getPlayer1, getPlayer2};
}

function clickCells() {
    const cellIndexRow = this.getAttribute('data-row');
    const cellIndexColumn = this.getAttribute('data-column');
    if (this.innerText == '' && text_turn.innerText != `${game.getActivePlayer().name} win`) {
        this.innerText = game.getActivePlayer().marker;
        game.playRound(cellIndexRow, cellIndexColumn);
    }
}

function startGame() {
    if (player1_name.value != '' && player2_name.value != '') {
        game_board.style.display = 'flex';
        cells.forEach(item => item.innerText = '');
        game.newBoard();
        game.createNamePlayer(game.getPlayer1(), player1_name.value);
        game.createNamePlayer(game.getPlayer2(), player2_name.value);
        text_turn.innerText = `${game.getActivePlayer().name}'s turn`;
        event.preventDefault();
    }

}