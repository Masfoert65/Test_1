const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const models = require('./models');

const app = express();
app.use(bodyParser.json());

app.post('/article/', async (req, res) => {
  const { title, content } = req.body;
  const article = await models.Article.create({ title, content });
  res.status(201).json(article);
});

app.get('/article/:id/', async (req, res) => {
  const article = await models.Article.findByPk(req.params.id);
  res.json(article);
});

app.get('/articles/', async (req, res) => {
  const articles = await models.Article.findAll();
  res.json(articles);
});

app.patch('/article/:id/', async (req, res) => {
  const { title, content } = req.body;
  await models.Article.update({ title, content }, { where: { id: req.params.id } });
  res.sendStatus(204);
});

app.delete('/article/:id/', async (req, res) => {
  await models.Article.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

// CRUD для комментариев
app.post('/article/:id/comment/', async (req, res) => {
  const { text } = req.body;
  const comment = await models.Comment.create({ text, articleId: req.params.id });
  res.status(201).json(comment);
});

app.get('/article/:id/comment/:commentId/', async (req, res) => {
  const comment = await models.Comment.findByPk(req.params.commentId);
  res.json(comment);
});

app.get('/article/:id/comments/', async (req, res) => {
  const comments = await models.Comment.findAll({ where: { articleId: req.params.id } });
  res.json(comments);
});

app.patch('/article/:id/comment/:commentId/', async (req, res) => {
  const { text } = req.body;
  await models.Comment.update({ text }, { where: { id: req.params.commentId } });
  res.sendStatus(204);
});

app.delete('/article/:id/comment/:commentId/', async (req, res) => {
  await models.Comment.destroy({ where: { id: req.params.commentId } });
  res.sendStatus(204);
});

// Аналитика комментариев
app.get('/analytic/comments/', async (req, res) => {
  const { dateFrom, dateTo } = req.query;
  const comments = await models.Comment.findAll({
    where: {
      createdAt: {
        [Sequelize.Op.between]: [new Date(dateFrom), new Date(dateTo)]
      }
    },
    include: [{ model: models.Article, as: 'article' }]
  });
  res.json(comments);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await models.sequelize.sync();
  console.log(`Server is running on port ${PORT}`);
});
