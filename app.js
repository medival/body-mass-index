const express = require('express');
const bodyParser = require('body-parser');
const mainRoutes = require('./src/routes/main');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Implement CICD using Jenkins' });
});

app.use('/', mainRoutes);

const port = 5000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on localhost port ${port}`);
});
