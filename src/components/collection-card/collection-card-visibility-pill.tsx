import { HiddenIcon, Text, VisibleIcon } from '@0xsequence/design-system';

const CollectionCardVisibilityPill = ({
  isShopCollectionPrivate,
  shouldShowVisibilityPill,
}: {
  isShopCollectionPrivate: boolean;
  shouldShowVisibilityPill: boolean;
}) => {
  if (!shouldShowVisibilityPill) return null;

  const colors = {
    visible: {
      background: 'hsla(142, 72%, 29%, 0.2)',
      text: 'hsla(142, 72%, 29%, 1)',
    },
    hidden: {
      background: 'hsla(44, 69%, 47%, 0.2)',
      text: 'hsla(41, 96%, 40%, 1)',
    },
  };

  return (
    <div
      style={{
        background: isShopCollectionPrivate
          ? colors.hidden.background
          : colors.visible.background,
      }}
      className="flex items-center gap-1 px-1 py-0.5 rounded-sm w-fit"
    >
      {isShopCollectionPrivate ? (
        <HiddenIcon
          style={{
            color: isShopCollectionPrivate
              ? colors.hidden.text
              : colors.visible.text,
          }}
          className="w-3 h-3"
        />
      ) : (
        <VisibleIcon
          style={{
            color: isShopCollectionPrivate
              ? colors.hidden.text
              : colors.visible.text,
          }}
          className="w-3 h-3"
        />
      )}

      <Text
        style={{
          color: isShopCollectionPrivate
            ? colors.hidden.text
            : colors.visible.text,
        }}
        className="text-[10px] font-medium"
      >
        {isShopCollectionPrivate ? 'Private' : 'Public'}
      </Text>
    </div>
  );
};

export default CollectionCardVisibilityPill;
