import React from 'react';

function Board({ data }) {
	const getColor = (digit) => {
		switch (digit) {
			case 2:
				return '#EEE4DA';
			case 4:
				return '#EDE0C8';
			case 8:
				return '#F2B179';
			case 16:
				return '#F59563';
			case 32:
				return '#F67C5F';
			case 64:
				return '#F65E3B';
			case 128:
				return '#EDCF72';
			case 256:
				return 'hsl(21deg 100% 40%)';
			case 512:
				return '#EDE0C8';
			case 1024:
				return '#EDE0C8';
			case 2048:
				return '#EDE0C8';
			default:
				return '#CDC1B4';
		}
	};
	return (
		<div className="Board">
			{data.map((row, oneIndex) => (
				<div style={{ display: 'flex' }} key={oneIndex}>
					{row.map((digit, index) => (
						<div
							className="Board_box"
							style={{
								backgroundColor: getColor(digit),
								color: digit === 2 || digit === 4 ? '#776E65' : 'white',
							}}
							key={index}
						>
							{digit === 0 ? '' : digit}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default Board;
