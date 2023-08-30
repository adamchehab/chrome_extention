import { useEffect, useState } from "react";
import TabCard from "../TabCard/TabCard.tsx";

function Popup() {
	// Testing
	// let tabs = [
	// 	{
	// 		id: 1,
	// 		title: "Google",
	// 		url: "https://www.google.com",
	// 		favIconUrl: "https://www.google.com/favicon.ico",
	// 	},
	// 	{
	// 		id: 2,
	// 		title: "GitHub",
	// 		url: "https://github.com",
	// 		favIconUrl: "https://github.com/favicon.ico",
	// 	},
	// 	{
	// 		id: 3,
	// 		title: "Stack Overflow",
	// 		url: "https://stackoverflow.com",
	// 		favIconUrl:
	// 			"https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196",
	// 	},
	// ];

	// Add new parameter to tabs - domain
	// tabs = tabs.map((item) => {
	// 	const url = new URL(item.url);
	// 	const domain = url.hostname;
	// 	return { ...item, domain };
	// });

	// console.log(tabs);

	// NOTE http://localhost:5173/src/tabs/tabs.html - page

	const [tabs, setTabs] = useState([]);

	let domains = [...new Set(tabs.map((tab) => tab.domain))];

	let domainCounts = tabs.reduce((counts, tab) => {
		counts[tab.domain] = (counts[tab.domain] || 0) + 1;
		return counts;
	}, {});

	tabs.forEach((tab) => {
		if (domainCounts[tab.domain] === 1) {
			tab.domain = "other";
		}
	});

	domains = [...new Set(tabs.map((tab) => tab.domain))];

	domainCounts = tabs.reduce((counts, tab) => {
		counts[tab.domain] = (counts[tab.domain] || 0) + 1;
		return counts;
	}, {});

	console.log(tabs);
	

	// Get tabs from storage
	useEffect(() => {
		chrome.storage.local.get(["myData"], (result) => {
			setTabs(result.myData);
		});
	}, []);

	// FIXED - still some icons are bad

	return (
		<>
			{/* {tabs.map((tab, index) => (
				<TabCard tab={tab} index={index} setTabs={setTabs} />
			))} */}
			{domains.map((domain) => (
				<div key={domain}>
					<h2>{domain + domainCounts[domain]}</h2>
					<ul>
						{tabs
							.filter((tab) => tab.domain === domain)
							.map((tab, index) => (
								<TabCard
									tab={tab}
									index={index}
									setTabs={setTabs}
								/>
							))}
					</ul>
				</div>
			))}
		</>
	);
}

export default Popup;
