module.exports = (User, db) => {
  User.prototype.getCart = async function () {
    const where = {
      userId: this.id,
      status: "processing",
    };
    const LineItem = db.models.lineItem;
    const Order = db.models.order;
    const Product = db.models.product;
    let cart = await Order.findOne({ where });
    if (!cart) {
      cart = await Order.create(where);
    }
    return Order.findByPk(cart.id, {
      include: [{ model: LineItem, include: [Product] }],
    });
  };

  User.prototype.removeFromCart = async function (product) {
    const cart = await this.getCart();
    let lineItem = cart.lineItems.find(
      (lineItem) => lineItem.productId === product.id
    );
    lineItem.orderQuantity--;
    if (lineItem.orderQuantity) {
      await lineItem.save();
    } else {
      await lineItem.destroy();
    }
    return this.getCart();
  };

  User.prototype.addToCart = async function (product) {
    const cart = await this.getCart();
    let lineItem = cart.lineItems.find(
      (lineItem) => lineItem.productId === product.id
    );
    if (lineItem) {
      lineItem.orderQuantity++;
      await lineItem.save();
    } else {
      await db.models.lineItem.create({
        productId: product.id,
        orderId: cart.id,
      });
    }
    return this.getCart();
  };

  //#assuming cart exists && check status accuracy
  /* create router post for create order 35:00
   */
  User.prototype.createOrder = async function () {
    const cart = await this.getCart();
    cart.status = "completed";
    await cart.save();
    return this.getCart();
  };
};
