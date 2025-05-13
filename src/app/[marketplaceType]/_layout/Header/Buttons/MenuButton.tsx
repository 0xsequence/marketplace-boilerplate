'use client';

import { useHeaderDrawer } from '../Drawer/HeaderDrawerContext';
import { IconButton, MenuIcon } from '@0xsequence/design-system';

const WhiteMenuIcon = () => {
  return <MenuIcon className="text-primary" />;
};

const MenuButton = () => {
  const { setOpen } = useHeaderDrawer();

  function openDrawer() {
    setOpen(true);
    document.body.style.overflow = 'hidden';
  }

  return (
    <IconButton
      onClick={openDrawer}
      icon={WhiteMenuIcon}
      size="sm"
      className="rounded-lg bg-button-glass hover:bg-button-glass/80 md:hidden!"
    />
  );
};

export default MenuButton;
