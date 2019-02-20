import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import "github-markdown-css";
import "./notes.css";

const notes = props => {
	const notesMarkdown = props.data.markdownRemark;

	return (
		<Layout>
			<div dir="auto" className="markdown-body" dangerouslySetInnerHTML={{__html: notesMarkdown.html}}/> {/* eslint-disable-line react/no-danger */}
		</Layout>
	);
};

notes.propTypes = {
	data: PropTypes.object.isRequired
};

export default notes;

export const query = graphql`
	query NotesQuery($slug: String!) {
		markdownRemark(fields: { slug: {eq: $slug } }) {
			html
			frontmatter {
				title
			}
		}
	}
`;
