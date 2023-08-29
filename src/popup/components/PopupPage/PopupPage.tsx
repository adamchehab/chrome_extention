import "./PopupPage.css";

function Popup() {
	const handleClick = async () => {
		const tabs = await chrome.tabs.query({ currentWindow: true });

		chrome.storage.local.set({ myData: tabs }, async () => {
			// Close all tabs
			const tabs = await chrome.tabs.query({ currentWindow: true });
			tabs.forEach((tab) => {
					chrome.tabs.remove(tab.id);
			});

			// Open tabs page
			chrome.tabs.create({ url: "./src/tabs/tabs.html" });
		});
	};

	// FIX - if one tab (tabs page)
	// FIX - if already is groped page

	return (
		<>
			<button onClick={handleClick}>Group tabs</button>
		</>
	);
}

export default Popup;
