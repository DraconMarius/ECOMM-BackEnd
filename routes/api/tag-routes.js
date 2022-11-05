const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      includes: [{ model: Product }, { model: ProductTag }]
    })
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id` //skipping params in variable//
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      includes: [{ model: Product }, { model: ProductTag }]
    })
    res.status(200).json(tagData)
  } catch {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(`${newTag.tag_name} has been created`)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag by its `id` value
  try {
    const id = req.params.id;
    const newName = req.body.tag_name;
    const updTag = await Tag.update(
      {
        tag_name: newName
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
  // delete a tag by its `id` value
  try {
    const id = req.params.id;
    const updTag = await Tag.destroy(
      {
        where: {
          id: id
        }
      }
    );
    res.status(200).json(`ID: ${id} has been deleted`)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
