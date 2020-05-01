const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const Product = require("../models/product");
const { handleError, handleSuccess } = require("../utils/handleResponse");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("categry", "_id name")
    .exec((err, product) => {
      if (err || !product) return handleError(res, "Could not find user!", 400);
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  const form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) return handleError(res, "Could not process image!!", 400);

    const product = new Product(fields);

    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock)
      return handleError(res, "Please include all fields!", 400);

    if (files.photo) {
      if (files.photo.size > 2097152)
        return handleError(res, "Image exceeds 2MB limit!", 400);
      // console.log(files.photo)
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, product) => {
      if (err) return handleError(res, "Could not save user!", 400);
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  const product = req.product;
  product.photo = undefined;
  return res.send(product);
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .populate("category")
    .exec((err, products) => {
      if (err) return handleError(res, "Could not fetch products!", 400);
      res.json(products);
    });
};

exports.updateProduct = (req, res) => {
  const form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) return handleError(res, "Could not process image!!", 400);

    const product = { ...req.product, ...fields };

    if (files.photo) {
      if (files.photo.size > 2097152)
        return handleError(res, "Image exceeds 2MB limit!", 400);

      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, product) => {
      if (err) return handleError(res, "Could not update user!", 400);
      res.json(product);
    });
  });
};

exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.product._id, (err, product) => {
    if (err) return handleError(res, "Could not delete product!", 400);
    else return handleSuccess(res, `Succesfully deleted ${product.name}!`);
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err || !categories)
      return handleError(res, "Could not fetch categories!", 400);

    res.json(categories);
  });
};

exports.getPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.updateInventory = (req, res, next) => {
  const bulkProductQueries = req.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    };
  });

  Product.bulkWrite(bulkProductQueries, {}, (err) => {
    if (err) return handleError(res, "Could not bulk update inventory!", 400);
    next();
  });
};
