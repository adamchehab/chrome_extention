import { useState } from "react";
import "./SessionSection.css";
import { IoChevronDown } from "react-icons/io5";
import { MdEdit, MdHighlightOff } from "react-icons/md";

// TODO add edit name
// TODO add close
// TODO add fold animation
// TODO add naming by date and time?

const SessionSection = ({ children, session_name }) => {
	const [isVisible, setIsVisible] = useState(true);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const date = new Date(session_name);
	// format date

	const dateString = new Intl.DateTimeFormat("ru-RU", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	}).format(date);

	// TODO add remove
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
						<MdHighlightOff className="session_section_header_close" />
					</div>
				</div>
				{isVisible && <div>{children}</div>}
			</div>
		</>
	);
};

export default SessionSection;
