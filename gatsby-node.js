const path = require("path");
const {createFilePath} = require("gatsby-source-filesystem");

exports.createPages = ({actions, graphql}) => {
	const {createPage} = actions;

	return new Promise((resolve, reject) => {
		resolve(graphql(`
		{
			allMarkdownRemark(
				sort: {
					order: DESC,
					fields: [frontmatter___date]
				}
				limit: 1000
			) {
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
		`).then(result => { // eslint-disable-line promise/prefer-await-to-then
			if (result.errors) {
				console.error(result.errors);
				return reject(result.errors);
			}

			const notesTemplate = path.resolve("./src/templates/notes.js");
			result.data.allMarkdownRemark.edges.forEach(({node}) => {
				createPage({
					path: node.fields.slug,
					component: notesTemplate,
					context: {
						slug: node.fields.slug
					}
				});
			});
		})
		);
	});
};

exports.onCreateNode = ({node, getNode, actions}) => {
	const {createNodeField} = actions;
	// Creating a new field for the slug
	if (node.internal.type === "MarkdownRemark") {
		const slug = createFilePath({node, getNode, basePath: "pages"});
		createNodeField({
			node,
			name: "slug",
			value: slug
		});
	}
};
