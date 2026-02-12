const listPosts = require("../data/posts");
const { connect } = require("../routes/routesPost");

function index(req, res) {
  //per la query ho creato un nuovo array con let che possa essere messo in comparazione con l'array di obj originali

  let filteredPosts = listPosts;
  //per non ripetere req.query.tag e le altre cose ho salvato tutto in una const
  //ho usato lowercase per normalizzare e replace metodo che ho trovato su internet per togliere gli spazi e normalizzare ulteriormente
  //ho letto un po' e dovrebbe essere rimuovere lo spazio globalmente

  const tag = req.query.tag.toLowerCase().replace(/\s+/g, "");
  if (tag) {
    //ho filtrato l'array per riavere gli obj di mio interesse col tag specifico
    filteredPosts = listPosts.filter((post) => {
      //creo dei tag normalizzati
      const normalizedTags = post.tags.map((t) =>
        t.toLowerCase().replace(/\s+/g, ""),
      );
      //confronto e vedo se sono inclusi
      return normalizedTags.includes(tag);
    });
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
  //status 201 per creazione nuovo elemento
  res.status(201);
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
