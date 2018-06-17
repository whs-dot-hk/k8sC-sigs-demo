import React from "react";
import Sidebar from "../components/sidebar"

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div>
      <Sidebar siteMetadata={data.site.siteMetadata} />
      <div
        className="fl w-75-l"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  );
};

export const query = graphql`
  query SIGPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
    ...SidebarFragment
  }
`;