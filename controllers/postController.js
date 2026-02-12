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

//RIUTILIZZO DELLA LOGICA PUT PER UNA MODIFICA NON COMPLETA DEL OBJ
function modify(req, res) {
  const id = parseInt(req.params.id);
  const post = listPosts.find((post) => post.id === id);
  if (!post) {
    res.status(404).json({ error: "Post non trovato" });
  }

  post.title = req.body.title;
  post.tags = req.body.tags;

  console.log(listPosts);
  res.send(post);
}

function update(req, res) {
  //salvo l'id per confrontare che esiste
  const id = parseInt(req.params.id);
  //salvo una variabile post che passa nel find per checkare l'id
  const post = listPosts.find((post) => post.id === id);
  //se l'id non viene trovato e sarà undefined
  //console.log(post);
  //se è "non post", quindi non corrisponde, gestisco l'errore
  if (!post) {
    res.status(404).json({ error: "Post non trovato" });
  }

  //riassegno qua i valori tramite le req
  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  console.log(listPosts);
  res.send(post);
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
