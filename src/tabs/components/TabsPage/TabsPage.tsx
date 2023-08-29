import { useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import "./TabsPage.css";

function Popup() {
	// Testing
	// const [tabs] = useState([
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
	// ]);

	// NOTE http://localhost:5173/src/tabs/tabs.html - page

	const [tabs, setTabs] = useState([]);

	useEffect(() => {
		// Get tabs from storage
		chrome.storage.local.get(["myData"], (result) => {
			setTabs(result.myData);
		});
	}, []);

	const handleFaviconError = (e) => {
		// FIX - still some icons are bad
		e.target.src = "../../images/default_page.png";
	};

	const handleRemoveTab = (id) => {
		chrome.storage.local.get(["myData"], (result) => {
			const newTabs = result.myData.filter((item) => item.id !== id);
			chrome.storage.local.set({ myData: newTabs }, () => {
				setTabs(newTabs);
			});
		});
	};

	const handleCardClick = (item) => {
		// TODO mabye make this an option
		chrome.tabs.create({ url: item.url, active: false });
		handleRemoveTab(item.id);
	};

	return (
		<>
			{tabs.map((item, index) => (
				<div
					className="tab_card"
					key={index}
					onClick={() => handleCardClick(item)}
				>
					<img
						className="icon"
						src={item.favIconUrl}
						onError={handleFaviconError}
					/>
					<p>
						{/* TODO fix length thing? */}
						{item.title.length > 21
							? `${item.title.slice(0, 21)}...`
							: item.title}
					</p>
					<VscChromeClose
						className="close"
						onClick={(e) => {
							e.stopPropagation();
							handleRemoveTab(item.id);
						}}
					/>
				</div>
			))}
		</>
	);
}

export default Popup;
