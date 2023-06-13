import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';

import { TodoTextComponent } from './todo-text.component';
import { TodosComponent } from './todos.component';
import { TodoAddInputComponent } from './todo-add-input.component';
import { TodoGroupListComponent } from './todo-group-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    /* Material Component */
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    /* Context menu */
    ContextMenuModule
  ],
  declarations: [
    TodoTextComponent,
    TodosComponent,
    TodoAddInputComponent,
    TodoGroupListComponent
  ],
  exports: [
    TodosComponent
  ]
})
export class TodoModule { }
