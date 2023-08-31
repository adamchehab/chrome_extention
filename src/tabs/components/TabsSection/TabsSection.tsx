import "./TabsSection.css";
import { VscChromeClose } from "react-icons/vsc";

const TabsSection = ({ domain, icon, tabs, setTabs, children }) => {
	const handleRemoveSection = (domain) => {
		console.log(domain);

		// FIXED left here - bug other domain doesnt close
		// chrome.storage.local.get(["myData"], (result) => {
		// 	const newTabs = result.myData.filter((item) => item.domain !== domain);
		// 	chrome.storage.local.set({ myData: newTabs }, () => {
		// 		setTabs(newTabs);
		// 	});
		// });

		const newTabs = tabs.filter((item) => item.domain !== domain);
		setTabs(newTabs);
		chrome.storage.local.set({ myData: newTabs });
	};

	const handleSectionClick = () => {
		// Open all tabs with damin
		const newTabs = tabs.filter((item) => item.domain === domain);
		//  For each tab in tabs open it
		newTabs.forEach((tab) => {
			chrome.tabs.create({ url: tab.url, active: false });
		});
		handleRemoveSection(domain);
	};

	return (
		// QUESTION Can i make it collapse on click?
		// DONE add remove all tabs in section button
		// DONE remove .com from domain?
		// DONE do i add key here
		// DONE add remove section handler and logic
		// DONE add open whole section 
		<div className="tabs_section" key={domain}>
			<div className="tabs_section_header" onClick={handleSectionClick}>
				<img className="tabs_section_header_icon" src={icon} />
				<p className="tabs_section_header_text">{domain}</p>
				<VscChromeClose
					className="close"
					onClick={(e) => {
						e.stopPropagation();
						handleRemoveSection(domain);
					}}
				/>
			</div>
			{children}
		</div>
	);
};

export default TabsSection;
