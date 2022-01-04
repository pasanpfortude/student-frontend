import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
import {StudentOperations} from '../enums/studentOperations.enum';
import { StudentService } from './student.service';


const socket = io(environment.socketUrl);

@Injectable()
export class  EventService  {

  constructor(private notificationService: NotificationService, private studentService: StudentService) {  }

  init(){
    socket.on("connect", () => {  console.log("Connected",socket.id); });

    socket.on(StudentOperations.STUDENT_ADDED, (data) => {  
     this.notificationService.show({
      content: "Student was added successfully",
      cssClass: "button-notification",
      animation: { type: "fade", duration: 400 },
      position: { horizontal: "right", vertical: "top" },
      type: { style: "success", icon: true },
    });
    });

    socket.on(StudentOperations.STUDENT_UPDATED, (data) => {  
      this.notificationService.show({
       content: "Student was updated successfully",
       cssClass: "button-notification",
       animation: { type: "fade", duration: 400 },
       position: { horizontal: "right", vertical: "top" },
       type: { style: "success", icon: true },
     });
     });

     socket.on(StudentOperations.STUDENT_REMOVED, (data) => {  
      this.notificationService.show({
       content: "Student was removed successfully",
       cssClass: "button-notification",
       animation: { type: "fade", duration: 400 },
       position: { horizontal: "right", vertical: "top" },
       type: { style: "success", icon: true },
     });
     });

     socket.on(StudentOperations.STUDENTS_ADDED, (data) => {  
      this.notificationService.show({
       content: "Students were added successfully",
       cssClass: "button-notification",
       animation: { type: "fade", duration: 400 },
       position: { horizontal: "right", vertical: "top" },
       type: { style: "success", icon: true },
     });
      this.studentService.refresh();
     });
  }
  
}
