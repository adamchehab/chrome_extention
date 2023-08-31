import { useEffect, useState } from "react";
import TabCard from "../TabCard/TabCard.tsx";
import TabsSection from "../TabsSection/TabsSection.tsx";

function Popup() {
	// Testing
	// const tabs = [
	// 	{
	// 		id: 1,
	// 		title: "Test1 11111111111111111111111111111111111111111111111",
	// 		url: "https://www.google.com",
	// 		domain: "chrome.google",
	// 		favIconUrl: "https://www.google.com/favicon.ico",
	// 	},
	// 	{
	// 		id: 2,
	// 		title: "Test2",
	// 		url: "https://www.google.com",
	// 		domain: "chrome.google",
	// 		favIconUrl: "https://www.google.com/favicon.ico",
	// 	},
	// 	{
	// 		id: 3,
	// 		title: "Test3",
	// 		url: "https://www.google.com",
	// 		domain: "chrome.google",
	// 		favIconUrl: "https://www.google.com/favicon.ico",
	// 	},
	// 	{
	// 		id: 4,
	// 		title: "Test4",
	// 		url: "https://www.facebook.com",
	// 		domain: "facebook",
	// 		favIconUrl: "https://www.facebook.com/favicon.ico",
	// 	},
	// 	{
	// 		id: 5,
	// 		title: "Test5",
	// 		url: "https://www.twitter.com",
	// 		domain: "facebook",
	// 		favIconUrl: "https://www.facebook.com/favicon.ico",
	// 	},
	// 	{
	// 		id: 6,
	// 		title: "Test6",
	// 		url: "https://www.github.com",
	// 		domain: "facebook",
	// 		favIconUrl: "https://www.facebook.com/favicon.ico",
	// 	},
	// 	{
	// 		id: 7,
	// 		title: "Test7",
	// 		url: "https://www.amazon.com",
	// 		domain: "amazon",
	// 		favIconUrl: "https://www.amazon.com/favicon.ico",
	// 	},
	// 	{
	// 		id: 8,
	// 		title: "Test8",
	// 		url: "https://www.netflix.com",
	// 		domain: "amazon",
	// 		favIconUrl: "https://www.amazon.com/favicon.ico",
	// 	},
	// 	{
	// 		id: 9,
	// 		title: "Test9",
	// 		url: "https://www.microsoft.com",
	// 		domain: "amazon",
	// 		favIconUrl: "https://www.amazon.com/favicon.ico",
	// 	},
	// ];

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

	// Sort domains by counts
	domains = Object.keys(domainCounts).sort((a, b) => {
		return domainCounts[b] - domainCounts[a];
	});

	// Get tabs from storage
	useEffect(() => {
		chrome.storage.local.get(["myData"], (result) => {
			setTabs(result.myData);
		});
	}, []);

	// FIXED - still some icons are bad

	const getIconSection = (domain, tabs) => {
		if (domain === "other") {
			return "../../images/default_page.png";
		}
		const tab = tabs.find((tab) => tab.domain === domain);
		return tab.favIconUrl;
	};

	const [tabIconsEnabled, setTabIconsEnabled] = useState(true);

	return (
		<>
			<button onClick={() => setTabIconsEnabled(!tabIconsEnabled)}>
				Tab icons
			</button>
			{domains.map((domain) => (
				<TabsSection
					domain={domain}
					icon={getIconSection(domain, tabs)}
					tabs={tabs}
					setTabs={setTabs}
				>
					{tabs
						.filter((tab) => tab.domain === domain)
						.map((tab, index) => (
							<TabCard
								tab={tab}
								index={index}
								setTabs={setTabs}
								tabIconsEnabled={tabIconsEnabled}
							/>
						))}
				</TabsSection>
			))}
		</>
	);
}

export default Popup;
