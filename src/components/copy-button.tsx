'use client';

import { useState } from 'react';

import { cn } from '~/lib/utils';

import { CheckmarkIcon, CopyIcon, IconButton } from '@0xsequence/design-system';

type CopyButtonProps = {
  className?: string;
  textToCopy: string;
} & Omit<React.ComponentProps<typeof IconButton>, 'icon'>;

function CopyButton(props: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    if (copied) return;

    void (async () => {
      await navigator.clipboard.writeText(props.textToCopy);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    })();
  }

  return (
    <IconButton
      size={props.size}
      variant={'ghost'}
      onClick={copyToClipboard}
      className={cn('flex items-center justify-center', props.className)}
      icon={copied ? CheckmarkIcon : CopyIcon}
    />
  );
}

export default CopyButton;
