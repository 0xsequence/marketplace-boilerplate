export function getCollectibleCardWidthClass(
  count: number | undefined,
): string {
  if (!count) {
    return 'w-full [&>div]:w-full @[850px]:w-fit! @[850px]:[&>div]:w-[170px]';
  }

  switch (count) {
    case 1:
      return 'w-full [&>div]:w-full @[410px]:w-auto! @[410px]:[&>div]:w-[410px] @[436px]:w-auto @[436px]:[&>div]:w-[436px]';
    case 2:
      return 'w-full [&>div]:w-full   @[872px]:w-[436px]! @[872px]:[&>div]:w-[436px]';
    default:
      return 'w-full [&>div]:w-full';
  }
}
