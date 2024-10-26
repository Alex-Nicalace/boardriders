export function getCartSummary<T extends { quantity: number; price: number }>(
  products: T[]
) {
  const { quantityTotal, priceTotal } = products.reduce(
    (acc, item) => ({
      quantityTotal: acc.quantityTotal + item.quantity,
      priceTotal: acc.priceTotal + item.price * item.quantity,
    }),
    {
      quantityTotal: 0,
      priceTotal: 0,
    }
  );
  return { products, quantityTotal, priceTotal };
}
