This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

If you're not familiar with Next.js or Prism, refer to the [Learn](#LearnMore) section for tutorials.

For this project, we expect node 14.

If it's your first time, run

```
yarn
```

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

<a id="LearnMore"></a>

## Learn More

To learn more about Next.js and Prisma, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- Next with Prisma tutorial (link below errata). Many of the prisma instructutions are outdated. READ BELOW ERRATA NOTES:

  - Section: Install Prisma
    - Follow below instructions, then skip this section

  ```
        npm install @prisma/client
        npm install prisma typescript ts-node @types/node --save-dev

        # or

        yarn add @prisma/client
        yarn add prisma typescript ts-node @types/node --save-dev
  ```


    - create a tsconfig.json file with the following content:
```

{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}

```
  - Section: Generate and Run Database Migrations
```
yarn prisma migrate dev --name init
``` 
## Deployment

Deployment to be determined.
    
