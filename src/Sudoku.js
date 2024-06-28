import React, { useState } from 'react';
import './SudokuGrid.css'; // Updated styling for colorful Sudoku grid
import { toast } from 'react-toastify';

const SudokuGrid = () => {
    function getRandomBoard() {
        const boards = [
            [
                ['5', '3', '', '', '7', '', '', '', ''],
                ['6', '', '', '1', '9', '5', '', '', ''],
                ['', '9', '8', '', '', '', '', '6', ''],
                ['8', '', '', '', '6', '', '', '', '3'],
                ['4', '', '', '8', '', '3', '', '', '1'],
                ['7', '', '', '', '2', '', '', '', '6'],
                ['', '6', '', '', '', '', '2', '8', ''],
                ['', '', '', '4', '1', '9', '', '', '5'],
                ['', '', '', '', '8', '', '', '7', '9']
            ],
            [
                ['', '', '', '2', '6', '', '7', '', '1'],
                ['6', '8', '', '', '7', '', '', '9', ''],
                ['1', '9', '', '', '', '4', '5', '', ''],
                ['8', '2', '', '1', '', '', '', '4', ''],
                ['', '', '4', '6', '', '2', '9', '', ''],
                ['', '5', '', '', '', '3', '', '2', '8'],
                ['', '', '9', '3', '', '', '', '7', '4'],
                ['', '4', '', '', '5', '', '', '3', '6'],
                ['7', '', '3', '', '1', '8', '', '', '']
            ],
            [
                ['', '', '', '', '7', '', '', '9', ''],
                ['', '4', '', '8', '', '5', '', '', ''],
                ['', '', '', '', '', '', '', '1', ''],
                ['', '', '', '', '', '2', '', '', ''],
                ['', '6', '', '', '', '', '8', '', ''],
                ['', '', '', '3', '4', '', '', '', ''],
                ['', '', '', '', '8', '', '', '', ''],
                ['', '', '9', '7', '', '', '', '6', ''],
                ['', '7', '', '', '2', '', '5', '', '']
            ]
        ];

        const randomIndex = Math.floor(Math.random() * boards.length);
        return boards[randomIndex];
    }
    // const initialGrid = [
    //     [5, 3, '', '', 7, '', '', '', ''],
    //     [6, '', '', 1, 9, 5, '', '', ''],
    //     ['', 9, 8, '', '', '', '', 6, ''],
    //     [8, '', '', '', 6, '', '', '', 3],
    //     [4, '', '', 8, '', 3, '', '', 1],
    //     [7, '', '', '', 2, '', '', '', 6],
    //     ['', 6, '', '', '', '', 2, 8, ''],
    //     ['', '', '', 4, 1, 9, '', '', 5],
    //     ['', '', '', '', 8, '', '', 7, 9]
    // ];

    const initialGrid = getRandomBoard();

    const [grid, setGrid] = useState(initialGrid);

    var isValidSudoku = function (board) {
        const subgrids = Array.from({ length: 9 }, () => new Set());

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                for (let k = j + 1; k < board.length; k++) {
                    if (board[i][j] === board[i][k] && board[i][k] !== "") {
                        console.log(board[i][k])
                        return false
                    }
                    if (board[j][i] === board[k][i] && board[k][i] !== "") {
                        console.log(board[k][i])
                        return false
                    }
                }
                const num = board[i][j];
                if (num !== '') {
                    const subgridIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

                    if (subgrids[subgridIndex].has(num)) {
                        return false;
                    }

                    subgrids[subgridIndex].add(num);
                }
            }
        }
        return true
    };

    const handleChange = (e, row, col) => {
        const value = e.target.value;
        if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 9)) {
            const newGrid = [...grid];
            newGrid[row][col] = value === '' ? '' : parseInt(value);
            const valid = isValidSudoku(newGrid);
            if (!valid) {
                toast.error("Sorry wrong input..")
            } else {
                setGrid(newGrid);
            }
        }
    };

    const handleReset = () => {
        setGrid(initialGrid);
        toast.success("reset successfully")
    }

    const renderGrid = () => {
        return (
            <div className="sudoku-grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div key={colIndex} className="cell">
                                <input
                                    type="text"
                                    value={cell === '' ? '' : cell}
                                    onChange={(e) => handleChange(e, rowIndex, colIndex)}
                                    maxLength="1"
                                    className={cell === '' ? 'empty' : 'filled'}
                                    disabled={cell === '' ? false : true}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="sudoku-container">
            <h2>Sudoku Game</h2>
            {renderGrid()}
            <button onClick={() => handleReset()}>Reset</button>
            <footer style={{ position: 'absolute', bottom: 0, width: '100%', fontWeight: 500, color: 'red' }}>
                <p>@Maintained by Hari</p>
            </footer>
        </div>
    );
};

export default SudokuGrid;
