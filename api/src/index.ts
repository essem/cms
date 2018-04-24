import * as fs from 'fs';
import * as _ from 'lodash';
import * as express from 'express';
import * as cors from 'cors';
import * as JSON5 from 'json5';
import { ITable, ICol } from 'cms-lib';

const app = express();

app.use(cors()); // only for development

// TODO: need cache or something (and decide clone or not)
function loadData(name: string): ITable {
  const data = fs.readFileSync(`${__dirname}/../db/${name}.json5`, 'utf8');
  return JSON5.parse(data);
}

function expandLink(col: ICol, row: any) {
  // console.log('expandLink', col, row)
  const targetId: number = row[col.name];
  const targetTable: ITable = loadData(col.table);
  const targetRow: any = _.cloneDeep(targetTable.rows.find(r => r.id === targetId));
  const display: string = targetRow[targetTable.title];
  row[col.name] = { display, id: targetId };
}

function expandChildren(col: ICol, row: any) {
  // console.log('expandChildren', col, row)
  const childTable: ITable = loadData(col.table);
  const parentName: string = childTable.cols.find(c => c.type === 'parent').name;
  const childCols: ICol[] = childTable.cols;
  const childRows: any[] = _.cloneDeep(childTable.rows.filter(r => r[parentName] === row.id));
  childRows.forEach((childRow) => {
    expandRow(childCols, childRow);
  });
  row[col.name] = {
    cols: childCols,
    rows: childRows,
  };
}

function expandRow(cols: ICol[], row: any) {
  // console.log('expandRow', cols, row)
  cols.forEach((col) => {
    switch (col.type) {
      case 'link':
        expandLink(col, row);
        break;
      case 'children':
        expandChildren(col, row);
        break;
    }
  });
}

app.get('/roots', (req, res) => {
  res.send([
    { display: 'Npcs', name: 'npcs' },
    { display: 'Npc categories', name: 'npcCategories' },
    { display: 'Items', name: 'items' },
  ]);
});

app.get('/common/:data', (req, res) => {
  const data: ITable = loadData(req.params.data);
  data.rows.forEach((row) => {
    expandRow(data.cols, row);
  });
  res.send(data);
});

app.get('/common/:data/:id', (req, res) => {
  const id = +req.params.id;
  const data = loadData(req.params.data);
  const cols = data.cols;
  const row = data.rows.find(row => row.id === id);
  expandRow(data.cols, row);
  res.send({
    cols,
    row,
    display: data.display,
    title: data.title,
  });
});

app.get('/', (req, res) => {
  res.send('cms-api is working!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
