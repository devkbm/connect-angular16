import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { NzSpinModule } from 'ng-zorro-antd/spin';


import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';

import { AuthorityService } from './authority.service';
import { Authority } from './authority.model';
import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';



@Component({
  standalone: true,
  selector: 'app-authority-grid',
  imports: [ CommonModule, AgGridModule, NzSpinModule ],
  template: `
    <nz-spin nzTip="Loading..." [nzSpinning]="isLoading">
      <ag-grid-angular
        [ngStyle]="style"
        class="ag-theme-balham-dark"
        rowSelection="single"
        [rowData]="authorityList"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [getRowId]="getRowId"
        (gridSize)="test($event)"
        (gridReady)="onGridReady($event)"
        (rowClicked)="rowClickedEvent($event)"
        (rowDoubleClicked)="rowDbClicked($event)">
      </ag-grid-angular>
    </nz-spin>
  `,
  styles: [`
    nz-spin {
      height:100%
    }
    /** nz-spin component 하위 엘리먼트 크기 조정 */
    ::ng-deep .ant-spin-container.ng-star-inserted {
      height: 100%;
    }

    ::ng-deep .header-center .ag-cell-label-container { flex-direction: row; justify-content: center; }
    ::ng-deep .header-center .ag-header-cell-label { flex-direction: row; justify-content: center; }

    ::ng-deep .header-right .ag-cell-label-container { flex-direction: row; }
    ::ng-deep .header-right .ag-header-cell-label { flex-direction: row-reverse; }
    /*
    ::ng-deep .ag-theme-balham-dark .ag-header {
      font-family: cursive;
    }
    ::ng-deep .ag-theme-balham-dark .ag-header-cell {
      font-size: 18px;
    }
    */
  `]
})
export class AuthorityGridComponent extends AggridFunction implements OnInit {

  isLoading: boolean = false;
  authorityList: Authority[] = [];

  @Output() rowClicked = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  constructor(private service: AuthorityService,
              private appAlarmService: AppAlarmService) {
    super();

    this.defaultColDef = { resizable: true, sortable: true };

    this.columnDefs = [
        {
          headerName: '',
          sortable: true,
          resizable: true,
          width: 34,
          suppressSizeToFit: true,
          cellStyle: {'text-align': 'center', padding: '0px'},
          cellRenderer: ButtonRendererComponent,
          cellRendererParams: {
            onClick: this.onEditButtonClick.bind(this),
            label: '',
            iconType: 'form'
          }
        },
        {
          headerName: 'No',
          headerClass: 'header-center',
          valueGetter: 'node.rowIndex + 1',
          suppressSizeToFit: true,
          width: 70,
          cellStyle: {'text-align': 'center'}
        },
        {
          headerName: '권한ID',
          headerClass: 'header-center',
          field: 'id',
          suppressSizeToFit: true,
          width: 150
        },
        {
          headerName: '권한코드',
          field: 'authorityCode',
          suppressSizeToFit: true,
          width: 100
      },
        {
          headerName: '설명',
          field: 'description'
        }
    ];

    this.getRowId = function(params: any) {
      return params.data.id;
    };
  }

  ngOnInit() {
    this.getList();
  }

  getList(params?: any): void {
    this.isLoading = true;
    this.service
        .getAuthorityList(params)
        .subscribe(
          (model: ResponseList<Authority>) => {
            if (model.total > 0) {
              this.authorityList = model.data;
              this.sizeToFit();
            } else {
              this.authorityList = [];
            }
            this.isLoading = false;
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  rowClickedEvent(params: any): void {
    this.rowClicked.emit(params.data);
  }

  rowDbClicked(params: any): void {
    this.rowDoubleClicked.emit(params.data);
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public test(event: any): void {
    console.log(event);
  }

}
