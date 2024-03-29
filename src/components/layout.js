import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import {StaticQuery, graphql} from "gatsby";

import Header from "./header";
import "modern-normalize"; // eslint-disable-line import/no-unassigned-import
import "./layout.css";

const Layout = ({children}) => (
	<StaticQuery
		query={graphql`
			query SiteTitleQuery {
				site {
					siteMetadata {
						title
					}
				}
			}
		`}
		render={data => (
			<>
				<Helmet
					title={data.site.siteMetadata.title}
					meta={[
						{name: "viewport", content: "width=device-width, initial-scale=1"},
						{name: "description", content: "School notes website"},
						{name: "keywords", content: "notes, school, student, education, online"}
					]}
				>
					<html lang="en"/>
				</Helmet>
				<Header siteTitle={data.site.siteMetadata.title}/>
				<div
					style={{
						margin: "0 auto",
						maxWidth: 980,
						padding: "0px 1.0875rem 1.45rem",
						paddingTop: 0
					}}
				>
					{children}
				</div>
			</>
		)}
	/>
);

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
