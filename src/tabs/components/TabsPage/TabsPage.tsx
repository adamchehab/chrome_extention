import { useEffect, useState } from "react";
import "./TabsPage.css";

function Popup() {
	const [tabs, setTabs] = useState([]);

	useEffect(() => {
		// Get tabs from storage
		chrome.storage.local.get(["myData"], (result) => {
			setTabs(result.myData);
		});
	}, []);

	return (
		<>
			{tabs.map((tab) => (
				<div key={tab.id}>
					<a href={tab.url} target="_blank">{tab.title}</a>
				</div>
			))}
		</>
	);
}

export default Popup;
