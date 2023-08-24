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

	// Retrieve data from local storage on component mount
	useEffect(() => {
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
		// Tabs
		// let MyTab = getCurrentTab();
		// MyTab.then((tab) => {
		// 	if (tab) {
		// 		console.log(tab);

		// 		const newElem = {
		// 			id: data.length,
		// 			title: tab.title,
		// 			url: tab.url,
		// 			favIconUrl: tab.favIconUrl,
		// 		};
		// 		const newData = [...data, newElem];
		// 		setData(newData);
		// 		localStorage.setItem("myData", JSON.stringify(newData));
		// 	}
		// });

		// For testing
		const newElem = {
			id: data.length,
			title: "title",
			url: "url",
			favIconUrl:
				"https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
		};
		const newData = [...data, newElem];
		setData(newData);
		localStorage.setItem("myData", JSON.stringify(newData));
		setClick(true);
	};

	return (
		<>
			<div className="flex">
				<div className="card">
					<button
						className={`${
							click ? `opacity-40 border-none` : ``
						} select-none transition-all duration-300`}
						disabled={click}
						onClick={handleClick}
					>
						Save
					</button>
				</div>
				{/* TODO add 2nd disable button? add it all to a separate class */}
				<div className="card">
					<button
						onClick={() => {
							setData([]);
							localStorage.removeItem("myData");
						}}
					>
						Clear storage
					</button>
				</div>
			</div>
			<div>
				{data.map((item, index) => (
					<div
						className="flex border-2 border-[#212020] rounded-lg bg-[#303030] p-1 pl-3 m-1 shadow-md"
						key={index}
					>
						<img className="w-8 h-8" src={item.favIconUrl} />
						<a href={item.url}>{item.title}</a>
					</div>
				))}
			</div>
		</>
	);
}

export default Popup;
