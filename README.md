Tic-Tac-Toe with WebSockets, Node.js, HTML, CSS, and JavaScript

Description

This is a real-time multiplayer Tic-Tac-Toe game built using WebSockets for communication between players. The project consists of a Node.js server handling WebSocket connections and a front-end built with HTML, CSS, and JavaScript.

Features

Real-time multiplayer gameplay using WebSockets

Simple and clean UI built with HTML and CSS

Node.js WebSocket server for handling player connections and game logic

Automatic game state updates between players

Reset functionality to restart the game

Technologies Used

Node.js: Backend server

WebSockets: Real-time communication

HTML, CSS, JavaScript: Front-end UI and logic

Installation

Prerequisites

Ensure you have Node.js installed on your machine.

Steps

Clone the repository:


Install dependencies:

npm install

Start the WebSocket server:

node server.js

Open index.html in a web browser or use a local server (e.g., Live Server in VS Code).

How to Play

Open the game in two separate browser tabs or share the game with a friend.

The first player to connect gets assigned X, and the second player gets O.

Players take turns clicking on the grid to place their marks.

The game updates in real-time for both players.

When a player wins or the game ends in a draw, the result is displayed.

Click the reset button to start a new round.

Project Structure

/tic-tac-toe-ws
│── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│── server.js
│── package.json
│── README.md

public/index.html - The front-end UI

public/style.css - Styling for the game

public/script.js - Client-side JavaScript logic

server.js - WebSocket server

Future Improvements

Add player authentication

Implement a lobby system for multiple games

Improve UI/UX design

License

This project is open-source and available under the MIT License.

