const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id, (err, category) => {
    if (err || !category) {
      return res.status(400).json({
        err: "Category not found!",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "Could not save category!",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        err: "Could not get categories!",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      res.status(400).json({
        err: "Could not update Category!",
      });
    }
    res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "Could not delete category!",
      });
    }
    res.json({
      msg: `Deleted ${category.name} category!`,
    });
  });
};
