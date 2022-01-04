import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process  } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
      sort: [],
      skip: 0,
      take: 10,
    };

    remove = false;
  
    
    private removeDataItem: any;
    private editedRowIndex: number;
    private editedStudent: Student;
  
    constructor(private studentService: StudentService) {
    }
  
    public async ngOnInit(): Promise<void> {
      this.view = this.studentService.pipe(map((data) => process(data, this.gridState)
      ));
      
      this.studentService.read();
   
    }
  
    public async onStateChange(state: State) {
      this.gridState = state;
      this.studentService.read();
    }
  
    public addHandler({ sender }, formInstance) {
      formInstance.reset();
      this.closeEditor(sender);
  
      sender.addRow(new Student());
    }
  
    public editHandler({ sender, rowIndex, dataItem }) {
      this.closeEditor(sender);
  
      this.editedRowIndex = rowIndex;
      this.editedStudent = Object.assign({}, dataItem);
  
      sender.editRow(rowIndex);
    }
  
    public cancelHandler({ sender, rowIndex }) {
      this.closeEditor(sender, rowIndex);
    }
  
    public async saveHandler({ sender, rowIndex, dataItem, isNew }) {
      await this.studentService.save(dataItem, isNew);
      await this.studentService.refresh();
      sender.closeRow(rowIndex);
  
      this.editedRowIndex = undefined;
      this.editedStudent = undefined;
    }
  
    public async removeHandler({ dataItem }) {
      this.remove = true;
      this.removeDataItem=dataItem;
    }

    public async deleteAction(status: boolean){
      this.remove = false;
      if(status){
        await this.studentService.remove(this.removeDataItem);
        await this.studentService.refresh();
      }
      this.removeDataItem =  undefined;
    }
  
    private closeEditor(grid, rowIndex = this.editedRowIndex) {
      grid.closeRow(rowIndex);
      this.studentService.resetItem(this.editedStudent);
      this.editedRowIndex = undefined;
      this.editedStudent = undefined;
    }
}
