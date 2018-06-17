fs   = require('fs');
yaml = require('js-yaml');

const sigsYaml = yaml.safeLoad(fs.readFileSync('../sigs.yaml', 'utf8'));

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
const sigsDir = sigsYaml.sigs.map(obj =>{ 
  return obj.dir;
});

// reformattedArray will be an array of plugins
const reformattedArray = sigsDir.map(obj =>{ 
  var rObj = {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: obj,
      path: `../` + obj,
    },
  };
  return rObj;
});

module.exports = {
  pathPrefix: "/k8sC-sigs-demo",
  siteMetadata: {
    title: 'Kubernetes Community SIGs Page Demo',
    sigs: sigsDir,
  },
  plugins: [
    // https://www.gatsbyjs.org/tutorial/part-six/
    ... reformattedArray,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sigs`,
        path: `../sigs/`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
  ],
}