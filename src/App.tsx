import { useState, useEffect } from "react";

import "./App.css";

async function getCurrentTab() {
	let queryOptions = { active: true, lastFocusedWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);

	return tab;
}

function Popup() {
	const [click, setClick] = useState(false);

	// Reset the button
	useEffect(() => {
		if (click) {
			const timer = setInterval(() => {
				setClick(false);
				console.log("Timer fired!");
			}, 1000);

			return () => {
				clearInterval(timer);
			};
		}
	}, [click]);

	// Click button handler
	const handleClick = () => {

		let MyTab = getCurrentTab();
		MyTab.then((tab) => {
			if (tab) {
				const title = tab.title;
        console.log(title);
      }
		});

		setClick(true);
	};

	return (
		<>
			<div className="card">
				<button
					className={`${
						click ? `opacity-40` : ``
					} select-none focus:outline-none transition-all duration-300`}
					disabled={click}
					onClick={handleClick}
				>
					Save
				</button>
			</div>
		</>
	);
}

export default Popup;
