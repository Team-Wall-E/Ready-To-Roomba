const orders = [
  {
    isAuthenticated: false,
    items: [],
    orderTotal: 500,
    quantity: 3,
    status: "processing",
  },
  {
    isAuthenticated: true,
    items: [],
    price: 1000,
    quantity: 2,
    status: "completed",
  },
  {
    isAuthenticated: false,
    items: [],
    price: 500,
    quantity: 3,
    status: "completed",
  },
];

module.exports = orders;