'use client';

import React from 'react';

import CollectibleDetailsTab from '../_components/details';
import CollectibleListingsTab from '../_components/listings';
import CollectibleOffersTab from '../_components/offers';
import { useParams } from 'next/navigation';

export type CollectibleMode = 'details' | 'offers' | 'listings';

export default function Mode() {
  const params = useParams();
  const mode = params.mode as CollectibleMode;

  if (mode === 'details') {
    return <CollectibleDetailsTab />;
  }

  if (mode === 'offers') {
    return <CollectibleOffersTab />;
  }

  if (mode === 'listings') {
    return <CollectibleListingsTab />;
  }
}

export const runtime = 'edge';
