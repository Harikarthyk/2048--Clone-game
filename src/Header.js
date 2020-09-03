import React from 'react';
import { cloneDeep } from 'lodash';

function Header({ end , setEnd, data, setData, score, setScore }) {
	const handlenewGame = () => {
		let newData = cloneDeep(data);
		newData = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
		setData(newData);
		setScore(0);
		setEnd({...end , end : !end});
	};
	return (
		<div className="Header">
			<div className="Header_title_container">
				<div className="Header_left">
					<div className="Header_title">2048</div>
				</div>
				<div className="Header_right">
					<div className="Header_score">
						<div className="Header_score"> SCORE</div>
						{score}
					</div>
					<div className="Header_BestScore">
						<div className="Header_score">BEST </div>
						1023
					</div>
				</div>
			</div>

			<div className="Header_rules">
				<div className="Header_rules_left">
					Join the numbers and get to the 2048 tile!
				</div>
				<div className="Header_rules_right" onClick={() => handlenewGame()}>
					New Game
				</div>
			</div>
		</div>
	);
}

export default Header;
