const TabsList = ({ data }) => {
	return (
		<div>
			{data.map((item, index) => (
				<div
					className="flex border-2 border-[#212020] rounded-lg bg-[#303030] p-1 pl-3 m-1 shadow-md"
					key={index}
				>
					<img className="w-8 h-8" src={item.favIconUrl} />
					<a href={item.url}>{item.title}</a>
				</div>
			))}
		</div>
	);
};

export default TabsList;
