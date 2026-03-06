'use client';

export type PreviewViewState = 'user' | 'admin';

export function usePreviewState() {
  return { viewState: 'user' as PreviewViewState };
}
