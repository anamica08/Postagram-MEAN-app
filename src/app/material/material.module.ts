import { NgModule } from '@angular/core';
import{ MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import{MatCardModule}from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import{MatBadgeModule} from '@angular/material/badge'
import {MatSidenavModule} from '@angular/material/sidenav'
import{MatListModule} from '@angular/material/list'
import{MatGridListModule} from '@angular/material/grid-list'
import {MatSelectModule} from '@angular/material/select'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';

import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
const MaterialComponents =[
  MatButtonModule,
  MatToolbarModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatCardModule,
  MatDialogModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,MatButtonModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatBadgeModule,
  MatSidenavModule,
  
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatOptionModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  
  MatChipsModule,
  MatTooltipModule,
  

];

@NgModule({
  
  imports: [
    MaterialComponents
  ],exports:
  [
    MaterialComponents
  ]
})
export class MaterialModule { }
