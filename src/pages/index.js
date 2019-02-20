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

import "react-accessible-accordion/dist/fancy-example.css";
import "./index.css";

const IndexPage = props => {
	const notes = props.data.allMarkdownRemark;
	const subjects = _.chain(notes.edges)
		.groupBy(node => node.node.fields.slug.split("/")[1])
		.map(node => node) // Using ES6 shorthand to generate the objects
		.value();

	return (
		<Layout>
			<h2 className="main_title">Subjects</h2>
			<div className="subjects">
				<Accordion>
					{subjects.map(arr => (
						<AccordionItem key={arr[0].node.fields.slug.split("/")[1]}>
							<AccordionItemTitle>{arr[0].node.fields.slug.split("/")[1]}</AccordionItemTitle>
							{arr.map(({node}) => (
								<Link key={node.frontmatter.title} to={node.fields.slug} className="note-link">
									<AccordionItemBody>
										<span>
											{node.frontmatter.title}
										</span>
									</AccordionItemBody>
								</Link>
							))}
						</AccordionItem>
					))}
				</Accordion>
			</div>
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
