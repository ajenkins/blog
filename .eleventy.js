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

  return {
    dir: {
      input: '_pages',
      includes: '../_includes',
      output: '_output',
    },
  };
};
