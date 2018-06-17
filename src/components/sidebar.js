import React from "react";
import Link from "gatsby-link";

export default ({ siteMetadata: { sigs } }) => {
  // https://reactjs.org/docs/lists-and-keys.html
  const listItems = sigs.map((sig) => {
    const uri = '/' + sig + '/';

    return (
      <li key={sig}>
        <Link to={uri}>{sig}</Link>
      </li>
    );
  });
  
  return (
    <div className="fl w-25-l">
      <h1>SIGs</h1>
      <ul className="list ml0">{listItems}</ul>
    </div>
  );
}

export const query = graphql`
  fragment SidebarFragment on RootQueryType {
    site {
      siteMetadata {
        sigs
      }
    }
  }
`;
