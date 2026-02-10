const listPosts = require("../data/posts");

function index(req, res) {
  let filteredPost = listPosts;

  /*if (req.query.tags) {
    filteredPost = listPosts.filter(
      (post) => post.tags.includes(req.query.tags),
      res.json(filteredPost),
      NON MI ESCE DOPO RIPROVO
    );*/

  res.json(listPosts);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const post = listPosts.find((post) => post.id === id);
  if (!post) {
    res.status(404).json({ error: "Post non trovato" });
  }
  res.json(post);
}

function store(req, res) {
  res.send("Nuovo post");
}

function modify(req, res) {
  const id = parseInt(req.params.id);
  const post = listPosts.find((post) => post.id === id);
  if (!post) {
    res.status(404).json({ error: "Post non trovato" });
  }

  res.send(`Modifica post integrale ${id}`);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const post = listPosts.find((post) => post.id === id);
  if (!post) {
    res.status(404).json({ error: "Post non trovato" });
  }

  res.send(`Modifica post parziale ${id}`);
}
function destroy(req, res) {
  const id = parseInt(req.params.id);
  const post = listPosts.find((post) => post.id === id);

  if (!post) {
    res.status(404).json({ error: "Post non trovato" });
  }

  listPosts.splice(listPosts.indexOf(post), 1);

  res.status(204).json(`Eliminazione post ${id}`);
}

module.exports = { index, show, store, modify, update, destroy };
