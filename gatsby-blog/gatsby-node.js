const { createFilePath } = require('gatsby-source-filesystem');
const meta = require('./gatsby-meta-config');
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemark implements Node { frontmatter: Frontmatter! fields: Fields! }
    type Frontmatter { title: String! date: Date! @dateformat categories: [String!]! author: String emoji: String }
    type Fields { slug: String! }
  `);
};
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    actions.createNodeField({ node, name: 'slug', value: createFilePath({ node, getNode, basePath: 'content' }) });
  }
};
exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`{
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
      edges { node { id excerpt(pruneLength: 500) fields {slug} frontmatter {categories title date(formatString: "MMMM DD, YYYY")} }
        next {fields {slug}} previous {fields {slug}} }
    }
  }`);
  if (result.errors) { reporter.panicOnBuild('Could not load posts', result.errors); return; }
  const edges = result.data.allMarkdownRemark.edges;
  edges.forEach(({node,next,previous}) => actions.createPage({path:node.fields.slug,component:require.resolve('./src/templates/blog-template.js'),context:{slug:node.fields.slug,nextSlug:next?.fields.slug || '',prevSlug:previous?.fields.slug || ''}}));
  const categories = ['All', ...meta.categories];
  const component = require.resolve('./src/templates/category-template.js');
  actions.createPage({path:'/posts/',component,context:{currentCategory:'All',edges,categories}});
  categories.forEach(category => actions.createPage({path:`/posts/${category}/`,component,context:{currentCategory:category,edges,categories}}));
};
