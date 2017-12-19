# Angular 4 + Material 2 Boilerplate

This is for teaching and learning purpose. It shows that you can bring down an Angular + Material project to roughly 1.2 MB raw code and less than 0.4 MB gzipped. I'm going to improve this further to show the ability to shrink a fully equipped Angular environment for production.

## Goal

This project shows a simple Angular setup with a few parts almost everybody needs:

* Angular 4.4
* Material 2
* Gulp Build System

The main focus is size of the final app. Today we're here:

* main.bundle.js.gz : 288 KB (All of Angular and my app) -- 1.29 MB unzipped
* vendor.js.gz : 59 KB (all polyfills) -- 182 KB unzipped
* site.css : 7 KB (Material's CSS) -- 43 KB unzipped


## Why Gulp?

I'm not going here with WebPack for a reason. First, I want to have a build system that can do more. Even very special tasks. So Gulp it is. The roolup is quite good and not better in WebPack. My TS code can have everything. No limits, no restrictions. It's easy to learn und to understand, because it's just a collection of single tasks.

## Prerequisits

You need **NodeJS**, **npm** (which comes with NodeJS), **gulp** and **http-server**. If the latter are missing, run this:

~~~
npm i gulp http-server -g
~~~

## How to use?

Clone the repo. Run this:

~~~
npm install
npm start
~~~

Navigate to browser `http://localhost:3001`. That's it.

