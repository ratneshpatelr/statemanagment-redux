const products = [
  { id: 1, name: "tshirt", price: 300 },
  { id: 2, name: "jeans", price: 600 },
  { id: 3, name: "undergarments", price: 150 },
  { id: 4, name: "sweater", price: 300 },
];

export function fetchproducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  });
}
