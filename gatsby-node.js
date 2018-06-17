/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  const fileNode = getNode(node.parent);

  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    var relativeFilePath = createFilePath({
      node,
      getNode,
    });

    const sigDir = fileNode.sourceInstanceName;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
    // Remove trailing '/README/' from the path
    var re = /readme\/$/i;
    relativeFilePath = relativeFilePath.replace(re, '');

    relativeFilePath = relativeFilePath.toLowerCase();

    // Turn underscores into hyphens
    var re = /_/g;
    relativeFilePath = relativeFilePath.replace(re, '-');

    // Turn spaces into hyphens
    // Specially made for /sig-product-management/SIG PM representatives.md
    var re = / /g;
    relativeFilePath = relativeFilePath.replace(re, '-');
 
    // Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: "slug",
      value: '/' + sigDir + relativeFilePath,
    });
  }
};
 
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/sig-post.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
};
