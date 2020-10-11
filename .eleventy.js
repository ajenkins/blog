const CleanCSS = require('clean-css');
const Image = require('@11ty/eleventy-img');

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    // Templates:
    'html',
    'njk',
    'md',
    // Static Assets:
    'css',
    'jpeg',
    'jpg',
    'png',
    'svg',
    'woff',
    'woff2',
  ]);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addNunjucksAsyncShortcode('myImage', async function (
    src,
    alt,
    outputFormat = 'jpeg'
  ) {
    if (alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }

    // returns Promise
    let stats = await Image(src, {
      widths: [640],
      formats: [outputFormat],
      urlPath: '/static/',
      outputDir: './_output/static/',
    });

    let props = stats[outputFormat].pop();

    return `<img src="${props.url}" width="${props.width}" height="${props.height}" alt="${alt}">`;
  });

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: '_pages',
      includes: '../_includes',
      output: '_output',
    },
  };
};
