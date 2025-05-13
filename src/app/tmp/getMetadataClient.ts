import { SdkConfig } from '@0xsequence/marketplace-sdk';
import { SequenceMetadata } from '@0xsequence/metadata';

export const getMetadataClient = (config: SdkConfig) => {
  const projectAccessKey = config.projectAccessKey;
  return new SequenceMetadata(
    'https://dev-metadata.sequence.app',
    projectAccessKey,
  );
};
