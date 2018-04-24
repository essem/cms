import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatTableModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
  ],
})
export class MaterialModule {}
