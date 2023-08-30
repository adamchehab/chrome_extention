import { VscChromeClose } from "react-icons/vsc";
import "./TabCard.css";

const TabCard = ({ tab, index, setTabs }) => {
	const handleRemoveTab = (id) => {
		console.log("removed tab");
		chrome.storage.local.get(["myData"], (result) => {
			const newTabs = result.myData.filter((item) => item.id !== id);
			chrome.storage.local.set({ myData: newTabs }, () => {
				setTabs(newTabs);
				console.log(newTabs);
			});
		});
	};

	const handleCardClick = (item) => {
		// TODO mabye make this an option
		chrome.tabs.create({ url: item.url, active: false });
		console.log("tab opened");

		handleRemoveTab(item.id);
	};

	return (
		<div
			className="tab_card"
			key={index}
			onClick={() => handleCardClick(tab)}
		>
			<img
				className="icon"
				src={
					tab.favIconUrl
						? tab.favIconUrl
						: "../../images/default_page.png"
				}
				// onError={handleFaviconError}
			/>
			<p>
				{/* TODO fix length thing? */}
				{tab.title.length > 21
					? `${tab.title.slice(0, 21)}...`
					: tab.title}
			</p>
			<VscChromeClose
				className="close"
				onClick={(e) => {
					e.stopPropagation();
					handleRemoveTab(tab.id);
				}}
			/>
		</div>
	);
};

export default TabCard;
