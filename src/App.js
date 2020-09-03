import React, { useState, useEffect } from 'react';
import './App.css';
import { cloneDeep } from 'lodash';
import { useEvent } from './keyEvents';
import Board from './Board';
import Header from './Header';

const App = () => {
	const UP_ARROW = 38;
	const DOWN_ARROW = 40;
	const LEFT_ARROW = 37;
	const RIGHT_ARROW = 39;
	const [restart, setRestart] = useState(false);
	const [stop, setStop] = useState(true);
	const [score, setScore] = useState(0);
	// const[]
	const [best, setBest] = useState(0);
	const [data, setData] = useState([
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
	]);
	const swipeLeft = () => {
		let newData = cloneDeep(data);
		for (let i = 0; i < 4; i++) {
			let s = 0;
			let f = 1;
			let currRow = newData[i];
			while (s < 4 && f < 4) {
				// if (f === 4) {
				// 	f = s + 1;
				// 	s++;
				// 	continue;
				// }
				if (
					(currRow[s] === 0 && currRow[f] === 0) ||
					(currRow[s] !== 0 && currRow[f] === 0)
				) {
					f++;
					continue;
				}
				if (currRow[s] === 0 && currRow[f] !== 0) {
					currRow[s] = currRow[f];
					currRow[f] = 0;
					f = s + 1;
					continue;
				}
				if (currRow[f] !== 0 && currRow[s] !== 0) {
					if (currRow[f] === currRow[s]) {
						currRow[s] += currRow[f];

						setScore(score + currRow[s]);
						currRow[f] = 0;
					}
					s++;
					f = s + 1;
					continue;
				}
			}
		}
		addNumber(newData);
		setData(newData);
	};
	const swipeRight = () => {
		let newData = cloneDeep(data);
		for (let i = 0; i < 4; i++) {
			let s = 3;
			let f = 2;
			let currRow = newData[i];
			while (s >= 0 && f >= 0) {
				// if (f === 0) {
				// 	s--;
				// 	f = s - 1;
				// 	continue;
				// }
				if (
					(currRow[s] === 0 && currRow[f] === 0) ||
					(currRow[s] !== 0 && currRow[f] === 0)
				) {
					f--;
					continue;
				}
				if (currRow[s] === 0 && currRow[f] !== 0) {
					currRow[s] = currRow[f];
					currRow[f] = 0;
					f = s - 1;
					continue;
				}
				if (currRow[f] !== 0 && currRow[s] !== 0) {
					if (currRow[f] === currRow[s]) {
						currRow[s] += currRow[f];
						setScore(score + currRow[s]);
						currRow[f] = 0;
					}
					s--;
					f = s - 1;
					continue;
				}
			}
		}
		addNumber(newData);
		setData(newData);
	};
	const swipeUp = () => {
		let newData = cloneDeep(data);
		for (let i = 0; i < 4; i++) {
			let s = 0;
			let f = 1;
			while (s < 4 && f < 4) {
				// if (f === 4) {
				// 	s++;
				// 	f = s + 1;
				// 	continue;
				// }
				if (
					(newData[s][i] === 0 && newData[f][i] === 0) ||
					(newData[s][i] !== 0 && newData[f][i] === 0)
				) {
					f++;
					continue;
				}
				if (newData[s][i] === 0 && newData[f][i] !== 0) {
					newData[s][i] = newData[f][i];
					newData[f][i] = 0;
					f = s + 1;
					continue;
				}
				if (newData[f][i] !== 0 && newData[s][i] !== 0) {
					if (newData[f][i] === newData[s][i]) {
						newData[s][i] += newData[f][i];
						setScore(score + newData[s][i]);
						newData[f][i] = 0;
					}
					s++;
					f = s + 1;
					continue;
				}
			}
		}
		addNumber(newData);
		setData(newData);
	};
	const swipeDown = () => {
		let newData = cloneDeep(data);
		for (let i = 3; i >= 0; i--) {
			let s = 3;
			let f = 2;
			while (s >= 0 && f >= 0) {
				// if (f === 0) {
				// 	s--;
				// 	f = s - 1;

				// 	continue;
				// }
				if (
					(newData[s][i] === 0 && newData[f][i] === 0) ||
					(newData[s][i] !== 0 && newData[f][i] === 0)
				) {
					f--;
					continue;
				}
				if (newData[s][i] === 0 && newData[f][i] !== 0) {
					newData[s][i] = newData[f][i];
					newData[f][i] = 0;
					f = s - 1;
					continue;
				}
				if (newData[f][i] !== 0 && newData[s][i] !== 0) {
					if (newData[f][i] === newData[s][i]) {
						newData[s][i] += newData[f][i];
						newData[f][i] = 0;
						setScore(score + newData[s][i]);
					}
					s--;
					f = s - 1;
					continue;
				}
			}
		}
		addNumber(newData);
		setData(newData);
	};
	const handleKeys = (event) => {
		switch (event.keyCode) {
			case UP_ARROW:
				swipeUp();
				break;
			case DOWN_ARROW:
				swipeDown();
				break;
			case LEFT_ARROW:
				swipeLeft();
				break;
			case RIGHT_ARROW:
				swipeRight();
				break;
			default:
		}
	};
	const checkEnd = () => {
		if (!stop) return;

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (i - 1 >= 0 && data[i][j] === data[i - 1][j]) return true;
				if (i + 1 <= 3 && data[i][j] === data[i + 1][j]) return true;
				if (j - 1 >= 0 && data[i][j] === data[i][j - 1]) return true;
				if (j + 1 <= 3 && data[i][j] === data[i][j + 1]) return true;
			}
		}
		setStop(false);
		return false;
	};
	const checkPosibility = () => {
		for (let i = 0; i < 4; i++)
			for (let j = 0; j < 4; j++)
				if (data[i][j] !== 0) {
				} else return true;
		return false;
	};
	const addNumber = (newData) => {
		if (!stop) {
			if (localStorage.getItem('best') < score) {
				localStorage.setItem('best', score);
			}
			return;
		}
		if (!checkPosibility()) {
			if (!checkEnd()) {
				alert('Game Over');
				setStop(false);
				if (localStorage.setItem('best', score) < score) {
					localStorage.setItem('best', score);
				}
				return;
			}
			return;
		}

		while (true) {
			let row = Math.floor(Math.random() * 4);
			let col = Math.floor(Math.random() * 4);
			if (newData[row][col] !== 0) continue;
			newData[row][col] = Math.random() > 0.5 ? 2 : 4;
			break;
		}
	};
	const initializeBoard = () => {
		let newData = cloneDeep(data);
		setStop(true);
		addNumber(newData);
		addNumber(newData);
		setData(newData);
	};
	useEffect(() => {
		if (localStorage.getItem('best')) {
			setBest({ ...best, best: localStorage.getItem('best') });
		} else localStorage.setItem('best', 0);

		initializeBoard();
	}, [restart]);

	useEvent('keydown', handleKeys);
	return (
		<div className="App">
			<Header
				restart={restart}
				setRestart={setRestart}
				data={data}
				setData={setData}
				score={score}
				setScore={setScore}
			/>

			{!stop ? (
				<div className="App_end">Your Score {score} Game Over...</div>
			) : (
				''
			)}
			<Board data={data} />
		</div>
	);
};

export default App;
