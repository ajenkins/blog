---
layout: layouts/post.njk
title: Review of AWS AppSync and Amplify in 2019
tags: ['web development', 'software engineering', 'aws']
date: 2020-12-01 21:00:00 -05:00
---

**UPDATE**: I'm using Amplify just for authentication in my new app.
You can find my updated opinion of Amplify at the end of [this post](/post/dating_app_update_1).

In 2019 I started a personal project using AWS AppSync, AWS Amplify, and React Native.
AppSync and Amplify may have gotten better since I tried using them, but at that time
they were so painful to use that I abandoned the project. I thought about migrating to a different
backend framework, but that would've sucked, and it just didn't seem worth the effort.

Although some things were great about AppSync/Amplify, my overall experience was so negative
that I would strongly urge anyone considering it for a personal project to reconsider.

## AppSync vs. Amplify

AppSync and Amplify are closely related, but are actually distinct Amazon products.
AppSync is a tool for building a GraphQL API, while Amplify is a command-line tool and frontend
framework for building apps that talk to AppSync. AppSync creates the `/graphql` endpoint and
the GraphQL resolvers. Amplify has a command-line tool you use to generate your Amplify app
(supports mobile or web) and automates a lot of the stuff you would need to do with AppSync, like
writing resolvers. When I used Amplify, you were required to use DynamoDB, which is Amazon's
performance-optimized NoSQL managed database solution. Amplify also automatically generates your GraphQL
queries and mutations for your client-side code based on what it thinks you'll need given your
GraphQL schema.

## Initial impression

My initial experience with Amplify was awesome. After running just
a few commands from the command-line, I had a React Native app running on my iPhone
(using Expo) that was talking to a real GraphQL backend running in Amazon's cloud.
With a little more work, I had a fully functional
Sign In/Sign Out/Forgot Password screen in my app backed by AWS Cognito.
I was also able to add row-level permissions to my GraphQL API that restricted
users access to their own resources just by adding an `@auth` directive to
my GraphQL schema. The early promise of Amplify was that I could make any backend
changes I needed just by updating my GraphQL schema, and then run the Amplify
regenerate command which would magically update all of my client-side
code and push out updates to AppSync and DynamoDB.

This all sounded great in theory, but in the end Amplify wasn't able to live
up to that promise.

## Many-to-many relationships

Setting up a many-to-many relationship is very easy to do in SQL databases.
For some reason, many-to-many relationships are a little tricky to represent in
a GraphQL schema, so each GraphQL framework has settled on their own way to handle them.

At the time when I was using Amplify, the did not natively support many-to-many
relationships. Instead, they offered a hack you could use where you simulate
the many-to-many relationship using two many-to-one relationships.
Unfortunately, when you used this hack, the
client-side code that Amplify generated for you was not what you actually needed,
so to get it to work fully I had to do a lot of extra legwork.

For some reason, Amplify had no problem with create-mutations for many-to-many
relationships, but was completely unable to handle deletes. For my project,
I needed a many-to-many relationship between Movies and Lists of Movies (MovieList).
Implementing the ability to delete a Movie from a MovieList required two weeks of frustrating work.
I had to write my own resolver using an Apache VTL template
(seriously, [what is this](http://velocity.apache.org)?)
and fight with DynamoDB. When AppSync works it's great, but debugging it when it's not
is a nightmare.

If you want to go deep on this, take a look at
[the Github issue for adding many-to-many relationships to Amplify](https://github.com/aws-amplify/amplify-cli/issues/91).
The issue was open for more than a year
and is filled with comments from developers trying to get Amplify to do simple
things and who were just as frustrated as I was.

## Final thoughts

I've been told by more experienced engineers that when it comes to frameworks, "magic" is bad.
In this context, "magic" refers to a framework's ability to automate away writing
boilerplate code which is supposed to save you time. The problem with "magic" frameworks
is you're screwed if that framework doesn't have a "spell" (i.e., documented solution) for that one special
thing you need to do. The magic of the framework becomes your enemy, and you need to fight
against the framework or write complex low-level code to solve your problem.

This is exactly what happened to me with Amplify. Everything was a breeze until I needed
to delete a Movie from a MovieList. By the time I realized the difficulty of this task,
I was already too deep with Amplify to consider abandoning it. So I had to waste weeks solving
a problem that I wouldn't have had in the first place if I was using a more basic,
less magical framework.

Also, don't use DynamoDB unless you're really, _really_ sure it's right
for your use-case. I assumed that a NoSQL database would be simpler than a SQL
database (No rules! 🥳), but it's actually the opposite. Database migrations
are not possible in DynamoDB tables without manually iterating through every
row and updating it, so you better be sure you know what your schema is going
to be when you start. As far as I can tell, the only reason you would use
DynamoDB over a SQL database is if you need a Google-scale database solution
with massive horizontal scaling and extremely low latency responses.
For 99% of use cases, a simple SQL database running on RDS is easier to work with
and will perform just fine.

If you're curious what I would use instead of Amplify if I were to start that project today, you
can read [my post on that here](/post/backend_for_dating_app).