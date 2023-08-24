import { useState, useEffect } from "react";

import "./App.css";

async function getCurrentTab() {
	let queryOptions = { active: true, lastFocusedWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);

	return tab;
}

function Popup() {
	const [click, setClick] = useState(false);
	const [data, setData] = useState([]);

	// const addItemToArray = (item) => {
	// 	let newData = [...data, item];
	// 	setData(newData);
	// 	localStorage.setItem("myData", JSON.stringify(newData));
	// };

	useEffect(() => {
		// Retrieve data from local storage on component mount
		const storedData = localStorage.getItem("myData");
		if (storedData) {
			setData(JSON.parse(storedData));
		}
	}, []);

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
		// let MyTab = getCurrentTab();
		// MyTab.then((tab) => {
		// 	if (tab) {
		// 		const newElem = {
		// 			id: data.length,
		// 			title: tab.title,
		// 			url: tab.url,
		// 		};
		// 		console.log(newElem);
		// 		addItemToArray(newElem);
		// 	}
		// });

		// const newElem = {
		// 	id: 0,
		// 	title: "tab.title",
		// 	url: "tab.url",
		// };
		const newData = [...data, "test"];
		setData(newData);
		localStorage.setItem("myData", JSON.stringify(newData));

		// console.log(newElem);
		// addItemToArray(newElem);

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
			{data}
		</>
	);
}

export default Popup;
