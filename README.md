# My Music Studio

A full-stack application for private music teachers to manage their studios and their students. This is a refactor of the previous version of My Music Studio. See old repo here: [My Music Studio](https://github.com/Blake-Larson/my-music-studio)

Live Site Coming Soon

<p align="center" ><img align="center" src="https://github.com/Blake-Larson/my-music-studio/blob/main/client/src/assets/images/demo.jpg" alt="The inital view of My Music Studio" /></p>

## Why refactor the app?
With my expertise in JavaScript, I realized I was lacking experience working in a typesafe environment. I wanted to challenge myself to work with the same kind of typesafety you come across in many other programming languages. The t3 stack allows me to do this while staying within JavaScript. Typesafety improves productivity and helps me commit with fewer bugs.

## How It's Made:

### Tech used:

**HTML, CSS, JavaScript, React, Next.js, TypeScript, TailwindCSS, tRPC, Prisma, and CockroachDB**

### Front-End

The front-end for this app was built using React in Next.js and TailwindCSS. In the app, users can create students, enter and update their information, and create lessons. This allows music teachers to view what lessons they have coming up and what the students have been working on.

TypeScript provides the typesafety for the front-end and it provides live feedback as you write your code by defining expected data types. Next.js offers a lightly opinionated, heavily optimized approach to creating applications using React. I use NextAuth for authentication which is an excellent solution to bring in the complexity of security without the hassle of having to build it yourself. Next.js also comes with built in routing compared to the react-router-dom package I used previosly.

### Back-End

The back-end for this app was built using tRPC, Prisma, and CockroachDB. For this app, I have various routers that handle crud operations for items such as Lessons, Students, and Todos. The combination of tRPC and Prisma allows for robust API and data handling.

tRPC allows you to write end-to-end typesafe APIs without any code generation or runtime bloat. It uses TypeScript’s great inference to infer your API router’s type definitions and lets you call your API procedures from your frontend with full typesafety and autocompletion. Prisma is an ORM for TypeScript, that allows you to define your database schema and models in a schema.prisma file, and then generate a type-safe client that can be used to interact with your database from your backend.

## Optimizations

This is a long term project with many optimizations and dreams in mind.

- Continue refactor to complete live site with the same funcionality as the previous version had.
- Add additional forms of authentication so users can feel comfortable with whichever provider they prefer.
- Release to my music teacher contacts to receive feedback and get ideas for future features.
- Add a student portal that students can access to view their assigned music and lessons.

## Lessons Learned:

While I will continue to learn as I build out this project, I have already learned so much about the benefits of typesafety. Every time I create a variable to hold data I have to think about where the data comes from and how I'm going to handle it. This has given me a lot of practice analyzing my app from an overview perspective. I have a better understanding of the structure of my data and what I'm trying to solve with my application. 

---

## Other Work:

Take a look at some other projects I have.

**Inventory App Demo:** [Live Site](https://demo-inventory-app-bl.netlify.app/) | [Repo](https://github.com/Blake-Larson/inventory-app)

**Karissa Derousseua: A client Website** [Kdconciergept.com](https://kdconciergept.com/)


## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

