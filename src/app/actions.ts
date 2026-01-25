'use server';

import { generateCopy } from '@/ai/flows/generate-copy';
import type { GenerateCopyInput, GenerateCopyOutput } from '@/ai/flows/generate-copy';

export async function generateCopyAction(
  input: GenerateCopyInput
): Promise<GenerateCopyOutput | { error: string }> {
  if (!input.sourceMaterial || input.sourceMaterial.trim().length < 50) {
    return { error: 'Please provide source material (at least 50 characters) for fact-grounded copy generation.' };
  }
  if (!input.prompt || input.prompt.trim().length < 10) {
    return { error: 'Please provide a prompt describing what you want to create.' };
  }
  try {
    const result = await generateCopy(input);
    return result;
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate copy. Please try again.' };
  }
}

// Store uploaded sources in memory (for demo purposes)
// In production, this would be in a database
const sourcesStore = new Map<string, { id: string; name: string; content: string; uploadedAt: Date }>();

export async function uploadSourceAction(
  fileName: string,
  fileContent: string
): Promise<{ id: string; name: string } | { error: string }> {
  if (!fileName || !fileContent) {
    return { error: 'Invalid file data.' };
  }
  try {
    const id = `source_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sourcesStore.set(id, {
      id,
      name: fileName,
      content: fileContent,
      uploadedAt: new Date(),
    });
    return { id, name: fileName };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to upload source.' };
  }
}

export async function listSourcesAction(): Promise<Array<{ id: string; name: string; uploadedAt: Date }>> {
  return Array.from(sourcesStore.values()).map(({ id, name, uploadedAt }) => ({
    id,
    name,
    uploadedAt,
  }));
}

export async function getSourceContentAction(id: string): Promise<string | null> {
  const source = sourcesStore.get(id);
  return source ? source.content : null;
}

export async function deleteSourceAction(id: string): Promise<{ success: boolean }> {
  const deleted = sourcesStore.delete(id);
  return { success: deleted };
}
