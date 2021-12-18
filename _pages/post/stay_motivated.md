---
layout: layouts/post.njk
title: 'How to stay motivated when working on a big project'
tags: ['motivation', 'software engineering', 'dating app']
date: 2021-12-18 15:50:00 -05:00
---

Last winter I started working on a [dating app](/post/making_a_dating_app)
and continued working on it through the spring. But after getting my
Covid vaccine and when things started opening back up during the summer,
I took a break and stopped working on my app. A few weeks ago I picked
it back up, but it was really hard to get back into it.

I've been working on this project for almost a year now and I've picked
up some tricks on how to stay motivated on a long-term project and to
see it through to completion. I guess I haven't actually finished yet,
but I feel confident that I will. Anyway, here are some tricks that I
use to stay motivated and to stick with a big project.

# General tips

- Make a commitment that you're going to finish your project, no matter what.
- Tell as many people about it as you can so you feel guilty if they ask "how's that thing going?" and you haven't made any progress since the last time they asked about it.
- Stay {% footnoteref "caffeine", "If you read <a href=\"/post/sleep\">my post on sleeping</a>, you'll know that I actually try to avoid caffeine because it makes it hard for me to sleep at night. So I try to consume the smallest amount of caffeine that I can (I drink a mini can of Coke). Does it make it harder to fall asleep sometimes? Yeah, but I think it's worth it." %}caffeinated.{% endfootnoteref %}
- Make a playlist of songs that {% footnoteref "trigger", "<a href=\"https://youtu.be/GfnNRM_poYE\">Trigger by Major Lazer &amp; Khalid</a> really puts me in the right head-space to get work done. It's from the Death Stranding video game and reminds me that working on something alone is hard and scary, but it can be fun too and it's worth it if you believe in what you're doing." %}motivate you.{% endfootnoteref %}
- Play your music through (good) speakers, not headphones, if you don't have roommates. You want to keep working as long as possible, and headphones get uncomfortable if you wear them for too long.
- Make a to-do list. I use [Trello](https://trello.com). Check things off as you go.
- Focus on one thing at a time. Just focus on that one thing and don't worry about anything else.
- Work like a sculptor. Get the general shape of the whole thing done before you start refining the details.
- If working on something is sapping your motivation (like
  {% footnoteref "tests", "This was a mistake I made early on in my project. A lot of startups skip writing tests because they feel pressure to ship features as fast as possible to keep their handful of customers happy. But since my app wasn't live yet, there was no external pressure forcing me to ship faster. And I know that writing tests is a good investment because it makes future development faster, so I thought I was being clever by writing tests now. But writing tests turned out to be way harder than I anticipated (@testing-library/react-native has some rough edges). Instead of writing tests, I was spending all of my time fighting with my testing libraries and trying to figure out how to test async code. Instead of moving onto something else, I told myself that I wouldn't write any new features until I finished writing tests for all of the features I had so far. This was a mistake because feeling like I needed to write tests just made me not want to work on my project. Having a well-tested but unfinished project is worthless. Having a buggy, but completed project is much better." %}writing tests{% endfootnoteref %}),
  stop. Work on something else, even if it's less important.
- Work on the most fun stuff first. If you look at something on your to-do list and it makes you groan or gives you a sense of dread, skip it. Another day you'll feel up to it, but today is not that day.
- The #1 goal is to keep working at all costs. As long as you're constantly making progress, that's all that matters. Everything needs to get done eventually, but the order you do things in matters less than you think it does.
- Items on your to-do list must be as small as possible. Don't write full user stories. Each item on my to-do list can be completed in about 30 minutes. This will ensure that you always feel like you're making progress. I think of each item on my to-do list as one git commit.
- If starting/picking back up your project seems daunting, work on a "gateway" project for a bit to get yourself (back) in the right mindset. For me, working on my dating app seemed scary, so I wrote a few blog posts instead. Didn't gain me any progress on my dating app, but got me used to sitting at my computer outside of working and tapping on my keyboard.

# Software Engineering-specific tips

- Don't worry about writing perfect code. Just get something working ASAP. Make the code nice later.
- Don't refactor code prematurely, even if you'll need to do it eventually. Wait until it gets annoying.
- Don't worry about handling edge cases. Make to-do list items for those as you think of them.
- Make the UI pretty (i.e., styling, CSS) last. You can spend an eternity improving the look and feel of your app, so don't do anything more than the bare minimum until the functionality is 100% complete.
