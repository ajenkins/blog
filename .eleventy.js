const CleanCSS = require('clean-css');
const Image = require('@11ty/eleventy-img');
const embedYouTube = require('eleventy-plugin-youtube-embed');

module.exports = function (eleventyConfig) {
  // The file types that eleventy will look at and copy into _output/
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
    'woff2'
  ]);

  // Copy all files in static/ into _output/, regardless of file extension
  eleventyConfig.addPassthroughCopy('_pages/static');

  // Used for merging tags from the base layout with the tags from each individual post
  eleventyConfig.setDataDeepMerge(true);

  // Used for minifying and inlining CSS
  eleventyConfig.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Resizes and compresses images
  eleventyConfig.addNunjucksAsyncShortcode('image', async function (
    src,
    alt,
    outputFormat = 'jpeg'
  ) {
    if (alt === undefined) {
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    let stats = await Image(src, {
      widths: [640],
      formats: [outputFormat],
      urlPath: '/static/',
      outputDir: './_output/static/'
    });

    let props = stats[outputFormat].pop();

    return `<img src="${props.url}" width="${props.width}" height="${props.height}" alt="${alt}">`;
  });

  // Lazy-load YouTube videos
  eleventyConfig.addPlugin(embedYouTube, {
    lite: {
      css: {
        path: '/static/lite-yt-embed.css'
      },
      js: {
        path: '/static/lite-yt-embed.js'
      }
    }
  });

  return {
    // Enables the use of shortcodes within Markdown
    markdownTemplateEngine: 'njk',
    dir: {
      input: '_pages',
      includes: '../_includes',
      output: '_output'
    }
  };
};
