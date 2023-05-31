import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';

import { BizCode } from './biz-code.model';
import { BizCodeService } from './biz-code.service';
import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';

@Component({
  selector: 'app-biz-code-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="_list"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      (gridReady)="onGridReady($event)"
      (rowClicked)="rowClickedFunc($event)"
      (rowDoubleClicked)="rowDoubleClickedFunc($event)">
    </ag-grid-angular>
  `,
  styles: []
})
export class BizCodeGridComponent extends AggridFunction implements OnInit {

  _list: BizCode[] = [];

  @Output() rowClickedEvent = new EventEmitter();
  @Output() rowDoubleClickedEvent = new EventEmitter();
  @Output() editButtonClickedEvent = new EventEmitter();

  constructor(private service: BizCodeService,
              private appAlarmService: AppAlarmService) {

    super();

    this.columnDefs = [
      {
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', 'padding': '0px'},
        cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: '',
          iconType: 'form'
        }
      },
      {
        headerName: 'No',
        valueGetter: 'node.rowIndex + 1',
        width: 70,
        cellStyle: {'text-align': 'center'}
      },
      { headerName: '분류ID',       field: 'typeId',        width: 100 },
      { headerName: '코드',         field: 'code',          width: 200 },
      { headerName: '코드명',       field: 'codeName',      width: 200 },
      { headerName: '사용여부',     field: 'useYn',         width: 200 },
      { headerName: '순번',         field: 'sequence',      width: 50 },
      { headerName: '비고',         field: 'comment',       width: 400 }
    ];

    this.getRowId = (params: any) => {
        return params.data.typeId + params.data.code;
    };
  }

  ngOnInit(): void {
  }

  getList(typeId: string): void {
    this.service
        .getList(typeId)
        .subscribe(
          (model: ResponseList<BizCode>) => {
              if (model.total > 0) {
                  this._list = model.data;
              } else {
                  this._list = [];
              }
              this.appAlarmService.changeMessage(model.message);
          }
        );

  }

  rowClickedFunc(event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();
    this.rowClickedEvent.emit(selectedRows[0]);
  }

  rowDoubleClickedFunc(event: any): void {
    this.rowDoubleClickedEvent.emit(event.data);
  }

  onEditButtonClick(e: any): void {
    this.editButtonClickedEvent.emit(e.rowData);
  }

}

