import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { createClient } from '@supabase/supabase-js';

/* Name of directory to retrieve your files from */
const filePath = 'docs';
const url = 'https://tfjjnfdokzqjwuqpgwan.supabase.co';
const privateKey = 'stored in 1password';

console.log('creating vector store...');
/*create and store the embeddings in the vectorStore*/

const client = createClient(url, privateKey);

const vectorStore = await SupabaseVectorStore.fromTexts(
  ['Hello world', 'Bye bye', "What's this?"],
  [{ id: 2 }, { id: 1 }, { id: 3 }],
  new OpenAIEmbeddings(),
  {
    client,
    tableName: 'documents',
    queryName: 'match_documents',
  },
);
