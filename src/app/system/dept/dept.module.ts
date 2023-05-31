import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from 'src/app/core/interceptor/custom-http-interceptor';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';

/* Inner Component */
import { DeptService } from './dept.service';
import { DeptComponent } from './dept.component';
import { DeptFormComponent } from './dept-form.component';
import { DeptTreeComponent } from './dept-tree.component';
import { DeptSelectComponent } from './dept-select.component';
import { CheckableDeptTreeComponent } from './checkable-dept-tree.component';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';
import { NzInputDateComponent } from 'src/app/shared/nz-input-date/nz-input-date.component';
import { NzInputNumberCustomComponent } from 'src/app/shared/nz-input-number-custom/nz-input-number-custom.component';
import { NzPageHeaderCustomComponent } from 'src/app/shared/nz-page-header-custom/nz-page-header-custom.component';



const nzModules = [
  NzLayoutModule,
  NzGridModule,
  NzFormModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzInputModule,
  NzDrawerModule,
  NzDividerModule,
  NzTreeModule,
  NzTabsModule,
  NzInputNumberModule,
  NzTreeSelectModule,
  NzButtonModule,
  NzIconModule,
  NzDatePickerModule,
  NzPopconfirmModule,
  NzBreadCrumbModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    AgGridModule,
    nzModules,
    NzInputTextComponent,
    NzInputTextareaComponent,
    NzInputDateComponent,
    NzInputNumberCustomComponent,
    NzPageHeaderCustomComponent
  ],
  declarations: [
    DeptFormComponent,
    DeptTreeComponent,
    DeptSelectComponent,
    CheckableDeptTreeComponent,
    DeptComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    DeptService
  ],
  exports: [
    DeptComponent,
    DeptSelectComponent,
    CheckableDeptTreeComponent
  ]
})
export class DeptModule { }
