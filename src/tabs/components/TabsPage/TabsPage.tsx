import "./TabsPage.css";

function Popup() {
	const handleClick = async () => {
		chrome.tabs.create({ url: "./src/tabs/tabs.html" });
	};

	return (
		<>
			<button onClick={handleClick}>HELLO tabs</button>
		</>
	);
}

export default Popup;
