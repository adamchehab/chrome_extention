import { useEffect, useState } from "react";
import "./PopupPage.css";
import { v4 as uuidv4 } from "uuid";

const EXT_URL =
	"chrome-extension://hgcdfggekddfgofdcipljccojljpbinn/src/tabs/tabs.html";

function TestComponent() {
	const [buttonEnabled, setButtonEnabled] = useState(true);

	useEffect(() => {
		// if current url is extention page - disable button
		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			const currentTab = tabs[0];
			if (currentTab.url.includes(EXT_URL)) {
				setButtonEnabled(false);
			}
		});
	}, []);

	const handleClearData = () => {
		chrome.storage.local.set({ myData: [] });
		chrome.storage.local.get(["myData"], (result) => {
			console.log(result.myData);
		});
	};

	const handleClick = async () => {
		chrome.storage.local.get(["myData"], async (result) => {
			// Get tabs
			let tabs = await chrome.tabs.query({ currentWindow: true });

			// Filter extention page
			tabs = tabs.filter((tab) => !tab.url.includes(EXT_URL));

			// Add date to tabs
			const date = new Date();
			const dateString = date.toLocaleString();
			tabs = tabs.map((tab) => ({ ...tab, dateString }));

			// Add session id
			const sessionId = uuidv4();
			tabs = tabs.map((tab) => ({ ...tab, sessionId }));

			// Add domain
			tabs = tabs.map((tab) => {
				const url = new URL(tab.url);
				let domain = url.hostname.replace(".com", "");
				if (domain.startsWith("www.")) {
					domain = domain.slice(4);
				}
				domain = domain.split(".")[0];
				// Make first latter capital
				domain = domain.charAt(0).toUpperCase() + domain.slice(1);
				return { ...tab, domain};
			});

			// Add tabs to myData
			const newData = [...tabs, ...result.myData];

			console.log(newData);

			// Save myData
			chrome.storage.local.set({ myData: newData }, async () => {
				// Close all tabs
				// const tabs = await chrome.tabs.query({ currentWindow: true });
				// tabs.forEach((tab) => {
				// 		chrome.tabs.remove(tab.id);
				// });
				// Open extention page if its not opened

				// chrome.tabs.create({ url: "./src/tabs/tabs.html" });

				// Close all tabs except tab which contains EXT_URL
				// const tabs = await chrome.tabs.query({ currentWindow: true });
				// tabs.forEach((tab) => {
				// 	if (!tab.url.includes(EXT_URL)) {
				// 		chrome.tabs.remove(tab.id);
				// 	}
				// });

				// // Open extention page if its not opened
				// const isOpened = tabs.some((tab) => tab.url.includes(EXT_URL));
				// if (!isOpened) {
				// 	chrome.tabs.create({ url: "./src/tabs/tabs.html" });
				// }

				// Close all tabs
				const tabs = await chrome.tabs.query({ currentWindow: true });
				tabs.forEach((tab) => {
					chrome.tabs.remove(tab.id);
				});

				// Open extention page
				chrome.tabs.create({ url: "./src/tabs/tabs.html" });
			});
		});
		// clea myData
	};

	// FIXED - if one tab (tabs page)
	// FIXED - if already is groped page

	// FIXED - if current tab is extentiuon page - cant press button

	// FIX when first installed MyData is not initisised correctly

	// NOTE dont add existing tabs ?

	return (
		<>
			<button onClick={handleClick} disabled={!buttonEnabled} className="mr-2">Save tabs</button>
			<button onClick={handleClearData}>Clear Data</button>
		</>
	);
}

export default TestComponent;
