import React from "react";
import {Link} from "gatsby";
import Layout from "../components/layout";

const NotFoundPage = () => (
	<Layout>
		<h2>Page not found <span role="img" aria-label="warning">⚠️</span></h2>
		<p>You just hit a route that doesn't exist. To return to the homepage, click&nbsp;
			<Link to="/">
				here
			</Link>	
		.</p>
	</Layout>
);

export default NotFoundPage;
