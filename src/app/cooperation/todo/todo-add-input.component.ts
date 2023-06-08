import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoModel } from './todo.model';

@Component({
  selector: 'app-todo-add-input',
  template: `
    <button mat-icon-button color="primary" (click)="addTodo(newText)"><mat-icon>add</mat-icon></button>
    <mat-form-field style="width:100%">
      <mat-label>할일</mat-label>
      <input matInput placeholder="입력해주세요." [(ngModel)]="newText" (keyup.enter)="addTodo(newText)">
      <mat-hint align="start"><strong>입력</strong> </mat-hint>
    </mat-form-field>
    <!--<button (click)="addTodo(newText)">+</button>-->
    <!--<button (click)="addTodo(newText)">+</button><input type="text" placeholder="할 일 추가" [(ngModel)]="newText" (keyup.enter)="addTodo(newText)">-->
  `,
  styles: [`
    :host {
      display: flex;
      background-color: white;
      align-items: stretch;
    }
  `]
})
export class TodoAddInputComponent implements OnInit {

  @Input() pkTodoGroup: string = '';
  @Output() onTodoAdded = new EventEmitter<TodoModel>();
  newText: string;

  constructor() {
    this.newText = '';
  }

  ngOnInit() {
  }

  addTodo(newText: string) {
    const obj: TodoModel = {pkTodoGroup: this.pkTodoGroup, pkTodo: '', isCompleted: false, todo: newText};
    this.onTodoAdded.emit(obj);
    this.newText= '';
  }

}
