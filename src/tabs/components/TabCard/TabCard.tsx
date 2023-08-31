import { VscChromeClose } from "react-icons/vsc";
import "./TabCard.css";

const tabIconsEnabled = true;

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
			{ tabIconsEnabled && <img
				className="icon"
				src={
					tab.favIconUrl
						? tab.favIconUrl
						: "../../images/default_page.png"
				}
			/>}
			<p className="tab_card_text">
				{/* TODO fix length thing? */}
				{tab.title.length > 31
					? `${tab.title.slice(0, 31)}...`
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
