const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const logging = require('./logging');
const bodyParser = require('body-parser');
const models = require('./models');
const Produto = models.Produto;
const Fabricante = models.Fabricante;
app.use(logging);
app.use(bodyParser.json());

app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  Produto.findOne({
    where: { id }
  }).then((produto) => {
    if (produto) {
      res.json(produto);
    } else {
      res.json({ msg: "O produto não existe." });
    }
  }).catch((err) => {
      res.json(err);
    })
});

app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  Produto.destroy({
    where: { id }
  }).then((produto) => {
    if (produto) {
      res.json(produto);
    } else {
      res.json({ msg: "O produto não existe." });
    }
  }).catch((err) => {
      res.json(err);
    })
});

app.put('/produtos', (req, res) => {
  const { nome, codigo, preco, fabricanteId } = req.body;
  const parametros = {};

  if (nome) parametros.nome = nome;
  if (codigo) parametros.codigo = codigo;
  if (preco) parametros.preco = preco;
  if (fabricanteId) parametros.fabricanteId = fabricanteId;

  Produto.update(parametros, {
    where: { id: req.body.id }
  }).then((produto) => {
    if (produto) {
      res.json(produto);
    } else {
      res.json({ msg: "O produto não existe." });
    }
  }).catch((err) => {
      res.json(err);
    })
})

app.get('/produtos', (req, res) => {
  Produto.findAll({
    attributes: [ 'nome', 'codigo', 'preco' ]
  })
    .then((produtos) => {
      res.json(produtos);
    }).catch((err) => {
      res.json(err);
    })
});

app.get('/fabricantes', (req, res) => {
  Fabricante.findAll({
    attributes: [ 'nome' ]
  })
    .then((fabricantes) => {
      res.json(fabricantes);
    }).catch((err) => {
      res.json(err);
    })
});

app.post('/fabricantes', (req, res) => {
  if (req.body.hasOwnProperty('nome')) {
    const { nome } = req.body;

    Fabricante.create({ nome })
      .then((fabricante) => {
        res.json(fabricante);
      }).catch((err) => {
        res.json(err);
      });
  } else {
    res.status(422).json({ mensagem: "É necessário especificar nome para o cadastro." });
  }
});

app.post('/produtos', (req, res) => {
  if (req.body.hasOwnProperty('nome') && 
  req.body.hasOwnProperty('codigo') && 
  req.body.hasOwnProperty('preco') &&
  req.body.hasOwnProperty('fabricante')) {
    const {nome, codigo, preco, fabricante} = req.body;

    Produto.create({
      nome, codigo, preco,
      fabricante: {
        nome: fabricante
      }
    }, {
      include: [ Produto.Fabricante ]
    }).then((produto) => {
      res.json(produto);
    }).catch((err) => {
      res.json(err);
    });
  } else {
    res.status(422).json({ mensagem: "É necessário especificar nome, código e preço do produto para o cadastro." });
  }
});

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}.`);
  });
});
