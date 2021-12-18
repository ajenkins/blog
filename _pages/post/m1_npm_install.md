---
layout: layouts/post.njk
title: 'Fixing npm install on an M1 Mac'
tags: ['software engineering', 'javascript', 'mac']
date: 2021-11-20 08:20:00 -05:00
---

I just bought a new Macbook with an M1 chip to work on my
[dating app](/post/making_a_dating_app).
I got the basic Macbook Air but with 16 GB of RAM if you're wondering.
I heard that there were some issues with software compatibility with
software built for Intel-based Macs, but I figured all of that would
have been smoothed out
{% footnoteref "fixes", "They actually <em>have</em> fixed these issues. But if you don't regularly update your npm packages (does anyone?) then there's a good chance one or more of your packages won't be compatible with the new ARM-based Macs." %}by now{% endfootnoteref %}
given that these Macs have been out for
a full year.
However, when I re-cloned the repo for this blog and
ran `npm install` I kept getting errors. I'll tell you how I fixed
it so you know what to do if this happens to you.

Before you get started, I recommend you install three things on your
new Mac that should make things easier:

1. The Xcode developer tools. Run `xcode-select --install`.
1. [Homebrew](https://brew.sh) for installing command line utilities on Mac.
1. [nvm](https://github.com/nvm-sh/nvm) for installing node, npm, and switching node versions.

Once you have that installed you should use nvm to install some version of node.
I installed the latest version (17) which ended up working for me, but you may
need a different version for your project. Now, `cd` into your project folder
and run `npm install`. If it works, great! You can stop reading now 😄

Ok, so `npm install` didn't work. Now what? First I'll tell you the
_last_ thing I did, because I suspect that if I had just done that I could
have skipped all the other steps.

When I was trying to debug this I was confused because when I would Google
the errors I was seeing I would find it mentioned in a closed Github Issue
that said the error was fixed in a new version of the package. In retrospect
it seems obvious, but I was able to make all of my `npm install` errors go
away by upgrading all of my packages to their latest version.

Here's an example of an error I was getting that went away after updating
my packages:

```
npm ERR! code 1
npm ERR! path /Users/aj/Development/blog/node_modules/esbuild
npm ERR! command failed
npm ERR! command sh -c node install.js
npm ERR! Unsupported platform: darwin arm64 LE
```

Rather than figure out the latest version for each package and upgrading
them one-by-one I wanted to upgrade everything to their latest version
all at once.

My understanding is that this is what the `npm update` command does,
so that might work for you, but I used a third party package called
npm-check-updates instead. You can install it with `npm install -g npm-check-updates`
(luckily `npm install` worked for _this_ package 😅) and run
it by just running `ncu` in the folder where your package.json
file is or `ncu -u` to actually modify your package.json file.

Once my package.json file was updated with the latest version for each
package I ran `npm install` again and everything installed without errors.
In my case, I didn't even need to change any of my code – everything just worked.

So hopefully that's all you need to do, but I actually did do one other thing before
I updated the packages, so I'll mention it in case you run into the same error I did
even after updating your packages.

Here's the error I was getting:

```
npm ERR! code 1
npm ERR! path /Users/aj/Development/blog/node_modules/sharp
npm ERR! command failed
npm ERR! command sh -c (node install/libvips && node install/dll-copy && prebuild-install --runtime=napi) || (node-gyp rebuild && node install/dll-copy)
npm ERR! CC(target) Release/obj.target/nothing/../node-addon-api/nothing.o
npm ERR!   LIBTOOL-STATIC Release/nothing.a
npm ERR!   TOUCH Release/obj.target/libvips-cpp.stamp
npm ERR!   CXX(target) Release/obj.target/sharp/src/common.o
npm ERR! info sharp Downloading https://github.com/lovell/sharp-libvips/releases/download/v8.9.1/libvips-8.9.1-darwin-arm64v8.tar.gz
npm ERR! ERR! sharp Prebuilt libvips 8.9.1 binaries are not yet available for darwin-arm64v8
npm ERR! info sharp Attempting to build from source via node-gyp but this may fail due to the above error
npm ERR! info sharp Please see https://sharp.pixelplumbing.com/install for required dependencies
npm ERR! gyp info it worked if it ends with ok
npm ERR! gyp info using node-gyp@8.2.0
npm ERR! gyp info using node@16.13.0 | darwin | arm64
npm ERR! gyp info find Python using Python version 3.8.9 found at "/Library/Developer/CommandLineTools/usr/bin/python3"
npm ERR! gyp info spawn /Library/Developer/CommandLineTools/usr/bin/python3
npm ERR! gyp info spawn args [
npm ERR! gyp info spawn args   '/Users/aj/.nvm/versions/node/v16.13.0/lib/node_modules/npm/node_modules/node-gyp/gyp/gyp_main.py',
npm ERR! gyp info spawn args   'binding.gyp',
npm ERR! gyp info spawn args   '-f',
npm ERR! gyp info spawn args   'make',
npm ERR! gyp info spawn args   '-I',
npm ERR! gyp info spawn args   '/Users/aj/Development/blog/node_modules/sharp/build/config.gypi',
npm ERR! gyp info spawn args   '-I',
npm ERR! gyp info spawn args   '/Users/aj/.nvm/versions/node/v16.13.0/lib/node_modules/npm/node_modules/node-gyp/addon.gypi',
npm ERR! gyp info spawn args   '-I',
npm ERR! gyp info spawn args   '/Users/aj/Library/Caches/node-gyp/16.13.0/include/node/common.gypi',
npm ERR! gyp info spawn args   '-Dlibrary=shared_library',
npm ERR! gyp info spawn args   '-Dvisibility=default',
npm ERR! gyp info spawn args   '-Dnode_root_dir=/Users/aj/Library/Caches/node-gyp/16.13.0',
npm ERR! gyp info spawn args   '-Dnode_gyp_dir=/Users/aj/.nvm/versions/node/v16.13.0/lib/node_modules/npm/node_modules/node-gyp',
npm ERR! gyp info spawn args   '-Dnode_lib_file=/Users/aj/Library/Caches/node-gyp/16.13.0/<(target_arch)/node.lib',
npm ERR! gyp info spawn args   '-Dmodule_root_dir=/Users/aj/Development/blog/node_modules/sharp',
npm ERR! gyp info spawn args   '-Dnode_engine=v8',
npm ERR! gyp info spawn args   '--depth=.',
npm ERR! gyp info spawn args   '--no-parallel',
npm ERR! gyp info spawn args   '--generator-output',
npm ERR! gyp info spawn args   'build',
npm ERR! gyp info spawn args   '-Goutput_dir=.'
npm ERR! gyp info spawn args ]
npm ERR! gyp info spawn make
npm ERR! gyp info spawn args [ 'BUILDTYPE=Release', '-C', 'build' ]
npm ERR! warning: /Library/Developer/CommandLineTools/usr/bin/libtool: archive library: Release/nothing.a the table of contents is empty (no object file members in the library define global symbols)
npm ERR! ../src/common.cc:23:10: fatal error: 'vips/vips8' file not found
npm ERR! #include <vips/vips8>
npm ERR!          ^~~~~~~~~~~~
npm ERR! 1 error generated.
npm ERR! make: *** [Release/obj.target/sharp/src/common.o] Error 1
npm ERR! gyp ERR! build error
npm ERR! gyp ERR! stack Error: `make` failed with exit code: 2
npm ERR! gyp ERR! stack     at ChildProcess.onExit (/Users/aj/.nvm/versions/node/v16.13.0/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:194:23)
npm ERR! gyp ERR! stack     at ChildProcess.emit (node:events:390:28)
npm ERR! gyp ERR! stack     at Process.ChildProcess._handle.onexit (node:internal/child_process:290:12)
npm ERR! gyp ERR! System Darwin 21.1.0
npm ERR! gyp ERR! command "/Users/aj/.nvm/versions/node/v16.13.0/bin/node" "/Users/aj/.nvm/versions/node/v16.13.0/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
npm ERR! gyp ERR! cwd /Users/aj/Development/blog/node_modules/sharp
npm ERR! gyp ERR! node -v v16.13.0
npm ERR! gyp ERR! node-gyp -v v8.2.0
npm ERR! gyp ERR! not ok
```

It's a little hard to parse this error message, but basically npm can't install
a package called sharp which I believe is a low-level utility package.
And the reason the install is failing is because
"Prebuilt libvips 8.9.1 binaries are not yet available for darwin-arm64v8" and
"fatal error: 'vips/vips8' file not found".
When I Googled this error I found a lot of different solutions, but the one that
worked for me was running `brew install vips`, then re-running `npm install`.
Once I did that this error went away, but then I got the esbuild
error I first mentioned. I suspect that if I had updated my packages from the
get-go I wouldn't have needed to install vips at all.

If you're trying to run `npm install` on an M1 Mac and updating the packages
doesn't fix it or you're getting different errors, I probably won't be of
much help. I recommend Googling the errors you're getting to see if anyone
else ran into that same error and was able to find a solution.

Hope this helped and good luck!

---

<p id="footnote-1">
[1]: 
</p>
