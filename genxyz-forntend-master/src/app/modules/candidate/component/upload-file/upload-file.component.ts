import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { UploadService } from '../../../../service/upload.service';
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  @Input() cvData: any;
  mode: ProgressBarMode = 'buffer';
  value = 50;
  bufferValue = 100;
  progressBarVisible = false
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  s3path: any = environment.s3Url;

  constructor(public uploadFile: UploadService) { }

  ngOnInit(): void {
  }

  deleteFile() {
    this.cvData = null;
    this.onSave.emit({data: this.cvData});
  }


  async uploadFileToS3(event: any) {
    this.value = 0;
    this.progressBarVisible = true;
   let file = event.target.files[0];
   let presignedUrl: any = await this.uploadFile.getS3Url().toPromise();
   console.log(presignedUrl);
   this.uploadFile.uploadS3(file, presignedUrl.data.url, presignedUrl.data.fields).subscribe(data => {
        if (data.type === HttpEventType.Response) {
            console.log('Upload complete', data);
            this.progressBarVisible = false;
            this.cvData = {filePath: presignedUrl.data.fields.key, type: file.type, fileName: file.name, name: file.name};
            this.onSave.emit({data: this.cvData});
        }
        if (data.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * data.loaded / data.total);
            this.value = percentDone;
            console.log('Progress ' + percentDone + '%');
        }
   });
  }

}
