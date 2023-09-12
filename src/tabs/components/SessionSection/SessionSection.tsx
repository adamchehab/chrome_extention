import { useState } from "react";
import "./SessionSection.css";
import { IoChevronDown } from "react-icons/io5";
import { MdEdit, MdHighlightOff } from "react-icons/md";

// TODO add edit name
// DONE add close
// TODO add fold animation
// DONE add naming by date and time?

const SessionSection = ({ children, date, session, tabs, setTabs }) => {
	const [isVisible, setIsVisible] = useState(true);
	const [sessionName, setSessionName] = useState("");


	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const datetest = new Date(date);
	// format date

	const dateString = new Intl.DateTimeFormat("ru-RU", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}).format(datetest);

	const handleEditSectionName = (session) => {};

	const handleRemoveSection = (session) => {
		console.log("click remove section");

		const newTabs = tabs.filter((item) => item.sessionId !== session);
		console.log(session);

		setTabs(newTabs);
		chrome.storage.local.set({ myData: newTabs });
	};
	// TODO add open all session items

	return (
		<>
			<div className="session_section">
				<div className="session_section_header">
					<p onClick={toggleVisibility}>
						<IoChevronDown
							className={`session_section_header_fold ${
								isVisible ? "rotated" : ""
							}`}
						/>
					</p>
					<p className="session_section_header_text">{dateString}</p>
					<div className="flex">
						<MdEdit className="session_section_header_edit" />
						<MdHighlightOff
							className="session_section_header_close"
							onClick={() => handleRemoveSection(session)}
						/>
					</div>
				</div>
				{isVisible && <div>{children}</div>}
			</div>
		</>
	);
};

export default SessionSection;
