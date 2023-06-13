import { PDFLoader as PDFLoaderBase } from 'langchain/document_loaders/fs/pdf';
import { Loader } from '../Loader';

export class PDFLoader implements Loader {
  load = async (file: File) => {
    const pdfLoader = new PDFLoaderBase(file);
    const rawDocs = await pdfLoader.load();

    return rawDocs;
  };
}
