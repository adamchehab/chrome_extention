import { useState, useEffect } from "react";

import "./App.css";

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
		// Opean new tab
		chrome.tabs.create({ url: "https://example.com" });
		// Get currenttab
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			function (tabs) {
				if (tabs.length > 0) {
					const currentTab = tabs[0];
					console.log(currentTab.title);
				}
			}
		);

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
