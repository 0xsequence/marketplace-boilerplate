'use client';

import { useState } from 'react';

import { Button, Box, cn, CartIcon, Text } from '$ui';

export const OrderCartButton = () => {
  return (
    <Button
      className="relative backdrop-blur"
      variant="muted"
      aria-label="Cart"
      // onClick={() => toggleCart()}
    >
      <CartIcon />
      <CartItemsBadge />
    </Button>
  );
};
const CartItemsBadge = () => {
  // const { cartItems } = useSnapshot(cartState);
  const [animate, setAnimate] = useState(false);

  // useEffect(() => {
  //   if (cartItems.length) {
  //     setAnimate(true);
  //     setTimeout(() => setAnimate(false), 500);
  //   }
  // }, [cartItems.length]);

  // if (!cartItems.length) return null;

  return (
    <Box
      className={cn(
        'absolute right-1 top-1',
        'bg-primary rounded-full',
        animate ? 'animate-ping' : '',
        // cartItems.length < 10 ? 'px-[8px]' : 'px-[5px]',
      )}
    >
      <Text className="text-primary-foreground text-[10px]">
        {/* {cartItems.length} */}
      </Text>
    </Box>
  );
};