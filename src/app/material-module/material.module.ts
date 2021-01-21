import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatTableModule, MatCardModule, MatToolbarModule, MatFormFieldModule, MatPaginatorModule,
    MatIconModule, MatRadioModule, MatInputModule, MatButtonModule, MatChipsModule
  ],
  exports: [
    MatTableModule, MatCardModule, MatToolbarModule, MatFormFieldModule, MatPaginatorModule, MatIconModule,
    MatRadioModule, MatInputModule, MatButtonModule, MatChipsModule
  ],
})
export class MaterialModule { }
