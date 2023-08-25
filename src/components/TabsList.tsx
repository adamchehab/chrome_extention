const TabsList = ({ data }) => {
	return (
		<div>
			{data.map((item, index) => (
				<div
					className="flex border-2 border-[#212020] rounded-lg bg-[#303030] p-2 pl-2 m-1 shadow-md max-w-[265px] max-h-[51px] overflow-hidden items-center"
					key={index}
				>
					<img className="w-8 h-8 mr-2" src={item.favIconUrl} />
					<a href={item.url}>{item.title.length > 21 ? `${item.title.slice(0, 21)}...` : item.title}</a>
				</div>
			))}
		</div>
	);
};

export default TabsList;
