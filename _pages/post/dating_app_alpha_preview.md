---
layout: layouts/post.njk
title: 'Dating App: Alpha Preview'
tags: ['dating app', 'software engineering', 'react native', 'app development']
date: 2021-1-25 21:00:00 -05:00
---

{% footnoteref "apology", "I'm not really sure who I'm apologizing to. As far as I know, no one is regularly checking my blog anyway 🤷🏼‍♂️" %}Sorry{% endfootnoteref %}
for the extended hiatus.
I haven't had time to write much on here recently because I've been spending
all of my free time working on my dating app. I also took a break to take
a crash course in how to get better at _using_ dating apps, but that's a story
for another day 😉

Since my last update almost a month ago, I've actually made a lot of progress.
As of this past weekend, my app is officially up on
[TestFlight](https://testflight.apple.com) and is being
tested on real iOS devices by my friends and family!

Here's a preview of all of the features I've implemented so far.
There's not much yet, but the standout feature is the video calling
which is real (I'm testing it with two iPhones).

https://youtu.be/Rfri4qkrrqY

Obviously there's still a long way to go before it's ready for real use.
The main things it's missing right now are:

1. **A fresh coat of paint.** It looks pretty rough right now.
   Profile photos would be nice too.
1. **Preferences and filtering by matching users.** Right now you see all online users.
1. **Messaging.** You'll need some way to follow up with people to build the connection.
1. **Time restrictions.** Since the first step is calling other users
   (who need to be online), I'll need to force everyone to use the app at the same time.

But before I do any of that, I decided that I'm going to go back and write automated
tests for all of the current functionality. This is to ensure I don't break existing
functionality when I'm adding new features or refactoring the code. It's a pretty
time consuming endeavor though – I spent about 8 hours yesterday writing tests
_just_ for signup/login! But in the long run having the tests will actually save
me time because I'll be able to make changes with confidence and without needing to
manually test that I didn't break anything.

By the way, I'm using [Jest](https://jestjs.io) and
[React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
for my tests. It worked great for testing the login code, but I ran into issues
when I tried to integrate [React Navigation](https://reactnavigation.org)
into my tests. If you have any tips, let me know in the comments!

Also, if you'd like to be an alpha tester for my app, let me know!
The easiest way to let me know is by giving me your email address using the
form below. I promise I won't use it for anything not related to the dating app.

{% import "forms.njk" as forms %}
{{
    forms.email_signup(
        'dating_app_subscribers',
        message="If you want to receive updates on the progress of the dating app or if you are interested in being an early user, enter your email address below. I'll only contact you about the dating app."
    )
}}
