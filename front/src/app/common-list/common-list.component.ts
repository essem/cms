import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CommonService } from '../common.service';
import { ITable } from 'cms-lib';

@Component({
  selector: 'app-common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.css'],
})
export class CommonListComponent implements OnInit {
  tableName: string;
  data: ITable;
  dataSource: MatTableDataSource<any>;
  columns: string[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) {}

  ngOnInit() {
    this.tableName = this.route.snapshot.paramMap.get('table');

    this.route.paramMap.subscribe((params) => {
      this.tableName = params.get('table');
      this.updateList();
    });
  }

  updateList() {
    this.commonService.getList(this.tableName).subscribe((data) => {
      this.data = data;
      this.dataSource = new MatTableDataSource(this.data.rows);
      this.columns = this.data.cols.map(s => s.name);
    });
  }

  handleRowClick(row) {
    this.router.navigate([`common/${this.tableName}/${row.id}`]);
  }
}
