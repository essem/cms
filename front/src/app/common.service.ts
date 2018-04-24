import * as _ from 'lodash';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  constructor() {}

  getRoots() {
    const entries: [string, ITable][] = _.entries(database);
    const rootEntries: [string, ITable][] = entries.filter(entry => entry[1].display);
    return rootEntries.map(entry => ({ display: entry[1].display, name: entry[0] }));
  }

  expandLink(col: ICol, row: any) {
    // console.log('expandLink', col, row)
    const targetId: number = row[col.name];
    const targetTable: ITable = database[col.table];
    const targetRow: any = _.cloneDeep(targetTable.rows.find(r => r.id === targetId));
    const display: string = targetRow[targetTable.title];
    row[col.name] = { display, id: targetId };
  }

  expandChildren(col: ICol, row: any) {
    // console.log('expandChildren', col, row)
    const childTable: ITable = database[col.table];
    const parentName: string = childTable.cols.find(c => c.type === 'parent').name;
    const childCols: ICol[] = childTable.cols;
    const childRows: any[] = _.cloneDeep(childTable.rows.filter(r => r[parentName] === row.id));
    childRows.forEach((childRow) => {
      this.expandRow(childCols, childRow);
    });
    row[col.name] = {
      cols: childCols,
      rows: childRows,
    };
  }

  expandRow(cols: ICol[], row: any) {
    // console.log('expandRow', cols, row)
    cols.forEach((col) => {
      switch (col.type) {
        case 'link':
          this.expandLink(col, row);
          break;
        case 'children':
          this.expandChildren(col, row);
          break;
      }
    });
  }

  getList(tableName: string): ITable {
    const table: ITable = _.cloneDeep(database[tableName]);
    table.rows.forEach((row) => {
      this.expandRow(table.cols, row);
    });
    return table;
  }

  getDetail(tableName: string, id: number) {
    const table: ITable = database[tableName];
    const cols: ICol[] = table.cols;
    const row: any = _.cloneDeep(table.rows.find(r => r.id === id));
    this.expandRow(table.cols, row);
    return {
      cols,
      row,
      display: table.display,
      title: table.title,
    };
  }
}

interface ICol {
  type: string;
  name: string;
  display?: string;
  table?: string;
}

interface ITable {
  display?: string;
  title?: string;
  cols: ICol[];
  rows: any[];
}

/* tslint:disable:max-line-length */
const database = {
  npcCategories: {
    display: 'Npc categories',
    title: 'name',
    cols: [
      {
        type: 'id',
        name: 'id',
        display: 'Id',
      },
      {
        type: 'string',
        name: 'name',
        display: 'Name',
      },
      {
        type: 'string',
        name: 'description',
        display: 'Description',
      },
    ],
    rows: [
      { id: 1, name: 'Undead', description: 'The undead are beings that have died and have had their souls trapped between life and death.' },
      { id: 2, name: 'Humanoids', description: 'A humanoid usually has two arms, two legs, and one head, or a human-like torso, and a head. ' },
    ],
  },
  npcs: {
    display: 'Npcs',
    title: 'name',
    cols: [
      {
        type: 'id',
        name: 'id',
        display: 'Id',
      },
      {
        type: 'string',
        name: 'name',
        display: 'Name',
      },
      {
        type: 'integer',
        name: 'level',
        display: 'Level',
      },
      {
        type: 'link',
        name: 'categoryId',
        table: 'npcCategories',
        display: 'Category',
      },
      {
        type: 'children',
        name: 'dropItems',
        table: 'npcDropItems',
        display: 'Drop items',
      },
    ],
    rows: [
      { id: 1, name: 'Baroness Anastari', level: 51, categoryId: 1 },
      { id: 2, name: 'Nerub\'enkan', level: 51, categoryId: 1 },
      { id: 3, name: 'Maleki the Pallid', level: 62, categoryId: 2 },
      { id: 4, name: 'Magistrate Barthilas', level: 51, categoryId: 1 },
      { id: 5, name: 'Ramstein the Gorger', level: 51, categoryId: 1 },
      { id: 6, name: 'Lord Aurius Rivendare', level: 51, categoryId: 1 },
    ],
  },
  items: {
    display: 'Items',
    title: 'name',
    cols: [
      {
        type: 'id',
        name: 'id',
        display: 'Id',
      },
      {
        type: 'string',
        name: 'name',
        display: 'Name',
      },
      {
        type: 'type',
        name: 'type',
        display: 'Type',
      },
    ],
    rows: [
      { id: 1, name: 'Shadowy Laced Handwraps', type: 'Cloth Armor' },	
      { id: 2, name: 'Screeching Bow', type: 'Bow' },
      { id: 3, name: 'Anastari Heirloom', type: 'Amulet' },
      { id: 4, name: 'Banshee Finger', type: 'Wand' },
      { id: 5, name: 'Chillhide Bracers', type: 'Leather Armor' },
      { id: 6, name: 'Windshrieker Pauldrons', type: 'Mail Armor' },
      { id: 7, name: 'Banshee\'s Touch', type: 'Plate Armor' },      
    ],
  },
  npcDropItems: {
    cols: [
      {
        type: 'id',
        name: 'id',
        display: 'Id',
      },
      {
        type: 'parent',
        name: 'npcId',
      },
      {
        type: 'link',
        name: 'itemId',
        table: 'items',
        display: 'Item',
      },
      {
        type: 'integer',
        name: 'amount',
        display: 'Amount',
      },
    ],
    rows: [
      { id: 1, npcId: 1, itemId: 1, amount: 3 },
      { id: 2, npcId: 1, itemId: 2, amount: 5 },
    ],
  },
};
