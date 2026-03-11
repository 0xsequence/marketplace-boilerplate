import SvgGridOutlineIcon from '~/components/icons/grid-outline-icon';

import { useOpenConnectModal } from '@0xsequence/connect';
import { Button, WalletIcon } from '@0xsequence/design-system';
import { Text } from '@0xsequence/design-system';

const ConnectWalletPrompt = () => (
  <div
    className="flex flex-col gap-4 w-full items-center justify-center"
    style={{
      height: 'calc(100vh - var(--headerHeight) - 80px)',
    }}
  >
    <SvgGridOutlineIcon className="w-7 h-7 text-muted" />

    <Text className="text-sm text-muted font-bold">
      Sign in to view your inventory
    </Text>

    <ConnectButton />
  </div>
);

const ConnectButton = () => {
  const { setOpenConnectModal } = useOpenConnectModal();

  const handleClick = () => {
    setOpenConnectModal(true);
  };

  return (
    <Button onClick={handleClick} variant="primary" shape="circle">
      <WalletIcon className="mr-2" />
      Connect wallet
    </Button>
  );
};

export default ConnectWalletPrompt;
