import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

function Place({place, placeLink}) {
  return placeLink ?
    <a href={placeLink}>{place}</a>
    : <div>{place}</div>
}


const IndexPage = ({ data }) => {
  console.log(data)
  let year;
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>

      <h2>Upcoming Speaking & Teaching Activities</h2>

      {data.upcoming.edges.map(({ node }) => {

        const place = node.childMarkdownRemark.frontmatter && node.childMarkdownRemark.frontmatter.place;
        const placeLink = node.childMarkdownRemark.frontmatter && node.childMarkdownRemark.frontmatter.placeLink;

        return (
          <div>
            <div>
              {node.childMarkdownRemark.frontmatter.date}
              {` at `}
              <Place place={place} placeLink={placeLink}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: node.childMarkdownRemark.html}}/>
          </div>
        )
      })}

      <h2>Recent Speaking & Teaching Activities</h2>

      {data.past.edges.map(({ node }) => {
        const eventYear = node.name.substr(0, 4)
        let yearHeading;
        if (year !== eventYear){
          year = eventYear;
          yearHeading = <h3>{eventYear}</h3>
        }
        const place = node.childMarkdownRemark.frontmatter && node.childMarkdownRemark.frontmatter.place;
        const placeLink = node.childMarkdownRemark.frontmatter && node.childMarkdownRemark.frontmatter.placeLink;

        return (
          <div>
            {
              yearHeading
            }
            {/*<div>{node.name.substr(0, 10)}</div>*/}
            <div>
              {node.childMarkdownRemark.frontmatter.date}
              {` at `}
              <Place place={place} placeLink={placeLink}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: node.childMarkdownRemark.html}}/>
          </div>
        )
      })}

    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    upcoming: allFile(
      filter: { absolutePath: { regex: "/events/upcoming/" } }
      sort: { fields: relativePath, order: ASC }
    ) {
      edges {
        node {
          relativePath
          name
          childMarkdownRemark {
            html
            frontmatter{
              date
              place 
              placeLink
            }
          }
        }
      }
    }
    past: allFile(
      filter: { absolutePath: { regex: "/events/past/" } }
      sort: { fields: relativePath, order: DESC }
    ) {
      edges {
        node {
          relativePath
          name
          childMarkdownRemark {
            html
            frontmatter{
              date
              place 
              placeLink
            }
          }
        }
      }
    }
  }
`
