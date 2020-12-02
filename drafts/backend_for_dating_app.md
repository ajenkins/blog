---
layout: layouts/post.njk
title: Choosing a backend framework for my dating app
subtitle: AppSync vs. Hasura vs. Prisma vs. Dgraph vs. PostgREST vs. PostGraphile vs. FastAPI
tags: ['dating app', 'web development', 'software engineering', 'hasura', 'aws']
date: 2020-12-01 19:00:00 -05:00
---

## Intro

Like other software engineers, I spend a **lot** of time researching the perfect tool
for building my personal projects. As a web developer in 2020, you have a lot of tools
to choose from (just look at my comically long subtitle), so it's easy to spend way too
much time researching your options.

Before I go any further, I want to make it clear that this is not a true review of
any of these tools. The only tool I have hands-on experience with is AppSync/Amplify,
so everything I'm going to say about the tools below is solely based on things I read
in the documentation and reviews.

Ideally I would have built a prototype with each of these tools to inform my opinion,
but if I did that I would never get around to building my dating app. I still think
this post could be useful though, because if you're building a backend for your app
you'll probably be considering a lot of these tools. I hope I can save you some time
by capturing what I've learned about these tools through my research.

I'll go through all of the tools I considered one at a time, but if you just
want to hear the punchline and know what tools I decided to go with, here's
the tech stack I'm planning on using:

#### Backend
- Database: AWS Aurora, PostGreSQL flavor
- API: Hasura
- Auth: AWS Cognito

#### Frontend
- GraphQL Client: Apollo Client
- UI framework: React Native

Since this post is about the backend, I'm not going to talk about Apollo Client or React Native.

## AWS AppSync and Amplify

This is what I used for my last personal project, and I regretted it.
You can read [my full review of AppSync and Amplify here](/post/review_of_appsync_and_amplify).


