/* eslint camelcase:  ["error", {properties: "never"}] */
module.exports = {
	siteMetadata: {
		title: "Itai's school notes"
	},
	plugins: [
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/pages/notes`,
				name: "pages",
				ignore: ["**/Example"]
			}
		},
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					"gatsby-remark-prismjs",
					"gatsby-remark-katex",
					{
						resolve: "gatsby-remark-images",
						options: {
							maxWidth: 650
						}
					}
				]
			}
		},
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp",
		{
			resolve: "gatsby-plugin-google-analytics",
			options: {
				trackingId: "UA-142187776-2",
				respectDNT: true
			}
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Itai's school notes",
				short_name: "School notes",
				start_url: "/",
				background_color: "#ffffff",
				theme_color: "#000000",
				display: "minimal-ui"
			}
		},
		"gatsby-plugin-react-helmet"
	]
};
