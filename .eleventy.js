const CleanCSS = require('clean-css');
const Image = require('@11ty/eleventy-img');
const embedYouTube = require('eleventy-plugin-youtube-embed');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const footnotes = require('eleventy-plugin-footnotes');

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
    'woff2',
    'txt'
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
  eleventyConfig.addNunjucksAsyncShortcode(
    'image',
    async function imageShortcode(src, alt, sizes) {
      let metadata = await Image(src, {
        widths: [640],
        formats: ['webp'],
        urlPath: '/static/',
        outputDir: './_output/static/'
      });

      let imageAttributes = {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async'
      };

      return Image.generateHTML(metadata, imageAttributes);
    }
  );

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

  // Syntax highlighting for code-blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // Convert string to date
  eleventyConfig.addFilter('date', function (dateStr) {
    return new Date(dateStr);
  });

  // Pretty-print date
  eleventyConfig.addFilter('formatDate', function (date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Pretty-print date and time
  eleventyConfig.addFilter('formatDateTime', function (date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    });
  });

  // RSS (Atom) Feed
  eleventyConfig.addPlugin(pluginRss);

  // Footnotes
  eleventyConfig.addPlugin(footnotes);

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
