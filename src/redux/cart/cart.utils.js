export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.lightNovelId === cartItemToAdd.lightNovelId
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.lightNovelId === cartItemToAdd.lightNovelId
        ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
        : cartItem
    );
  }

  const {
    description,
    createDateTime,
    updateDateTime,
    ...cartItemToAddTransformed
  } = cartItemToAdd;

  return [...cartItems, { ...cartItemToAddTransformed, cartQuantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.lightNovelId === cartItemToRemove.lightNovelId
  );

  if (existingCartItem.cartQuantity === 1) {
    return cartItems.filter(
      cartItem => cartItem.lightNovelId !== cartItemToRemove.lightNovelId
    );
  } else {
    return cartItems.map(cartItem =>
      cartItem.lightNovelId === cartItemToRemove.lightNovelId
        ? { ...cartItem, cartQuantity: cartItem.cartQuantity - 1 }
        : cartItem
    );
  }
};
