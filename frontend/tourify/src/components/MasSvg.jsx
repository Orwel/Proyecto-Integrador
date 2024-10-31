import React from "react";

const MasSvg = ({ color = "black" }) => (
	<svg
		width="23"
		height="23"
		viewBox="0 0 23 23"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M2.35742 2.64331H10.8574V11.1433H2.35742V2.64331ZM3.85742 4.14331V9.64331H9.35742V4.14331H3.85742Z"
			fill={color}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.6016 1.68811L22.8119 3.88807L20.612 12.0984L12.4016 9.89848L14.6016 1.68811ZM15.6622 3.52523L14.2387 8.83782L19.5513 10.2613L20.9748 4.94873L15.6622 3.52523Z"
			fill={color}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M2.35742 13.6433H10.8574V22.1433H2.35742V13.6433ZM3.85742 15.1433V20.6433H9.35742V15.1433H3.85742Z"
			fill={color}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M13.3574 13.6433H21.8574V22.1433H13.3574V13.6433ZM14.8574 15.1433V20.6433H20.3574V15.1433H14.8574Z"
			fill={color}
		/>
	</svg>
);

export default MasSvg;
