import { Component, OnInit } from '@angular/core';
import { FileRestrictions } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  uploadSaveUrl = "http://localhost:3002/upload";

   restrictions: FileRestrictions = {
    allowedExtensions: [".xlsx", ".xls"],
  };
  uploadFile(e){
      console.log(e);
  }

}
