import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

const AboutDetails = () => (
  <section>
    <p>Ryan is a web developer</p>
  </section>
);

class About extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <Layout location={this.props.location} title={'Ryan Chenkie'}>
        <SEO title="About" />
        <AboutDetails />
      </Layout>
    );
  }
}

export default About;

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
