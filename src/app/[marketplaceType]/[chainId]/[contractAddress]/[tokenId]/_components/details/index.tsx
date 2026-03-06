'use client';

import { SocialsClient } from '~/app/[marketplaceType]/_layout/Header/Buttons/Socials-client';

import { useCollectableData } from '../../_hooks/use-collectable-data';
import Description from './Description';
import Details from './Details';
import Properties from './Properties';

export default function CollectibleDetailsTab() {
  const { collectibleMetadata } = useCollectableData();

  return (
    <div>
      <Description
        description={collectibleMetadata.data?.description}
        isLoading={collectibleMetadata.isLoading}
      />

      <SocialsClient shouldHideOnMobile={false} />

      <Properties
        isLoading={collectibleMetadata.isLoading}
        tokenMetadata={collectibleMetadata.data}
      />

      <Details />
    </div>
  );
}
