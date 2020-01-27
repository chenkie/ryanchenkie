import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { rhythm } from '../utils/typography';
import './layout.css';

const NavLink = ({ title, to }) => (
  <p
    className="uppercase font-semibold ml-6"
    style={{ fontFamily: `Montserrat, sans-serif` }}
  >
    <Link
      style={{
        boxShadow: `none`,
        textDecoration: `none`,
        color: `inherit`,
      }}
      to={`/${to}`}
    >
      {title}
    </Link>
  </p>
);

const ArticleCard = ({ title, description, slug, image }) => (
  <Link to={slug}>
    <div className="shadow-md rounded-lg">
      <Img
        className="rounded-lg rounded-b-none"
        style={{ maxHeight: '150px' }}
        sizes={image.childImageSharp.sizes}
      />
      <div className="p-3 mb-4 bg-white rounded-lg">
        <header>
          <p
            className="mb-1 leading-snug"
            style={{ fontFamily: "'Merriweather Sans',sans-serif" }}
          >
            {title}
          </p>
        </header>
        <p class="mb-0 leading-snug">
          <small className="text-gray-700 font-light text-xs">
            {description}
          </small>
        </p>
      </div>
    </div>
  </Link>
);

const Sidebar = ({ data, location }) => (
  <section className="w-1/3 px-3">
    <h4 className="mt-0 uppercase">Latest Articles</h4>
    {data.allMarkdownRemark.edges
      .filter(e => e.node.fields.slug !== location.pathname)
      .map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        const { description, featuredImage } = node.frontmatter;
        return (
          <ArticleCard
            title={title}
            description={description}
            slug={node.fields.slug}
            image={featuredImage}
            key={node.fields.slug}
          />
        );
      })}
  </section>
);

export default ({ location, title, children }) => {
  let header = (
    <h3
      style={{
        fontFamily: `Montserrat, sans-serif`,
        marginTop: 0,
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </h3>
  );

  const data = useStaticQuery(
    graphql`
      query {
        logo: file(absolutePath: { regex: "/logo.png/" }) {
          childImageSharp {
            fixed(width: 75, height: 75) {
              ...GatsbyImageSharpFixed
            }
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
                featuredImage {
                  childImageSharp {
                    sizes(maxWidth: 400) {
                      ...GatsbyImageSharpSizes
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  return (
    <>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(36),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header className="border-solid border-b border-t-0 border-r-0 border-l-0 border-gray-300 mb-5">
          <div className="flex justify-between mb-2">
            <div className="flex">
              <Img fixed={data.logo.childImageSharp.fixed} />
              <div className="uppercase ml-3">{header}</div>
            </div>
            <div className="flex">
              <NavLink title={'About'} to={'about'} />
              <NavLink title={'Podcast'} to={'podcast'} />
              <NavLink title={'Contact'} to={'contact'} />
            </div>
          </div>
        </header>
        <div className="flex">
          <main className={location.pathname === '/' ? 'w-full' : 'w-2/3 px-3'}>
            {children}
          </main>
          {location.pathname !== '/' && (
            <Sidebar data={data} location={location} />
          )}
        </div>
        <footer>© {new Date().getFullYear()}, Ryan Chenkie</footer>
      </div>
    </>
  );
};
