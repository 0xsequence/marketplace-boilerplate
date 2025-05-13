import '@google/model-viewer';

const ModelViewer = ({
  posterSrc,
  src,
}: {
  posterSrc: string;
  src?: string;
}) => {
  return (
    <div className="bg-background-raised h-full">
      {/* @ts-expect-error - This is a web component */}
      <model-viewer
        alt="3d model"
        class="h-full w-full"
        auto-rotate
        camera-controls
        loading="eager"
        reveal="auto"
        src={src}
        poster={posterSrc}
        autoplay
        shadow-intensity="1"
        touch-action="pan-y"
      />
    </div>
  );
};

export default ModelViewer;
