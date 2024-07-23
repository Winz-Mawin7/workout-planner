This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/workout-planner.git
   cd workout-plann
   pnpm install # npm or yarn
   ```

2. Create environment variables

Create `.env` or `.env.local` file exmaple from `.env.example`

3. To run docker MongoDB and Mongo Express database locally

installation: https://docs.docker.com/engine/install/

```
docker-compose up -d
```

4. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Note
- `docker-compose` to access .env instead of hardcode
- `OPENAI_API_KEY` genrate from https://platform.openai.com/api-keys but you have to add payment method and top-up.

update variables ex. MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, ...etc

### Folders structure

    |-- src/
    |   |-- app/                # NextJS source code
    |   |   ├── (routes)/       # app page router
    |   |   ├── api/            # app api router
    |   |
    |   |-- components/         # shared components
    |   |   
    |   |-- constants/          # constatns variables
    |   |
    |   |-- data/               # data contains api integration
    |   |
    |   |-- hooks/              # custom hooks
    |   |
    |   |-- lib/                # utility libraties
    |   |
    |   |-- models/             # Mongoose models
    |   |
    |   |-- schema/             # validation schema
    |   |
    |   |-- types/              # typescript shared types
    |   |
    |   |-- utils/              # utility functions
    |   |
    |-- README.md               # README file
    |-- .env                    # environment variables
    |-- docker-compose.yml      # docker-compose images file


### Tools Used
- Next.js 14 (TypeScript) app router 
- React 18
- Tailwind CSS + daisyUI
- MongoDB
- Mongoose
- Docker
- Prettier
- EsLint
- zod
- react-hook-form
- axios
- ai
- openai
- next-auth v4
- react-query


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
