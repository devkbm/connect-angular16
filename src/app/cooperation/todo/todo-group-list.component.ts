import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { TodoGroupModel } from './todo-group.model';

import { TodoService } from './todo.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-todo-group-list',
  template: `

    <button mat-raised-button color="primary" (click)="addTodoGroup()" style="width:100%">그룹 추가</button>
    <mat-selection-list #todoGroups [multiple]="false" hideSingleSelectionIndicator="true" color="primary"
                        (selectionChange)="selectTodoGroup(todoGroups.selectedOptions.selected[0].value)">
      <mat-list-option *ngFor="let todoGroup of todoGroupList; index as i" [value]="todoGroup.pkTodoGroup" (contextmenu)="onContextMenu($event, todoGroup)">
        {{todoGroup.todoGroupName}}
      </mat-list-option>
    </mat-selection-list>

    <div style="visibility: hidden; position: fixed"
        [style.left]="contextMenuPosition.x"
        [style.top]="contextMenuPosition.y"
        [matMenuTriggerFor]="contextMenu">
    </div>
    <mat-menu #contextMenu="matMenu">
      <ng-template matMenuContent let-item="item">
        <button mat-menu-item (click)="onContextMenuAction1(item)">Action 1</button>
        <button mat-menu-item (click)="onContextMenuAction2(item)">그룹 삭제</button>
      </ng-template>
    </mat-menu>

    <!--
    <button (click)="addTodoGroup()">add</button>
    <div *ngFor="let todoGroup of todoGroupList; index as i" (click)="selectTodoGroup(todoGroup.pkTodoGroup)">
      <label>{{todoGroup.todoGroupName}}</label>
    </div>
    -->
  `,
  styles: []
})
export class TodoGroupListComponent implements OnInit {

  @Output() onSelectedTodoGroup = new EventEmitter<string>();

  todoGroupList: TodoGroupModel[] = [];

  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };


  constructor(private service: TodoService) { }

  ngOnInit() {
    this.getTodoGroupList();
  }

  addTodoGroup(): void {
    this.service.newTodoGroup()
                .subscribe(
                  (model: ResponseObject<TodoGroupModel>) => {
                    if (model === null || model === undefined) return;

                    this.todoGroupList.push(model.data);
                    this.onSelectedTodoGroup.emit(model.data.pkTodoGroup);
                  });
  }

  getTodoGroupList(): void {
    this.service.getMyTodoGroupList()
                .subscribe(
                  (model: ResponseList<TodoGroupModel>) => {
                    if (model === null || model === undefined) return;
                    console.log(model);
                    this.todoGroupList = model.data;
                  }
                );
  }

  selectTodoGroup(pkTodoGroup: string): void {
    this.onSelectedTodoGroup.emit(pkTodoGroup);
  }

  onContextMenu(event: MouseEvent, item: TodoGroupModel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': item };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuAction1(item: TodoGroupModel) {
    alert(`Click on Action 1 for ${item.pkTodoGroup}`);
  }

  onContextMenuAction2(item: TodoGroupModel) {
    alert(`Click on Action 2 for ${item.pkTodoGroup}`);
  }
}
