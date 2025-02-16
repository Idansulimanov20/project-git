const socket = new WebSocket("ws://localhost:3000");
let symbol = null;

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "waiting") {
        document.getElementById("status").innerText = data.message;
    }

    if (data.type === "start") {
        symbol = data.symbol;
        document.getElementById("status").innerText = "המשחק התחיל! אתה " + symbol;
    }

    if (data.type === "update") {
        updateBoard(data.board);
    }
};

function createBoard() {
    const board = document.getElementById("board");
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => makeMove(i));
        board.appendChild(cell);
    }
}

function makeMove(index) {
    if (!symbol) return;
    socket.send(JSON.stringify({ type: "move", index }));
}

createBoard();
