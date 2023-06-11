# DocuMate

DocuMate is your friendly AI assistant that can devour large amounts of documents and answer your question (using that data as a context) to enhance your document work experience and not take your job (for now). We plan to implement it using TypeScript as the main language and React as the UI library. The key feature is to integrate with OpenAI language model and Pinecone vector database to introduce long-term memory.

## Project goals

This is two days Global Innovation Day hackathon project. The main goal is to build a prototype that can be used to demonstrate the idea of introducing context long-term memory to AI language models.
MWP should include uploading pdf documents, processing the text context of those documents, and being able to get answers from user prompts from the document context.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Required environment variables

You should create a `.env` file in the root directory of this project and add the following environment variables:

```bash
OPENAI_API_KEY=...

PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=...
PINECONE_INDEX_NAME=...
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
