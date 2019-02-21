import React from "react";
import PropTypes from "prop-types";
import {graphql, Link} from "gatsby";
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

	const subjects = new Map();

	for (const node of notes.edges) {
		const subjectName = node.node.fields.slug.split("/")[1];

		if (subjects.has(subjectName)) {
			const currentNodes = subjects.get(subjectName);
			subjects.set(subjectName, [...currentNodes, node]);
		} else {
			subjects.set(subjectName, [node]);
		}
	}

	return (
		<Layout>
			<h2 className="main_title">Subjects</h2>
			<div className="subjects">
				<Accordion>
					{Array.from(subjects.entries()).map(subjectArr => ( // eslint-disable-line unicorn/prefer-spread
						<AccordionItem key={subjectArr[0]}>
							<AccordionItemTitle>{subjectArr[0]}</AccordionItemTitle>
							{subjectArr[1].map(({node}) => (
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
