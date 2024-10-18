export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  state.taxPrice = addDecimals(0.15 * state.itemsPrice);

  state.deliveryPrice = state.deliveryAddress.deliveryPrice || 0;

  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
    Number(state.taxPrice) +
    Number(state.deliveryPrice) 
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
