import { NextResponse, NextRequest } from 'next/server';

import {
  loadFiles,
  getIsFile,
  splitDocuments,
} from '@docu/shared/DocumentLoader';
import { getAssistantService } from '@docu/features/Assistant';

const getAreValidFormDataEntries = (
  formFiles: unknown[],
): formFiles is File[] => {
  return [...formFiles].every(getIsFile);
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const formFiles = formData.getAll('files');

  const areValidFormDataEntries = getAreValidFormDataEntries(formFiles);

  if (!areValidFormDataEntries) {
    return NextResponse.json(
      { error: 'Request contains invalid files' },
      { status: 400 },
    );
  }

  const documents = await loadFiles(formFiles);

  const chunkedDocuments = await splitDocuments(documents, {
    chunkOverlap: 200,
    chunkSize: 1000,
  });

  const assistantService = await getAssistantService();

  await assistantService.train({ documents: chunkedDocuments });

  return NextResponse.json({ docs: chunkedDocuments });
}
