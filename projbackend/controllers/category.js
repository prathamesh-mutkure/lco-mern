const Category = require("../models/category");

const { handleError, handleSuccess } = require("../utils/handleResponse");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id, (err, category) => {
    if (err || !category) return handleError(res, "Category not found!", 400);
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) return handleError(res, "Could not save category!", 400);
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) return handleError(res, "Could not get categories!", 400);
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) handleError(res, "Could not update Category!", 400);
    res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) handleError(res, "Could not delete category!", 400);
    handleSuccess(res, `Deleted ${category.name} category!`);
  });
};
