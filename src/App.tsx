import { useState, useEffect } from "react";

import "./App.css";

import TabsList from "./components/TabsList";

async function getCurrentTab() {
	const queryOptions = { active: true, lastFocusedWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);

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
		if (window.location.href === "http://localhost:5173/") {
			// TESTING
			const newElem = {
				id: data.length,
				title: "000000000000000000000",
				url: "url",
				favIconUrl:
					"https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
				// "https://www.youtube.com/s/desktop/165dcb41/img/favicon.ico",
			};
			const newData = [...data, newElem];
			setData(newData);
			localStorage.setItem("myData", JSON.stringify(newData));
		} else {
			// EXTENTION
			const MyTab = getCurrentTab();
			MyTab.then((tab) => {
				if (tab) {
					console.log("Tab:" + tab);

					const newElem = {
						id: data.length,
						title: tab.title,
						url: tab.url,
						favIconUrl: tab.favIconUrl,
					};
					const newData = [...data, newElem];
					setData(newData);
					localStorage.setItem("myData", JSON.stringify(newData));

					const views = chrome.extension.getViews({ type: "popup" });
					if (views.length > 0) {
						views[0].close();
					}


					// chrome.tabs.remove(tab.id);
					// TODO - how do i open popup after closing the tab?

					// Open popup of extention on current page
					// NOTE - thats how can i open new tab like onetab?
					// chrome.tabs.create({
					// 	url: chrome.runtime.getURL("index.html"),
					// 	active: true,
					// });
				}
			});
		}
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
			<TabsList data={data} />
		</>
	);
}

export default Popup;
