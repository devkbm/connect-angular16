import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoModel } from './todo.model';

@Component({
  selector: 'app-todo-input',
  template: `
    <input type="checkbox" [checked]="todo.isCompleted" (click)="changeState()"> <label (click)="changeState()"> {{ todo.todo }} </label>
    <button (click)="deleteTodo()">삭제</button>
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
      color: darkgray;
      background-color: white;
    }

    input {
      position: relative;
    }

    input:before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 20px;
      position: absolute;
      top: -3px;
      left: -6px;
      border: 1px solid darkgray;
    }

    input:checked:after {
      content: '\\2713';
      display: inline-block;
      font-size: 12px;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      position: absolute;
      top: -3px;
      left: -6px;
      border: 1px solid darkgray;
      backgroud-color: darkgray;
      text-align: center;
      color: red;
    }

    input:checked + label {
      text-decoration: line-through;
    }
  `]
})
export class TodoInputComponent implements OnInit {

  @Input({required: true}) todo!: TodoModel;
  @Output() stateChanged = new EventEmitter();
  @Output() deleteClicked = new EventEmitter<TodoModel>();

  constructor() {}

  ngOnInit() {
  }

  changeState() {
    this.todo.isCompleted = !this.todo.isCompleted;
    this.stateChanged.emit(this.todo);
  }

  deleteTodo() {
    this.deleteClicked.emit(this.todo);
  }


}
