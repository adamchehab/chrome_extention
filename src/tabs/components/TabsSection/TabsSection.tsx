import "./TabsSection.css";

const TabsSection = ({ domain, icon, children }) => {
  return (
    // QUESTION Can i make it collapse on click?
		// TODO add remove all tabs in section button
		// TODO remove .com from domain?
    // TODO do i add key here
		<div className="tabs_section">
			<div className="tabs_section_header">
				<img
					className="icon"
					src={icon}
				/>
				<p className="tabs_section_header_text">{domain}</p>
			</div>
			{children}
		</div>
	);
};

export default TabsSection;
