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

## High-level LangChain flow overview

Our project aims to leverage the power of the **LangChain** framework to handle the heavy lifting. Here's a step-by-step overview of our approach:

1. **Parsing and Document Creation**: We begin by parsing the text data and transforming it into structured entities called "Documents." These Documents serve as the fundamental units for further processing.
2. **Document Chunking**: The next step involves splitting the Documents into smaller, more manageable chunks. This enables more efficient processing and analysis of the text data.
3. **Embedding Generation:** We generate vector representations of the chunked Documents using `Embeddings`. These `Embeddings` capture the semantic meaning of the text and provide a numerical representation that can be used for various tasks.
4. **Vector Database Storage**: The generated Embeddings are stored in a Vector database. This database allows for efficient storage and retrieval of the Embeddings based on their similarity to other vectors.

When a user submits a question to the system, we generate a vector representation of the question itself. This question vector is then used to perform a similarity search within the vector database. By retrieving relevant chunks from the database, we can provide the necessary data to the language model for further processing.

At this point, the language model has both the initial question and the retrieved data from the database. It can utilize this information to either provide an answer directly or take appropriate actions based on the given context.

### LangChain building blocks

**Components**:

- **LLM Wrappers**
- **Prompt Templates**: These templates assist in generating prompts for the language model. They provide a structured approach to composing queries or requests, enhancing the effectiveness of interactions with the model.
- **Indexes**: Indexes play a crucial role in extracting relevant data from the vector database. They enable quick and accurate retrieval of matching Embeddings based on similarity measures.

**Chains**:

Chains allow for the combination of different components in order to solve specific tasks. This modular approach enhances flexibility and scalability within the framework.

**Agents**

Allow LLM to interact with the external APIs.
