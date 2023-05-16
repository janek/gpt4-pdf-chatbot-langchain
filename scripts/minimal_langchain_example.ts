import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { makeChain } from '@/utils/makechain';
import { pinecone } from '@/utils/pinecone-client';
import { PineconeClient } from '@pinecone-database/pinecone';
import * as dotenv from 'dotenv';
import { ConversationalRetrievalQAChain, VectorDBQAChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

dotenv.config();


const { question, history } = { question: 'was ist notwehr?', history: [] };

console.log('question', question);


// OpenAI recommends replacing newlines with spaces for best results
const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

try {
  const index = pinecone.Index(PINECONE_INDEX_NAME);

  /* create vectorstore*/
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({}),
    {
      pineconeIndex: index,
      textKey: 'text',
      namespace: PINECONE_NAME_SPACE, //namespace comes from your config folder
    },
  );

  //create chain
  const chain = makeChain(vectorStore);
  //Ask a question using chat history
  const response = await chain.call({
    question: sanitizedQuestion,
    chat_history: history || [],
  });

  console.log('response', response);
} catch (error: any) {
  console.log('error', error);
}