export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    let alreadyExist = false;

    cart = cart.map((product) => {
      if (item._id === product._id) {
        alreadyExist = true;
        return { ...product, count: product.count + 1 };
      } else {
        return product;
      }
    });

    if (!alreadyExist) {
      cart.push({ ...item, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const getAllCartItems = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("cart"));
  }
};

export const removeItemFromCart = (productId) => {
  if (typeof window !== "undefined") {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter((item) => productId !== item._id);

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify([]));
    next && next();
  }
};
