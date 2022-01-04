import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators'
import {Apollo, gql, QueryRef} from 'apollo-angular'
import { Student } from 'src/app/models/student.model';
import { BehaviorSubject } from 'rxjs';

export const GET_STUDENTS = gql `{students{id, name, gender, address, mobileNo, DOB, age}}`;
export const CREATE_STUDENT = gql `mutation AddStudent($newStudent: NewStudent!) {
  addStudent(newStudent: $newStudent)
}`;
export const REMOVE_STUDENT = gql `mutation RemoveStudent($removeStudentId: Int!) {
  removeStudent(id: $removeStudentId)
}`;
export const UPDATE_STUDENT = gql `mutation UpdateStudent($updatedStudent: UpdatedStudent!) {
  updateStudent(updatedStudent: $updatedStudent)
}`;
@Injectable({
  providedIn: 'root'
})
export class StudentService extends BehaviorSubject<any[]>  {

  constructor(private apollo: Apollo) {
    super([]);
  }

  private data: Student[] = [];
  studentQuery: QueryRef<any>;

  public  async read() {

    if (this.data.length) {
      return super.next(this.data);
    }
    
    return this.getStudents();
  }

  public async refresh(){
    return this.studentQuery.refetch();
  }

  public async save(data: any, isNew?: boolean) {
    this.reset();
    if (isNew){
      const student = {
        address: data.address,
        DOB: data.DOB,
        gender: data.gender,
        mobileNo: data.mobileNo,
        name: data.name,
      };
     await this.createStudent(student);
    }
    else{
      const student: Student = {
        id: data.id,
        address:  data.address,
        DOB: data.DOB,
        gender: data.gender,
        mobileNo: data.mobileNo,
        name: data.name,
        age: 0
      };
     await this.updateStudent(student);
    }
  }

  public async remove(data: any) {
    this.reset();
    await this.removeStudent(data.id);
  }

  public resetItem(dataItem: any) {
    if (!dataItem) {
      return;
    }

    // find orignal data item
    const originalDataItem = this.data.find(
      (item) => item.id === dataItem.id
    );

    // revert changes
    Object.assign(originalDataItem, dataItem);
    super.next(this.data);
  }

  public reset() {
    this.data = [];
  }

  public createStudent(newStudent){
    return this.apollo.mutate<Student>({mutation: CREATE_STUDENT, variables:{newStudent: newStudent }}).toPromise();
  }

  public removeStudent(id){
    return this.apollo.mutate({
      mutation: REMOVE_STUDENT,
      variables: {removeStudentId: id}}).toPromise();
  }

  public updateStudent(updatedStudent){
    return this.apollo.mutate({mutation: UPDATE_STUDENT, variables: {updatedStudent:updatedStudent}}).toPromise();
  }

  public async getStudents(){
    this.data = [];
    this.studentQuery =  this.apollo.watchQuery<any>({query: GET_STUDENTS});
    return this.studentQuery.valueChanges.subscribe(({ data, loading }) => {
      data.students.forEach((item) => {
        const student : Student = {
          id: item.id,
          name: item.name,
          address: item.address,
          age: item.age,
          DOB: item.DOB,
          gender: item.gender,
          mobileNo: item.mobileNo
        };
        this.data.push(student);
     })
      super.next(this.data);
    })
  }
}
