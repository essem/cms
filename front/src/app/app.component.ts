import { Component } from '@angular/core';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'CMS';
  roots = [];

  constructor(
    private commonService: CommonService,
  ) {}

  ngOnInit() {
    this.roots = this.commonService.getRoots();
  }
}
