import * as fs from 'fs';
import * as express from 'express';
import * as JSON5 from 'json5';

const app = express();

function loadData(name: string) {
  const data = fs.readFileSync(`${__dirname}/../db/${name}.json5`);
  return JSON5.parse(data);
}

app.get('/common/:data', (req, res) => {
  const data = loadData(req.params.data);
  res.send(data);
});

app.get('/common/:data/:id', (req, res) => {
  const id = +req.params.id;
  const data = loadData(req.params.data);
  const row = data.rows.find(row => row.id === id);
  res.send(row);
});

app.get('/', (req, res) => {
  res.send('cms-api is working!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
