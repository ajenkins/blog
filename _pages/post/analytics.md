---
layout: layouts/post.njk
title: Why I don't have analytics on my website
tags: ['opinion', 'technology', 'privacy', 'web design']
date: 2020-10-04 12:00:00 -04:00
---

Originally I was planning on writing a blog post about how I chose "X" service
for analytics on my website. I was going to go over the pros and cons of each service
I considered and then dramatically tell you the one, best web analytics service.

But after a lot of thought, I made the unconventional decision to not use any
analytics service _at all_ for my website. I haven't heard of anyone else who's
done this, so I decided to write why _I_ decided to do this.<a href="#footnote-1" class="footnote">[1]</a>

## Wait, what do you mean "analytics"?

_If the title of my post is self-explanatory to you, feel free to skip this section._

So, here's the deal: on basically every single website you visit
there's code embedded on the website used to track how you use the website.
This code can track how many users view each page, what other website they were
referred from, and what they click on in each page.

By far, the most popular user analytics tool is Google Analytics.
Not only is Google Analytics one of the most advanced user analytics tools available,
it's also very easy to set up and completely free
(at least the basic version).<a href="#footnote-2" class="footnote">[2]</a>
Google makes this free because when a website uses Google Analytics, they agree
to share all of their usage data and traffic patterns with Google, and the more Google
knows about how people use the internet,
the better they can serve targeted ads.<a href="#footnote-3" class="footnote">[3]</a>
One cool/creepy feature of Google Analytics is it gives you very detailed information
about the demographics of your users. It will show you the age, gender, and location
of everyone who visits your website. It can even show you what types of things they're
interested in, like sports, travel, food & drinks, etc. If you're a marketer, this
data is invaluable because you can ensure that your content and marketing is optimized
to appeal to the demographics of your users. It's also very useful for showing targeted
ads on your site if you use ads to generate revenue. And of course Google offers a companion service,
Google AdSense, which is used for serving ads from Google and integrates with Google Analytics.

One tool that Google uses to learn all of this detailed information about you
is [the cookie](https://en.wikipedia.org/wiki/HTTP_cookie). Cookies have been a feature
of web browsers since the 90s, and allow websites to store information specific to you in
your browser that can persist even after you leave the website or close your browser.
Cookies can be used for lots of different purposes, such as keeping you
signed into a website so you don't need to reenter your username and password every time you
visit the site.

Typically, the "benign" cookies (i.e., not a privacy concern) are ones that are implemented
by the website you're using, like the aforementioned cookie used for keeping you signed in.
These are "first-party" cookies since they come from the website itself. But
there are also "third-party" cookies, which are set and used by companies external to the
website you're on. One of the most common third-party cookies on the web is the Google
Analytics user token, which is automatically set by Google Analytics as soon as you visit
the website and is used to track your entire history of actions across all your sessions
on that site. Third-party cookies are "bad", because when you use a website your data
is not only shared with the website you're on, but also with third-parties that you may not
want your data shared with, like Google. Websites used to do this all the time
without telling you, but now with regulations like
[GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation),
websites are required to inform
you about how they share your data with third-parties and give you the option to opt-out.

The passage of GDPR is the reason that all websites you visit now have that annoying
banner at the bottom with some fine print about sharing data with third-parties
and a giant button that usually says ACCEPT ALL COOKIES, which most people click because
it's the easiest way to make it go away.<a href="#footnote-4" class="footnote">[4]</a>

Ok, that's pretty much everything you need to know about web analytics. Now I'll
explain why I decided not to add analytics to my website. Before that though,
I'll briefly go over why I would even want analytics on my personal blog to begin with.

## Why I _considered_ adding analytics to my blog

### It's just how you do things

As I mentioned above, pretty much all websites have some kind of user tracking built into
them. Adding analytics to your website is definitely the default decision. In fact, in
every website I've made previously, adding Google Analytics was one of the first things
I did. It's also incredibly easy to do – adding analytics (at least, Google Analytics)
takes only 5 minutes and is simple enough that anyone can do it.

So not only is omitting
analytics an unusual decision _in general_, but it's even an unusual decision _for me_.

### Tailoring my content based on what's popular

This was my original reason for wanting to use analytics on my website, and probably
the main reason why most blogs use analytics. It's not uncommon for a single blog
post to "go viral" and be the most-read post on the site by a significant margin.
And if one of your posts goes viral, you probably want to make your future blog posts
more similar to that post. Or maybe you'll write a follow-up post to try to entice
the people who read your first post back onto your blog.

A less extreme possibility is that certain types of posts attract more readers,
so it would make sense to mostly write those kinds of posts going forward. For example,
if my posts about software engineering are getting more views than my posts about
video games, maybe I'll want to focus my blog on software engineering instead of
just writing about whatever I feel like.

### Knowing if I'm famous yet

Another thing I worried about was how will I know if I'm "famous" if I don't know
people are reading my blog posts? A million people could be reading
this right now, but I'd have no idea.

## Why I decided against adding analytics to my blog

### I hate cookie banners with a passion

Just to make sure we're on the same page, I'm talking about
those banners at the bottom of basically all websites that mentions something about sharing
data with third-parties and has a big button with the text ACCEPT ALL COOKIES.

Yeah, I hate those things. Websites added them in response to the passage of GDPR, which
was a law designed to protect the privacy of EU citizens while browsing the web. But as
far as I'm concerned, all it did was add another annoying thing to
websites that you have to click on before you can use it.
I [read that some updated regulations](https://silktide.com/blog/sick-of-cookie-banners-and-popups-theyre-all-changing-again/)
will eventually make these banners
useful and more than just a nuisance, but it doesn't seem like that's happened yet.

As someone who hates these banners, I decided that there was no way I would put
one of these things onto my website. Theoretically, I bet I could get away
with using third-party tracking cookies _without_ displaying the legally required banner,
because I doubt EU regulators would bother coming after me. But I'd prefer to do things
the right way.

So, if I did want analytics on my website, I would need to find a privacy-focused analytics
service that would be GDPR compliant and exempt me from needing to display the dreaded cookie banner.

**Note**: Although I'm a big proponent of online privacy, I have to be honest – the main reason I was
looking at privacy-focused analytics solutions was so I wouldn't have to put that stupid banner
on my website. Protecting your privacy as a visitor to this website was just an added bonus.
Sorry 😞

#### Privacy-focused analytics services that I considered

_To some people, this will be the most interesting part of the blog post. To others, it will
be useless and boring. Feel free to skip this._

Here's [the best list of privacy-focused analytics services](https://www.fastcompany.com/90300072/its-time-to-ditch-google-analytics) that I found.
There aren't actually that many services like this, because most analytics services
actually differentiate themselves from Google Analytics by giving you _even more_ detailed information
about the users on your website. Of the privacy-focused solutions, many of them seemed very
"enterprisey" (like [Matomo](https://matomo.org/),
[Plausible](https://plausible.io/) and
[Fathom](https://usefathom.com/)), which I ruled out because they didn't seem
like a good fit for a personal blog.

Here's the list of the finalists I considered using:

1. [Simple Analytics](https://simpleanalytics.com/) -
   Doesn't use cookies, so it's automatically compliant with GDPR and doesn't
   require a cookie banner. From the screenshots and marketing materials, it looks like they have
   great UI/UX. It also sounded like a really novel approach to analytics, which appealed to me.
   The downside is that the starting price is $19/month.
1. [GoatCounter](https://www.goatcounter.com/) -
   Open-source, bare-bones analytics tool. GDPR compliant, so no cookie banner required.
   Made and run by one person, who [seems like a nice guy](https://github.com/arp242).
   Free, with the option to pay if you want to.
   [Created exactly for the use case of a personal website](https://www.goatcounter.com/why).
   The downside is that the UI/UX looks pretty bad (sorry, Martin).
1. [Netlify Analytics](https://www.netlify.com/products/analytics/) -
   This is only an option if you're hosting your site on Netlify, but I am.
   Great UI/UX. Supported by a relatively successful company, so it probably won't disappear
   any time soon. All analytics are server-side, which means no cookies or adding
   any tracking code to your website. Getting started is as simple as flipping a switch
   from the admin dashboard. The downside is it costs $9/month.

If I had to pick one of these, I would've gone with Netlify Analytics. The fact that it's completely
server-side appeals to me, because that's how I think analytics should work. Although GoatCounter is free,
the simplistic UI bothers me. And although Simple Analytics seems cool, I can't justify spending $19/month
on a website that doesn't make any money. But I _could_ almost justify spending $9/month on a website
that doesn't make any money, which is why Netlify Analytics is the winner for me. I probably _would have_
used Netlify Analytics, despite its cost, if it weren't for the _other_ reason I decided against using
analytics on my blog...

### I'm better off not knowing how many page views I'm getting

Going back to my earlier discussion about why I _might_ want analytics on my site,
the three reasons I gave were making money, tailoring my content effectively, and knowing if I
had become famous. But other than boosting my ego, the only value of knowing if I had become famous
would be profiting off of my blog somehow, which goes back to the money thing.

So really, having analytics could help me in three ways:

1. Making me money
1. Influencing what I write about
1. Boosting my ego

I'll go over the first two points in detail, but regarding the ego thing, I'll just say
that having my ego boosted would probably do me more harm than good 🙂

#### Making money

First of all, if you didn't know, making money from a blog is hard. If real news sites
can't figure out how to make their businesses profitable online, what chance do I have?
Sure, there are some notable authors who have built highly profitable blogs,
like [Ben Thompson](https://www.vox.com/2017/2/14/14612178/ben-thompson-stratechery-publishing-news)
([Stratechery](https://stratechery.com/)). But I think they're the exception. Also, the
people making money from a newsletter are typically writing about topics that will help their readers
make money directly or indirectly, which justifies the price for the newsletter.

But I don't want to be locked into writing about "business" things. Also, even if I
could turn my blog into my full-time job, I don't think I would enjoy that. Blogging
is fun as a hobby, but I bet it would be a lot less fun (and more stressful) if
it was my primary source of income.

Alternatively, I could just slap some ads on my blog for some passive income, but
with the traffic I assume I'm getting, I wouldn't make much money that way. I'd also
have to give up on protecting my reader's privacy so I could have targeted ads.
It just doesn't seem worth it for a few buck (or pennies) a month.

#### Writing things that people want to read

To some extent I want to write things that people will want to read.
When I'm thinking of what to write about, I definitely consider what topics people
will find interesting. My strategy is I try to write articles (and headlines)
that sound like something I would read if I saw it while browsing
[Hacker News](https://news.ycombinator.com/).

But I'm only _guessing_. With analytics, I could cut out the guesswork and
know exactly which articles and topics attract the most views.

My fear is that, with that level of insight, it would unconsciously affect my writing.
Over time, I would lose sight of my original reason for creating this blog (because I enjoy writing)
and begin writing just to maximize my page views, even if I'm not making money from the additional
page views.

For more on this, check out my post on
<a href="{{ '/post/likes' | url }}">"Doing It for the Likes"</a>.

## Final thoughts

Although I've personally decided not to use analytics on my website, don't take this as a rallying-cry against
analytics. Analytics are great, and are vital for most websites. Analytics enable companies and creators to make
data-driven decisions on the best way to improve their website, product, or service, which is how it should always be done.

But for my own blog, my goal is to write for my own enjoyment.
And that's something that no analytics tool can help me with.

#### _Closing-closing thought_

Actually, this post _is_ a rallying-cry against something. Cookie banners. Cookie banners suck 😅

---

<p id="footnote-1">
[1]: I'm sure there are plenty of other websites that don't use analytics.
     I just don't know of any, and I've definitely never read a justification
     from someone explaining why they didn't put analytics on their website.
</p>

<p id="footnote-2">
[2]: The standard version of Google Analytics is free, but Google also offers
     an enterprise-grade version of the tool called Google Analytics 360 which costs money.
     But my impression is that nearly all websites use the free version of Google Analytics
     and 360 is only used by large companies. According to a quick search online,
     Google Analytics 360 starts at $150,000/year.
</p>

<p id="footnote-3">
[3]: Google actually does let you
     <a href="https://support.google.com/analytics/answer/1011397?hl=en">customize
     what data you share with them</a>. However, I believe the defaults make it so
     most of your website data is shared with Google. Also, when you go into your settings
     to opt-out of sharing your data with Google, every single toggle has a paragraph listing
     all of the reasons you should agree to share your site's data with Google. Clearly,
     Google really wants your data.
</p>

<p id="footnote-4">
[4]: I don't actually know how often people click the Accept All Cookies button.
     It's always the biggest button, and I know that people tend to click big buttons
     on websites. What I <em>can</em> tell you is that <em>I</em> usually click that button
     when I'm on a website because I just want the banner to leave me alone, even
     if it means compromising my privacy.
</p>