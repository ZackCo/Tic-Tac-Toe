// Code by Zack C.

/*jslint browser: true */
/*jslint devel: true */

window.onload = function () {
    "use strict";
    var board = document.getElementById("board");

    function setBoardSize() {
        var boardSize = Math.min(window.innerHeight, window.innerWidth);
        board.style.width = boardSize;
        board.style.height = board.style.width;
    }
    window.onresize = setBoardSize;
    setBoardSize();

    var isX = true;
    var moveCount = 0;


    var onCellClick = function () {
        if (!this.classList.contains("x") && !this.classList.contains("o")) {
            if (isX) {
                this.classList.add("x");
            } else {
                this.classList.add("o");
            }
            isX = !isX;
            moveCount += 1;
            checkIfOver();
        }
    };

    var boardCells = [];
    var cells = document.getElementsByClassName("cell");
    for (var i = 0; i < cells.length; i += 1) {
        cells[i].addEventListener("click", onCellClick);
        boardCells[i] = cells[i];
    }

    var winnableStates = [
        // Horizontal
        [boardCells[0], boardCells[1], boardCells[2]],
        [boardCells[3], boardCells[4], boardCells[5]],
        [boardCells[6], boardCells[7], boardCells[8]],

        // Vertical
        [boardCells[0], boardCells[3], boardCells[6]],
        [boardCells[1], boardCells[4], boardCells[7]],
        [boardCells[2], boardCells[5], boardCells[8]],

        // Diagonal
        [boardCells[0], boardCells[4], boardCells[8]],
        [boardCells[2], boardCells[4], boardCells[6]]
        ]

    // Folds over the list of winnable states in order to check for a winner.
    function foldWinnable(cellType) {
        return winnableStates.reduce(function (a, b) {
            return a || b.reduce(function (x, y) {
                return x && isCellOf(y, cellType);
            }, true);
        }, false);
    }

    function checkIfOver() {
        var gameOver = false;
        var gameOverMessage = "";

        if (moveCount === 9) {
            gameOver = true;
            gameOverMessage = "Tie game."
        }

        if (foldWinnable("x")) {
            gameOver = true;
            gameOverMessage = "X wins."
        }

        if (foldWinnable("o")) {
            gameOver = true;
            gameOverMessage = "O wins."
        }

        if (gameOver) {
            setTimeout(function () {
                alert(gameOverMessage);
                location.reload();
            }, 100);
        }
    }

    function isCellOf(cell, cellType) {
        return cell.classList.contains(cellType);
    }
};
