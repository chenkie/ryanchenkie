import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const PodcastDetails = () => (
  <section>
    <p>The Entrepreneurial Coder Podcast</p>
  </section>
);

class Podcast extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Layout location={this.props.location} title={'Ryan Chenkie'}>
        <SEO title="Podcast" />
        <PodcastDetails />
      </Layout>
    );
  }
}

export default Podcast;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
