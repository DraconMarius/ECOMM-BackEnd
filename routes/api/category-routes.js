const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const catData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }]
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// api/categories/(id)
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    // be sure to include its associated Products
    const id = req.params.id;
    const catData = await Category.findByPk(id, {
      include: [{ model: Product }]
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(`${newCat.category_name} has been created`)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const id = req.params.id;
    const newName = req.body.category_name;
    const updCat = await Category.update(
      {
        category_name: newName
      },
      {
        where: {
          id: id
        }
      }
    );
    res.status(200).json(`ID: ${id}'s name changed to ${newName}`)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    let catId = req.params.id
    const destroyed = await Category.destroy(
      {
        where: {
          id: catId
        }
      }
    );
    res.status(200).json(`ID: ${req.params.id} and its associated products have been deleted`)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
