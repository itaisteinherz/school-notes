import React from "react";
import PropTypes from "prop-types";
import {graphql, Link} from "gatsby";
import * as _ from "lodash";
import {
	Accordion,
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody
} from "react-accessible-accordion";

import Layout from "../components/layout";
import "./index.css";

const IndexPage = props => {
	const notes = props.data.allMarkdownRemark;
	const subjects = _.chain(notes.edges)
		.groupBy(node => node.node.fields.slug.split("/")[1])
		.map(node => node) // Using ES6 shorthand to generate the objects
		.value();
	console.log(subjects);

	return (
		<Layout>
			<h2 style={{textAlign: "center"}}>Subjects</h2>
			<Accordion>
				{subjects.map(arr => (
					<AccordionItem key={arr[0].node.fields.slug.split("/")[1]}>
						<AccordionItemTitle>{arr[0].node.fields.slug.split("/")[1]}</AccordionItemTitle>
						{arr.map(({node}) => (
							<AccordionItemBody key={node.frontmatter.title}>
								<Link to={node.fields.slug} className="link">
									<div className="post-list">
										{node.frontmatter.title}
									</div>
								</Link>
							</AccordionItemBody>
						))}
					</AccordionItem>
				))}
			</Accordion>
		</Layout>
	);
};

IndexPage.propTypes = {
	data: PropTypes.object.isRequired
};

export default IndexPage;

export const query = graphql`
	query ListQuery {
		allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
			edges {
				node {
					fields {
						slug
					}
					frontmatter {
						title
					}
				}
			}
		}
	}
`;
