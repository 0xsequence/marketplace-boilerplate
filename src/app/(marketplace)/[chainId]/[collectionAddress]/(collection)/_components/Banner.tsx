import { Image } from '@0xsequence/design-system';

const supportedVideoExtensions: Array<'mp4'> = ['mp4'];

type CollectionBannerProps = {
  bannerUrl: string | undefined;
};

const CollectionBanner = ({ bannerUrl }: CollectionBannerProps) => {
  const isVideo = !!bannerUrl
    ? supportedVideoExtensions.some((value) => bannerUrl.endsWith(value))
    : false;

  const className = 'object-cover w-full h-[200px] md:h-[360px]';

  if (isVideo) {
    return (
      <video
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
        className={className}
      >
        <source src={bannerUrl} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image src={bannerUrl} alt="Collection banner" className={className} />
  );
};

export default CollectionBanner;
