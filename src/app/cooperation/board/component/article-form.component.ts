import { AfterViewInit, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { BoardService } from './board.service';

import { ResponseObject } from '../../../core/model/response-object';
import { FormBase, FormType } from 'src/app/core/form/form-base';
import { NzUploadChangeParam, NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { GlobalProperty } from 'src/app/core/global-property';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Article } from './article.model';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent extends FormBase implements OnInit, AfterViewInit {
  //public Editor = ClassicEditor;

  editorConfig = {
    //plugins: [ Font ],
    toolbar: [ 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor','heading', '|', 'bold', 'italic' ]
  };

  fileList: any = [
    /*{
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png'
    },

    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png'
    }*/
  ];

  imageUploadParam = { pgmId: 'board' ,appUrl:'asd' };
  fileUploadHeader: any;
  fileUploadUrl: any;

  textData: any;
  article!: Article;

  @Input() boardId!: number;

  @ViewChild('upload', { static: true }) upload!: NzUploadComponent;
  @ViewChild('ckEditor', { static: true }) ckEditor!: CKEditorComponent;
  @ViewChild('title', { static: true }) title!: NzInputTextComponent;

  constructor(private fb: FormBuilder,
              private boardService: BoardService) {
    super();

    this.fg = this.fb.group({
      boardId         : new FormControl<number | null>(null, { validators: [Validators.required] }),
      articleId       : new FormControl<number | null>(null, { validators: [Validators.required] }),
      articleParentId : new FormControl<number | null>(null),
      title           : new FormControl<string | null>(null, { validators: [Validators.required] }),
      contents        : new FormControl<string | null>(null),
      attachFile      : new FormControl<any>(null)
    });
  }

  ngOnInit(): void {

    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm(this.boardId);
    }

    this.fileUploadUrl = GlobalProperty.serverUrl + '/common/file/';
    this.fileUploadHeader = {
      Authorization: sessionStorage.getItem('token')
      /*'Content-Type': 'multipart/form-data'*/
    };

  }

  ngAfterViewInit(): void {
    this.title.focus();
  }

  newForm(boardId: any): void {
    this.formType = FormType.NEW;
    this.fg.reset();
    this.fg.get('boardId')?.setValue(boardId);
    this.fileList = [];
    this.textData = null;
    // console.log(this.ckEditor.editorInstance);
    //this.ckEditor.writeValue(null);
  }

  modifyForm(formData: Article): void {
    this.formType = FormType.MODIFY;
    this.fg.reset();
    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: any): void {
    this.boardService.getArticle(id)
        .subscribe(
          (model: ResponseObject<Article>) => {
            if (model.data) {
              this.article = model.data;

              this.modifyForm(model.data);
              this.fileList = model.data.fileList;

              //this.ckEditor.writeValue(model.data.contents);
            } else {
              this.newForm(null);
            }
          }
        );
  }

  save(): void {
    this.convertFileList();

    this.boardService
        .saveArticleJson(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Article>) => {
            console.log(model);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(id: any): void {
    console.log(id);
    this.boardService.deleteArticle(id)
      .subscribe(
        (model: ResponseObject<Article>) => {
          this.formDeleted.emit(this.fg.getRawValue());
        }
      );
  }

  fileDown(): void {
    // this.boardService.downloadFile(this.article.attachFile[0].fileId, this.article.attachFile[0].fileName);
  }

  fileUploadChange(param: NzUploadChangeParam): void {
    console.log(param);
    if (param.type === 'success') {
      // this.fileList = param.file.response;
      this.fileList.push(param.file.response[0]);
    }
  }

  textChange({ editor }: ChangeEvent): void {

    //const data = editor.getData();
    //this.fg.get('contents')?.setValue(data);
  }

  convertFileList() {
    const attachFileIdList = [];

    // tslint:disable-next-line: forin
    for (const val in this.fileList) {
      // console.log(this.fileList[val].response[0].uid);
      attachFileIdList.push(String(this.fileList[val].uid));
    }
    this.fg.get('attachFile')?.setValue(attachFileIdList);
  }

}
