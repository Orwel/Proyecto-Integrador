import React from "react";

const CamaraSvg = ({ color = "black" }) => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 23 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M1.25 4.37476H17.2345V19.625H1.25V4.37476ZM2.75 5.87476V18.125H15.7345V5.87476H2.75Z"
			fill={color}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M22.75 4.58044L15.9644 9.18138L16.8062 10.4229L21.25 7.4098V16.5354L16.8388 13.3388L15.9586 14.5534L22.75 19.4747V4.58044Z"
			fill={color}
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.4082 8.33618H13.1129V9.83618H8.4082V8.33618Z"
			fill={color}
		/>
	</svg>
);

export default CamaraSvg;
