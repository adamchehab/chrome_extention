import "./TabsSection.css";

const TabsSection = ({ domain, icon, children }) => {
  return (
    // QUESTION Can i make it collapse on click?
		// TODO add remove all tabs in section button
		// TODO remove .com from domain?
		<div className="tabs_section">
			<div className="tabs_section_header">
				<img
					className="icon"
					src={icon}
				/>
				<p>{domain}</p>
			</div>
			{children}
		</div>
	);
};

export default TabsSection;
