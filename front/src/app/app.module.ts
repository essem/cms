import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

import { CommonService } from './common.service';

import { AppComponent } from './app.component';
import { CommonListComponent } from './common-list/common-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { CommonDetailComponent } from './common-detail/common-detail.component';
import { FieldComponent } from './field/field.component';
import { FieldsComponent } from './fields/fields.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CommonListComponent,
    CommonDetailComponent,
    FieldComponent,
    FieldsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    CommonService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
