const WebSocket = require("ws");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let games = {};
let waitingPlayer = null;

wss.on("connection", (ws) => {
    console.log("player looged in");

    if (!waitingPlayer) {
        waitingPlayer = ws;
        ws.send(JSON.stringify({ type: "waiting", message: "waiting for opponent..." }));
    } else {
        const gameId = Date.now();
        games[gameId] = {
            players: [waitingPlayer, ws],
            board: Array(9).fill(null),
            turn: "X",
        };

        games[gameId].players.forEach((player, index) => {
            player.gameId = gameId;
            player.symbol = index === 0 ? "X" : "O";
            player.send(JSON.stringify({ type: "start", symbol: player.symbol }));
        });

        waitingPlayer = null;
    }

    ws.on("message", (message) => {
        const data = JSON.parse(message);
        if (data.type === "move") {
            const game = games[ws.gameId];
            if (!game || game.turn !== ws.symbol || game.board[data.index] !== null) return;

            game.board[data.index] = ws.symbol;
            game.turn = game.turn === "X" ? "O" : "X";

            game.players.forEach((player) => {
                player.send(JSON.stringify({ type: "update", board: game.board }));
            });

            if (checkWinner(game.board)) {
                game.players.forEach((player) => {
                    player.send(JSON.stringify({ type: "winner", winner: ws.symbol }));
                });
                delete games[ws.gameId];
            }
        }
    });

    ws.on("close", () => {
        console.log("player disconnected");
        if (ws.gameId && games[ws.gameId]) {
            games[ws.gameId].players.forEach((player) => {
                if (player !== ws) player.send(JSON.stringify({ type: "opponent_left" }));
            });
            delete games[ws.gameId];
        }
        if (waitingPlayer === ws) waitingPlayer = null;
    });
});

function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern =>
        board[pattern[0]] !== null &&
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[0]] === board[pattern[2]]
    );
}

app.use(express.static("public"));

server.listen(3000, () => console.log("runnig on port 3000"));
