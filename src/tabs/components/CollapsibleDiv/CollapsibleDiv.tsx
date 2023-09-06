import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./CollapsibleDiv.css";

function CollapsibleDiv({ children }) {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div className="border border-green-700">
			<div>
				<p className="cursor-pointer" onClick={toggleVisibility}>
					CLICK ME
				</p>
			</div>
			<div className={`test123 ${!isVisible ? "collapsed" : ""}`}>
				{isVisible && <div>{children}</div>}
			</div>
		</div>
	);
}

export default CollapsibleDiv;
