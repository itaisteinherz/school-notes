import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";
import Layout from "../components/layout";

const notes = props => {
	const notesMarkdown = props.data.markdownRemark;
	console.log(notesMarkdown);

	return (
		<Layout>
			<div dangerouslySetInnerHTML={{__html: notesMarkdown.html}}/> {/* eslint-disable-line react/no-danger */}
		</Layout>
	);
};

notes.propTypes = {
	data: PropTypes.objectOf( // `data`
		PropTypes.objectOf(PropTypes.string) // `markdownRemark`
	).isRequired
};

export default notes;

export const query = graphql`
	query NotesQuery($slug: String!) {
		markdownRemark(fields: { slug: {eq: $slug } }) {
			html
			frontmatter {
				title
				description
			}
		}
	}
`;
