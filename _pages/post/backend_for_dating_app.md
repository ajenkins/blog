---
layout: layouts/post.njk
title: Building a modern API in 2020
subtitle: AppSync vs. Hasura vs. Prisma vs. Dgraph vs. PostgREST vs. PostGraphile vs. FastAPI
tags: ['dating app', 'web development', 'software engineering', 'hasura', 'aws']
date: 2020-12-02 22:00:00 -05:00
---

## Intro

In 2020, you have more options than ever for building a backend API for your
app or website. Choice is good and the newest generation of backend frameworks
are amazing, but having so many choices to consider can be overwhelming.

Before starting work on [my dating app](/post/making_a_dating_app), I decided to research these next-gen
tools for building a backend to make sure I'm using the right tool for the job.
If you're planning on creating an app that needs a backend, you'll likely be
considering many of the same options I was considering. Although I don't have
hands on experience with most of these tools, I did learn a lot about them by
carefully reading their docs to understand what they do and don't do. I hope that
by sharing what I've learned with you, I can clear some things up that confused
me and save you some time.

I'll also tell you which services I'm planning to use for my app. But keep in mind
that I may change my mind once I get started, or I may regret some of these decisions.
In a year I'll give an update and let you know how these tools worked out for me 🙂

## Components of backend stack

In my mind, these are the main components you need when building a backend API:

1. Hosting (e.g., Netlify, AWS EC2, serverless options)
1. Database (e.g., MongoDB, PostgreSQL)
1. (_Optional_) ORM (e.g., SQLAlchemy, Prisma Client)
1. API (REST or GraphQL, lots of choices)
1. Auth service (e.g., Auth0, AWS Cognito)

A complete backend stack needs most if not all of these things, but some frameworks
cover multiple items in this list. Like Amplify + AppSync, which takes care of everything
in this list.

I'll walk you through my own decision process for what I would use for each of these components
in the sections below. Before that though, I need to talk about AWS Amplify. In theory, it
sounds like a great tool because it handles all of the above components for you.
But I used Amplify for a project I worked on last year, and my experience with it was so
negative that I swore to never use it again.
[You can read my full review of Amplify/AppSync here](/post/review_of_appsync_and_amplify).

## Hosting

### Cloud providers

Technically, one could decide to host their API on-premises, but I don't think
that's a serious consideration for any new project being built in 2020. The question
in 2020 isn't whether or not you're going to build in the cloud, but which cloud
you're going to use.

The big players in the cloud space are Amazon (AWS), Microsoft (Azure), and Google (GCP).
Heroku is still a good option, but can get a little pricey. There are also lots of
special purpose hosting options that might make more sense for your use case. For example,
the backend needs for this blog are very simple, which is why I'm hosting it with Netlify.

I don't have a strong opinion on Azure, AWS, or GCP, but I have the most experience with
AWS so that's my starting point when I'm deciding what to use. Those three cloud providers
are similar enough in terms of features and pricing that if you have experience with one of them,
that's the one you should use.

### Self-hosted vs. Managed

If a tool is self-hosted, that means that you're responsible for supplying your own
hardware (typically an EC2 instance or Heroku server) to run and serve up the tool.
A managed service (often branded as the Cloud version), is run on some company's
servers, and you pay them a subscription to get access to the tool through them.

Some tools only offer a self-hosted option, some only offer a managed option, and some offer both.
Like Jira, which has two versions you can buy: Jira Server (self-hosted) and Jira Cloud (managed).

Typically, self-hosted tools are open-source and completely free to use forever. All you
need to pay for is the server that's running it. However, there's also the cost of
being completely responsible for that piece of infrastructure. You need to make sure
that the server(s) you're using is fast enough to deliver acceptable performance and
figure out how to scale it if it's not. If there's data involved, you're also on
the hook for keeping that data secure – if you get hacked that's on you.
You also have a lot more control over how the tool works though. Often if you
don't like how it works, you can always just change the code that's running and
make it work the way you want it to.

With managed solutions, you pay a company to worry about all of that stuff for you.
They usually provide you with a nice UI for doing admin tasks, and handle things
like making sure the service is performant, secure, and keeping the software up to date.

Like all things in software engineering, which of these options is better for you
will depend on your use-case. I think personal preferences also plays a big role
in how people make this decision. I know some developers who are great at DevOps
and always prefer to self-host everything.

But for me and for this project, I decided early on that I would go
down the managed route for everything. A classic piece of advice is to maintain
control over the parts of your app that are unique to the problem you're solving,
but outsource everything else. For example, my user auth needs are very standard,
so I immediately disregarded any auth provider that didn't offer a fully managed solution.
That narrowed my options down to basically Auth0 or AWS Cognito.

### Serverless?

I don't know what the word is for the opposite of serverless (serverful?),
but a lot of the next-gen tools tout their ability to run on serverless infrastructure.
The advantage of a serverless backend over a traditional server is that you only
pay for what you use. When you use a traditional cloud server, like an EC2 instance
from Amazon, you pay a fixed rate as long as it's up and running, even if it's
sitting idle and not doing anything. With a serverless backend, you only pay
for when it gets used, and you pay per action performed. This can make serverless
infrastructure much cheaper to run than a traditional server, since you only pay for
what you use. Serverless is also much better at dealing with spiky traffic because
serverless functions are extremely parallelizable and can run as many instances
at once as needed to get through the influx of requests.

You don't need to commit wholesale to making your entire backend serverless
or not serverless though. Hybrid solutions are possible where your main server
does most of the work, but ancillary tasks are handled by short-lived serverless functions.

The main downside of serverless is it may require you to 
adapt the way your code works to function in a serverless environment.
In the past, APIs were always built with the assumption that they would be running
on a persistent server, so you usually need to use a special-purpose API framework
optimized for serverless deployments.

For my purposes, although I could save money by making my backend serverless,
as a team-of-one I decided I'm better off sticking with a traditional "serverful"
architecture. That being said, since I'm mostly using managed services for my backend,
making things serverless honestly wasn't something I really had to consider.
When you pay for a managed service, you don't need to worry about whether or
not the company is using serverless. All that matters is that the service works
when you need it to. I have no idea if Auth0's underlying architecture is
serverless or not, but as long as they give me a JWT when I ask for it, I'm happy.

### What I'll be using

I plan on hosting my database on AWS RDS, and my API using Hasura's managed
cloud offering (spoilers, I'm using Hasura). For auth, I'm using a managed
solution like I mentioned above.

## Databases

Let's get this out of the way: I know very little about databases.
A month ago, I wouldn't have been able to tell you the difference between
an `INNER JOIN` and `OUTER JOIN` if my life depended on it. So, you should
take my opinions on this topic with a grain of salt. The only databases
I've used are PostgreSQL, MongoDB, and DynamoDB.

I have the most experience with Postgres and it seems to be the gold-standard
for SQL databases and the most common choice for a database. So going into
this I was leaning towards Postgres, but I don't particularly enjoy
writing SQL so I was on the lookout for options that would solve my
data persistence problem without needing to write a line of SQL.

Rather than lecture you on the pros and cons of SQL vs. NoSQL, I'm just
going to skip to the choices I actually considered using.
Regarding SQL vs. NoSQL, all I know is that I much prefer using
PostgreSQL over MongoDB or DynamoDB (especially DynamoDB,
[see my review of Amplify](/post/review_of_appsync_and_amplify)).

The way I chose what database to use was I was committed to using
whatever database was most compatible with the API framework I wanted
to use. Most of the API frameworks I was considering offered the best
compatibility with Postgres, so that seemed like the obvious choice.

Near the end of my search though, I actually did consider using
another database: [Dgraph](https://dgraph.io/graph-db).
Dgraph is a relatively new company which offers several related products,
one of which is a database. They call their database Graph DB, and it's a
distributed graph database optimized for building a GraphQL API.

This was extremely enticing to me, and I was actually very close
to using Dgraph to build my backend.

But after a sober assessment of Dgraph, I decided against using it.
My fear with Dgraph is that I would spend a lot of time building my backend
with it, but then eventually find something that Dgraph can't do or doesn't do
well. If I wanted to switch to a tried-and-true database like Postgres, migrating
would be extremely painful. DuckDuckGoing "migrate from dgraph to postgres" didn't
return any results, so I assume I would need to crawl the GraphQL API to get all
my data out, dump it to a file, then load it into Postgres. And that's assuming
I can massage the data in Dgraph to conform to a relational database model,
which isn't a guarantee because Dgraph is a graph database and not relational.

With an API framework like Hasura, if I decide to use something else, at least
I'll have my Postgres database that I can reuse with a new framework.

### What I'm using

Plot twist! I've decided to use AWS Aurora as my database. Supposedly it's a drop-in
replacement for Postgres, so I don't think it's a stretch to say I'm using a Postgres database.
The reason I want to use Aurora instead of true Postgres is because it works exactly like
Postgres but is cheaper and faster. That's what Amazon says anyway, so I'll take their
word for it.

## Prisma

When I started researching backend options, I was _really_ hoping to learn
that Prisma would be the best choice for my app. I've been following Prisma's
development for a while, and I've been itching to finally use it for a project.
In 2019 when I was screaming at Amplify for ruining my life, I would often look
longingly at the Prisma docs and fantasize about how much easier things would have
been for me if I had used Prisma instead. So Prisma was definitely my number
one choice going into this.

Unfortunately, after doing a lot of research on Prisma, I realized that it's
not the magic bullet I thought it was. It took me a long time to come to grips
with what Prisma even is now, so I'll explain what I thought Prisma was, why I
thought that, and what it _actually_ is.

### The History of Prisma

The original incarnation of Prisma was actually called Graphcool.
Graphcool was already considered a legacy product by the Prisma
team when I first encountered it, so I don't know a lot about it.

But it seems like it was a full-stack, managed service for building
a GraphQL API, similar to what DGraph offers now. It had
everything you needed for building a GraphQL backend, including user auth.
But for some reason
they decided it was bad, and pivoted to developing Prisma.

Now known as Prisma 1, Prisma had a narrower scope than Graphcool.
Prisma 1 consisted of three main parts: the Prisma data model schema,
the Prisma server, and the Prisma client. First you would define your
data model using their schema file, and then you could have it run
migrations in your database to create the needed tables.
You were responsible for providing your own hosted database, but
it was compatible with most SQL databases. The schema file
also generated the Prisma client code you used for querying
and mutating the data, and the Prisma server was just a thing
that facilitated communication between the Prisma client code
and the database.

When they abandoned Graphcool in favor of Prisma, I was confused but impressed.
Graphcool did more things than Prisma does, so wouldn't that make it better.
But I knew that they must have put a lot of thought into the decision, and surely
it was the right move. I inferred that if they were discontinuing Graphcool in favor
of a product that did less, well then Graphcool must have done _too much_. Sometimes
a framework that does too much than a framework that does too little (I'd rather build
an app with Express than Ruby on Rails), so that must have been the case here. It's better
to do the important things really well, than to try to do everything.

But as you probably guessed from the name Prisma 1, now there's a Prisma 2!
Based on the name, I assumed that Prisma 2 would just be a better version of Prisma 1.
But in fact, Prisma 2 is actually another pivot almost as significant as the pivot away from
Graphcool. For that reason, they're actually moving away from the Prisma 2 moniker now in
favor of calling it Prisma Client. And like the last pivot, Prisma 2 does less than Prisma 1.
Prisma 2 (Prisma Client) is **just an ORM**. Graphcool was a fully managed GraphQL API –
Prisma 2 is an ORM you _use_ to build a GraphQL API.

It took me a really long time to understand that though, because I was thinking of Prisma Client
as an alternative to AppSync, Hasura, and Dgraph. But Prisma Client is solving a different problem,
and occupies a much thinner slice of the stack than those tools.

Like their first pivot, I assumed that this pivot was motivated by an epiphany about
backend developments, and was just a level of genius that I couldn't comprehend. I'm
not being sarcastic by the way, this is literally what I thought. My obsession with finding
[silver bullets](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf) in software engineering
makes me eternally optimistic that someone will finally crack the hard problems and find
a revolutionary way to do something better.

Another misconception I had about Prisma was I thought that Prisma Client was something you
used in your client-side code. I was thinking of it as a super-powered version of Apollo
Client, except instead of talking to a GraphQL API it magically talks directly to the database.
But even though the Prisma Client code is in Javascript, it's not intended to run on the client-side.
Prisma Client is used within a NodeJS server, like Express.

I also wasted a lot of time trying to figure out what Prisma 2's auth story is. Hasura has a page
in their docs about auth and so does Amplify, Dgraph, and even Prisma 1. But the only reference
to auth I could find in the Prisma 2 docs was an example repo that implemented user auth.
I looked at that code but I was confused because the auth code seemed completely disconnected
from the Prisma code. In the end, I finally realized that the reason they didn't have any docs
about auth is because Prisma 2 just doesn't have an auth story like the frameworks I was comparing it to.
This makes sense when you realize that Prisma 2 is... **Just. An. ORM.**

### Why I'm not using Prisma

Although in my head I still picture the Prisma devs as enlightened, 10x, levitating
engineers who have discovered the ultimate truth for building backends, I've
decided that Prisma 2 is not the right tool for my project

If the backend API was the interesting part of my project, then I would consider
using Prisma. But it's not, so I want a tool that will give me a fully functional
API from the least amount of effort. Prisma Client is just too low level of a tool
for me – if it's just a sub-tool for building out a GraphQL API, then I'd rather use
one tool that can give me a complete GraphQL API.

Maybe next time, Prisma 😢

## API frameworks

Here are the API frameworks I considered using for this project, in no particular order:
[PostgREST](https://postgrest.org/en/v7.0.0/),
[Supabase](https://supabase.io),
[Hasura](https://hasura.io),
[GraphQL Nexus](https://nexusjs.org),
[FastAPI](https://fastapi.tiangolo.com),
[Flask](https://flask.palletsprojects.com/en/1.1.x/),
[Express](http://expressjs.com),
[PostGraphile](https://www.graphile.org/postgraphile/),
and [Dgraph](https://dgraph.io).

These tools occupy a wide spectrum of API solutions. Here are a few ways to categorize them:

#### GraphQL or REST

##### GraphQL
- GraphQL Nexus
- PostGraphile
- Dgraph
- Hasura

##### REST

- PostgREST
- Supabase
- FastAPI
- Flask
- Express

#### Self-hosted or managed

##### Self-hosted
- PostgREST
- GraphQL Nexus
- FastAPI
- Hasura Core
- Flask
- Express
- PostGraphile

##### Managed

- Supabase
- Hasura Cloud
- Dgraph

#### Postgres or a different database

All of the options I considered either require Postgres
(you can spot them based on their name) or are compatible with Postgres, with
the exception of Dgraph which uses its own database system.

### GraphQL vs. REST

[REST](https://en.wikipedia.org/wiki/Representational_state_transfer)
is still the gold-standard for API design and is how most
APIs built in the last 10 years have been modeled. [GraphQL](https://graphql.org) is a relative newcomer
originally developed by Facebook but that has been embraced by the open-source community.
After my negative experience with Amplify and AppSync, I came into this project assuming
I would build a REST API. But then I read
[a Medium post about GraphQL](https://medium.com/@JeffLombardJr/when-and-why-to-use-graphql-24f6bce4839d)
and walked away convinced I was better off using GraphQL. The advantage he described
that was convincing to me was that with a GraphQL API you don't need to waste time
designing your endpoints in accordance with REST best-practices. Once you've
got a spec-compliant GraphQL endpoint, you're done – it will do everything you need it to do.
The main downside of GraphQL is that it can be hard to migrate from REST to GraphQL,
but that's not a concern with a brand new project. So for me, there's not much of a downside
to using GraphQL.

### Self-hosted vs. Managed

In the Hosting section I go into more detail about the differences between them.
I also said that I prefer managed solutions whenever possible. That being said, in this
case I was very open to self-hosting the API. As you can see in the above lists, most
of the frameworks I considered were self-hosted and self-hosting my API seems very natural to
me, unlike self-hosting an auth service.

Although I was open to self-hosting my API, the managed solutions were ultimately more
appealing to me. Not because I didn't want to host the API, but because the managed options
also promised the ability to manage the API and database through an admin UI rather than
needing to write code. Even though I know how to write code, I still try to avoid writing
code unless I need to. Because while writing code is a lot of fun, maintaining code is not.
So the less code there is to maintain, the better.

### Postgres vs. Something else

Based on the above two considerations, that only left Hasura and Dgraph as potential options.
In the end I decided I was better off with Hasura, even if Dgraph would have offered a better
developer experience. Knowing that the entire backend was underpinned by a Postgres database
was just more important. See the Databases section above for more on this.

### What I'm using

Hasura Cloud. Read the previous few sections for why.

## User Auth

Like I mentioned in the Hosting section, user auth is one thing that I really want a managed solution for.
Handling user data scares me, and I don't want to have to be responsible for keeping sensitive data like
that secure.

Of the managed offerings, the two main options I found were Auth0 and AWS Cognito. Here are the pros
and cons of each of them:

### Auth0

#### Pros

- Free for up to 7000 users
- Best-in-class developer experience
- Great documentation
- Very popular - easy to find help online
- SDKs in lots of languages for generating log-in flows

#### Cons

- [Expensive past 7000 users](https://auth0.com/pricing/)

### AWS Cognito

#### Pros

- Made by Amazon, so you know it's probably decent and won't close up shop
- Very affordable pay-per-user pricing model, no big jumps in price

#### Cons

- AWS docs are usually bad
- No drop-in code for login-flow unless you're using Amplify

### What I'm using

AWS Cognito. Even though Auth0 would have been way easier to get started with, their pricing
model is a no-go for me. I'm ambitious and hope to have many more than 7000 users (it's a free consumer app),
and I don't want to have to give that much money to Auth0. I considered starting with Auth0 and then
moving to Cognito down the road once I got more than 7000 users. But after reading Auth0's docs
on how you migrate from one auth backend to another, the process sounded too hard and fraught with
peril. I wouldn't trust myself to do that without screwing up and deleting or exposing everyone's
passwords.

So I decided I'm better off biting the bullet and spending some extra effort in the beginning
to get Cognito set up.

## Summary

Putting it all together, here's what my backend stack will look like:

1. Database - AWS Aurora (Postgres flavor)
1. API - Hasura Cloud
1. Auth service - AWS Cognito

On the frontend, I'm going to use Apollo Client and React Native.

That's it! Thanks for reading this very long post. This post was good motivation
for me to add a table of contents plugin to my blog, so maybe I'll do that soon.

What backend tools are you excited about? Do you think I missed the mark on something?
Will I rue the day I decided to build my backend with Hasura? Let me know in the comments!


