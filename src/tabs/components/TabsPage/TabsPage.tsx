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

	const handleFaviconError = (e) => {
		e.target.src = "../../images/default_page.png";
	};

	return (
		<>
			{tabs.map((item, index) => (
				<div
					className="flex border-2 border-[#212020] rounded-lg bg-[#303030] p-2 pl-2 m-1 shadow-md max-w-[265px] max-h-[51px] overflow-hidden items-center"
					key={index}
				>
					<img className="w-8 h-8 mr-2" src={item.favIconUrl} onError={handleFaviconError}/>
					<a href={item.url} target="_blank">
						{item.title.length > 21
							? `${item.title.slice(0, 21)}...`
							: item.title}
					</a>
				</div>
			))}
		</>
	);
}

export default Popup;
