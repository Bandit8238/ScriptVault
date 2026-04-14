const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let scripts = [];

// get all scripts
router.get('/', (req, res) => {
  res.json(scripts);
});

// upload script
router.post('/', (req, res) => {
  const { name, code, category } = req.body;

  const newScript = {
    id: uuidv4(),
    name,
    code,
    category,
    rating: 0,
    votes: 0
  };

  scripts.push(newScript);
  res.json(newScript);
});

// rate script
router.post('/:id/rate', (req, res) => {
  const { rating } = req.body;
  const script = scripts.find(s => s.id === req.params.id);

  if (!script) return res.status(404).send('Not found');

  script.rating =
    (script.rating * script.votes + rating) / (script.votes + 1);

  script.votes++;

  res.json(script);
});

module.exports = router;
