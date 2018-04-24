import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-common-detail',
  templateUrl: './common-detail.component.html',
  styleUrls: ['./common-detail.component.css'],
})
export class CommonDetailComponent implements OnInit {
  tableName: string;
  id: number;
  detail;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) {}

  ngOnInit() {
    this.tableName = this.route.snapshot.paramMap.get('table');
    this.id = +this.route.snapshot.paramMap.get('id');
    this.updateDetail();

    this.route.paramMap.subscribe((params) => {
      this.tableName = params.get('table');
      this.id = +params.get('id');
      this.updateDetail();
    });
  }

  updateDetail() {
    this.detail = this.commonService.getDetail(this.tableName, this.id);
  }
}
