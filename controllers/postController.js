const listPosts = require("../data/posts");
const { connect } = require("../routes/routesPost");

function index(req, res) {
  let filteredPosts = listPosts;
  const tag = req.query.tag?.toLowerCase().trim();
  if (tag) {
    filteredPosts = listPosts.filter((post) =>
      post.tags.some((t) => {
        console.log(t.toLowerCase().trim());
        t.toLowerCase().trim() === tag;
      }),
    );
  }
  res.json(filteredPosts);
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
  //restituisco un nuovo id, prendendo l'ultimo id dell'array+1
  const newId = listPosts[listPosts.length - 1].id + 1;
  // check console.log(newId);
  //creazione del nuovo ogg che passerò tramite postman
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
  };
  //pusho il nuovo post creato nell'array diu obj in listPost e restituisco 201
  listPosts.push(newPost);
  console.log(listPosts);
  res.send("Nuovo post");
  res.sed(201);
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
