import { useEffect, useState } from "react";
import TabCard from "../TabCard/TabCard.tsx";
import DomainSection from "../DomainSection/DomainSection.tsx";
import SessionSection from "../SessionSection/SessionSection.tsx";
import CollapsibleDiv from "../CollapsibleDiv/CollapsibleDiv.tsx";

import data from "../../../myData.json";

import * as FileSaver from "file-saver";

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

	const domains = [...new Set(tabs.map((tab) => tab.domain))].sort();

	// domains = new Set([...domains].sort());

	const sessions = [...new Set(tabs.map((tab) => tab.sessionId))];

	// let domainCounts = tabs.reduce((counts, tab) => {
	// 	counts[tab.domain] = (counts[tab.domain] || 0) + 1;
	// 	return counts;
	// }, {});

	// tabs.forEach((tab) => {
	// 	if (domainCounts[tab.domain] === 1) {
	// 		tab.domain = "other";
	// 	}
	// });

	// domains = [...new Set(tabs.map((tab) => tab.domain))];

	// domainCounts = tabs.reduce((counts, tab) => {
	// 	counts[tab.domain] = (counts[tab.domain] || 0) + 1;
	// 	return counts;
	// }, {});

	// // Sort domains by counts
	// domains = Object.keys(domainCounts).sort((a, b) => {
	// 	return domainCounts[b] - domainCounts[a];
	// });

	// NOTE this if for extension
	// Get tabs from storage
	useEffect(() => {
		// chrome.storage.local.get(["myData"], (result) => {
		// 	setTabs(result.myData);
		// });
	}, []);

	// FIX - почему в конце все времяы новый domain - can fix by sorting domain each time
	// QUESTION mabye make it so all stuff doesnt rerender? to optimise? how do i even measure how efficient my app is?
	// NOTE use memo? or other hooks?
	// FIXED - still some icons are bad
	// TODO add search by tabs

	const getIconSection = (domain, tabs) => {
		if (domain === "other") {
			return "../../images/default_page.png";
		}
		const tab = tabs.find((tab) => tab.domain === domain);
		return tab.favIconUrl;
	};

	const getSessionDate = (sessionId) => {
		const tab = tabs.find((tab) => tab.sessionId === sessionId);
		return tab.dateString;
	};

	const saveTabsToFile = () => {
		chrome.storage.local.get(["myData"], (result) => {
			const data = new Blob([JSON.stringify(result.myData)], {
				type: "application/json",
			});
			FileSaver.saveAs(data, "myData.json");
		});
	};

	const resetData = () => {
		setTabs(data);
		// console.log(tabs);
	};

	const [tabIconsEnabled, setTabIconsEnabled] = useState(true);

	return (
		<>
			<div className="flex">
				<button
					className="mr-2"
					onClick={() => setTabIconsEnabled(!tabIconsEnabled)}
				>
					Tab icons
				</button>
				<button className="mr-2" onClick={() => saveTabsToFile()}>
					Save tabs to file
				</button>
				<button className="mr-2" onClick={() => resetData()}>
					Reset data
				</button>
				<button onClick={() => console.log(tabs)}>log</button>
			</div>
			{sessions.map((session) => (
				<SessionSection
					key={session}
					session_name={getSessionDate(session)}
				>
					{domains.map((domain) => (
						<DomainSection
							key={domain}
							domain={domain}
							icon={getIconSection(domain, tabs)}
							tabs={tabs}
							setTabs={setTabs}
						>
							{tabs
								.filter(
									(tab) =>
										tab.domain === domain &&
										tab.sessionId === session
								)
								.map((tab) => (
									<TabCard
										tab={tab}
										key={tab.id}
										tabs={tabs}
										setTabs={setTabs}
										tabIconsEnabled={tabIconsEnabled}
									/>
								))}
						</DomainSection>
					))}
				</SessionSection>
			))}
			{/* <CollapsibleDiv>
				<div>children</div>
				<div>children</div>
				<div>children</div>
			</CollapsibleDiv> */}
		</>
	);
}

export default Popup;
