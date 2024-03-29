import {Link} from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({siteTitle}) => (
	<div
		style={{
			margin: "0 auto",
			textAlign: "center",
			maxWidth: 960,
			padding: "1.45rem 1.0875rem"
		}}
	>
		<h1 style={{margin: 0, fontSize: "40px"}}>
			<Link
				to="/"
				style={{
					color: "black",
					textDecoration: "none"
				}}
			>
				{siteTitle}
			</Link>
		</h1>
	</div>
);

Header.propTypes = {
	siteTitle: PropTypes.string
};

Header.defaultProps = {
	siteTitle: ""
};

export default Header;
