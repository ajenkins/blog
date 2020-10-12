---
layout: layouts/post.njk
title: Three simple tricks for a lightning-fast Eleventy website
description: >-
    A guide on how to optimize your Eleventy website page load times.
tags: ['guide', 'web development', 'eleventy', '11ty', 'software engineering']
date: 2020-10-12 09:44:00 -04:00
---

Originally I wrote this guide as a story, but I thought some people would prefer a condensed
version that just teaches you the three tricks I used for making my website faster. If you'd
rather read the original version of this post,
[you can read it here](/post/pagespeed-with-eleventy).

Using the three tricks I'll show you in this guide, I was able to improve my
[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
score for this blog from 86 to 100 (on mobile), which is a perfect score.

Each of these tricks is actually just an Eleventy plugin, so I can't take much credit for these tricks.
But did run into some difficulties while setting them up, so hopefully my step-by-step guide will
help anyone else trying to use these plugins.

I'll review the three plugins I used in order of how much they improved my site's performance,
from most to least.

## Async loading of YouTube videos (eleventy-plugin-youtube-embed)

In my [PageSpeed Insights report](/static/PageSpeedInsights_before.pdf),
5 out of the 9 suggestions were a direct byproduct of embedding a YouTube
video on my page. I was using the standard embed code that YouTube generates
when you click the Embed button from a YouTube video, which loads the video player
in an iframe. I was using the privacy-improved version which doesn't use cookies,
but I don't think that has any impact on performance.

If you look at the specific suggestions made in the report, you'll see that I just
needed to defer the loading of all of the YouTube assets, so they don't block the rest
of the page from loading. Luckily, there's a community-built plugin that can do this
automatically.

That plugin is called
[eleventy-plugin-youtube-embed](https://www.npmjs.com/package/eleventy-plugin-youtube-embed)
and is included in [the official list of Eleventy plugins](https://www.11ty.dev/docs/plugins/).
The default functionality simply allows you to put a link to a YouTube video in a Markdown file,
and the plugin will automatically replace the URL with the embed code for the video.
This on its own is pretty cool, but won't improve the performance of your site, because
it's still using the same embed code as before.

But this plugin also supports embedding a "lite" version of the YouTube player, which is
just a static image that looks like a YouTube player, and only loads the real player
when the image is clicked on. Enabling lite-mode fully resolved all of the performance
issues I was seeing in my PageSpeed Insights report.

The documentation for the plugin is really good, and I didn't have any issues getting it
to work, but if you really want to see the code I used, here it is
([full code on Github](https://github.com/ajenkins/blog/blob/master/.eleventy.js)):

```js
const embedYouTube = require('eleventy-plugin-youtube-embed');

module.exports = function (eleventyConfig) {

    // Lots of other configuration stuff here...

    eleventyConfig.addPlugin(embedYouTube, {
        lite: true
    });

    return {
        // No need to make any changes here
    };
};
```

(I actually decided to host the lite JS and CSS files myself, so this isn't exactly what my config
looks like. For more info, see my Bonus Trick at the end of this post.)

## Resizing images (@11ty/eleventy-img)

Resizing (i.e., shrinking) images can greatly improve the performance of your website.
It's common for people to upload high resolution images to their website, but then use
CSS or the image width setting to display the image at a much lower resolution. This is
wasteful because your browser still downloads the image at full resolution, but then downsamples
the image before you ever see it. You can also reduce the file size of your images by using
better compression formats, like JPEG or [WebP](https://developers.google.com/speed/webp/).
If you haven't heard of WebP, it's a next-gen
image format designed by Google for displaying images on the web. Without any loss in
perceptible image quality, it offers at least as good compression as JPEG while still supporting
transparency like PNG.

You can set up your Eleventy site to automatically resize your images as well as convert them
into an image format like WebP using the official plugin for images,
[@11ty/eleventy-img](https://github.com/11ty/eleventy-img).
Even though it's an official plugin, I had the most trouble getting this one set up.
Hopefully my learnings will save you some time if you set this up in your own project.
I'll also show you how you can use this plugin for images in your Markdown files too.

By the way, you can use this plugin to generate simple &lt;img&gt; tags, or you
can generate the more advanced &lt;picture&gt; tags which support fallback or responsive
images that display the correct image for your browser and viewport. For my purposes though,
I only needed to use &lt;img&gt; tags, so I don't cover the use of &lt;picture&gt; tags here.

### Generating &lt;img&gt; tags in Nunjucks templates

There's an example of how to do this in the README for the plugin, so I won't
rehash that here. However, I did have a lot of trouble getting this to work, so
I'll share some advice that may help you if it's not working for you.
If you're getting an error in the build console `Input file is missing`,
this might help.

1. Set `urlPath` to be the directory where your source images are,
   relative to your `input` directory that you configured in the return object
   in the Eleventy config file (the default input directory is `.`).
1. Set `outputDir` to where you want the converted images to be put,
   relative to the root of your project (probably where your package.json and .gitignore files are).
   It should go into your output directory with your other compiled files
   (the default output directory is `_site`).
1. When you're using your newly created shortcode, the path to the file you should use
   is the full path from your project root to wherever the _source_ image is (including its file extension).
   So it will look something like `./{inputDir}` `/{pathToImages}/` `{ImageWithExtension}`.

The reason I got tripped up is because the plugin doesn't actually convert your images
until you've correctly configured everything in both your `.eleventy.js` file _and_ your
Nunjucks template where you're using the image. That's because it doesn't convert all of
the images in the directory you give it. It only converts the images that are specifically
referenced from one of your Nunjucks templates using the Nunjucks shortcode, `myImage`
(or whatever you call it).

You can see all of the changes I made to get this to work in
[this commit](https://github.com/ajenkins/blog/commit/9e83cc75).

### Using the plugin in a Markdown file

This is not currently covered in the README, so I had to figure this out on my own.
Luckily, it's pretty easy to do. All you need to do is update your Eleventy config
to use Nunjucks for parsing your Markdown templates.
[Here's the official doc](https://www.11ty.dev/docs/config/#default-template-engine-for-markdown-files)
on how to configure that. If it's not clear from the docs, you need to add a new property
to the return object in your Eleventy config function. Like this:

```js
module.exports = function (eleventyConfig) {

    // Lots of other configuration stuff here...

    return {
        // Enables the use of Nunjucks shortcodes within Markdown
        markdownTemplateEngine: 'njk',
        dir: {
            // You don't need to change this part
        }
    };
};
```

Then in your Markdown files you can use the `myImage` shortcode, exactly the same
way it's used in the examples in the plugin README. Like so:

```markdown
This will be interpreted as normal Markdown.

<!-- Ignore the backslashes -->
\{\% myImage "./src/images/cat.jpg", "photo of my cat" \%\}

This will _also_ be interpreted as normal Markdown.
```

### Converting your images to WebP

I actually decided against this because Mac OS Safari doesn't support WebP images yet
(they're adding support in Mac OS Big Sur which should be released soon). If you want
to be fancy, you can use a &lt;picture&gt; tag to load either a WebP or other image
format, depending on what the browser supports. I decided to keep things simple though
and just use JPEG images for most things, and use PNGs for images that needed transparency.

But if you'd rather use WebP images, here's how you set that in the config:

```js
eleventyConfig.addNunjucksAsyncShortcode('image', async function (
    src,
    alt,
    outputFormat = 'webp' // This is the only line you have to change
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

    return `<img src="${props.url}" width="${props.width}" alt="${alt}">`;
});
```

### Making your images scale proportionally on mobile

Using the &lt;picture&gt; tag, you can actually load a lower resolution image
on mobile devices to save even more bandwidth. I decided not to bother with that though,
and just use a normal &lt;img&gt; tag and scale the image based on the width of the viewport.

The first time I tried this using the example code from the README, my images looked
stretched when viewed on a mobile device. To fix it, all I had to do was remove
the `height` property from the &lt;img&gt; markup I was returning from the plugin function.

```js
// Change this...
return `<img src="${props.url}" width="${props.width}" alt="${alt}">`;

// To this.
return `<img src="${props.url}" width="${props.width}" height="${props.height}" alt="${alt}">`;
```

## Inlining CSS (clean-css)

My CSS file was already pretty small to begin with (1 kb), so originally I wasn't worried about it.
But according to my PageSpeed report, the extra network request required to download my CSS file
was adding about 180 ms to the overall page load time. Which isn't much on its own, but these
things do add up, so I decided to look into it.

The solution the report suggests is inlining "critical" JS and CSS.
When it comes to CSS, "critical" means that the CSS is necessary for
styling the content that's "above the fold." And "above the fold"
means the content that you see on a website right when the page loads,
before you scroll down
([you can read a deeper dive on critical CSS here](https://www.smashingmagazine.com/2015/08/understanding-critical-css/)).
Based on that definition, all of my CSS is critical
because most of my styles are for things at the top of the page, like the nav
and page header. But that's ok, because the rule with inlining CSS is that you can only inline a small
amount of CSS (whatever that means), and I figured my 100-line was probably small enough to qualify.

Luckily for me, I remembered that
[the official Eleventy docs have a quick tip on how to inline your CSS](https://www.11ty.dev/docs/quicktips/inline-css/).

I followed the docs to the letter, so I'm not going to rehash the steps here.
The only thing that tripped me up was that I had to move my CSS file.
Originally I kept my CSS file in `_pages/static/`, but I had to move it to the
`_includes/` directory with my template files. I don't understand why, but it _is_
implied by the docs so I was able to figure it out without too much trouble.
You can see exactly how I implemented this change by viewing
[this commit on my GitHub repo](https://github.com/ajenkins/blog/commit/184a9047).

## Summary

After making these three changes, I was able to boost my PageSpeed Insights score from 86 to 100
and shave 0.9 sec off my page load time, which is a 50% increase in speed!

[Here's a PDF of my results](/static/PageSpeedInsights_after.pdf) after making these changes.

After Apple releases Mac OS Big Sur, I'll update my website to use WebP images which should make things
even faster.

## Bonus trick: addPassthroughCopy

This doesn't have anything to do with performance, but it's a really useful Eleventy feature
that I discovered while configuring the YouTube embed stuff, and I wish I had known about it earlier.

Here's what happened. When I was configuring the "lite" mode for YouTube embeds, I decided I wanted
to be "cool" and use my own self-hosted copies of the needed JS and CSS files rather than depending on
an externally controlled CDN.

I downloaded the two files I needed, dropped them both in my trusty `static/` directory and configured
the plugin to look for them there instead of the external CDN. But it didn't work. When I checked the
Network tab in the Developer Console, I noticed that the CSS file was loading fine, but the JS file wasn't
found. Which seemed weird, because I put them both in the same folder. Why would Eleventy find one file, but
not the other?

This took me a while to figure out, but I eventually realized that I didn't actually understand how Eleventy
works. For the most part, Eleventy seems to just take all of the files I feed it in the input
directory, process them, and then spit them back out in the output directory. But it
**only does this for files that match the template formats you've specified in your Eleventy config.**
And `.js` was not one of the file formats I had listed in the `eleventyConfig.setTemplateFormats()`
array. This also explained why a lot of other static files I had weren't getting copied over,
like my `robots.txt` file.

But thankfully, Eleventy provides a built-in solution to this problem. While you _could_
just add every single file extension to the list of template formats, that's not the best way to do it.
What you're supposed to do, is for any folder where you just want Eleventy to blindly copy over all of the
contained files regardless of file type, use the `addPassthroughCopy` function.

[You can see how I use it in my .eleventy.js file here](https://github.com/ajenkins/blog/blob/master/.eleventy.js).

Ta da! Adding that one line fixed my YouTube problem _and_ resolved other issues too, like
some of my favicon files not being copied over correctly 🎉