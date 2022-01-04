import { TestBed, tick } from '@angular/core/testing';
import {ApolloTestingModule, ApolloTestingController} from 'apollo-angular/testing';
import { Student } from '../models/student.model';
import { CREATE_STUDENT, GET_STUDENTS, REMOVE_STUDENT, StudentService, UPDATE_STUDENT } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ ApolloTestingModule.withClients(['studentService'])]
     
    });
    service = TestBed.inject(StudentService);
    controller = TestBed.inject(ApolloTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a student', () => {

    const newStudent = {
      address: 'TestLocation',
      DOB: new Date(),
      gender: 'Female',
      mobileNo: 711458236,
      name: 'Testname',
    }

    service.createStudent(newStudent);

    const op = controller.expectOne((operation) => {
      expect(operation.query.definitions).toEqual(CREATE_STUDENT.definitions);
      return true;
    });

    controller.verify();
  })

  it('should remove a student', () => {

    service.removeStudent(0);

    const op = controller.expectOne((operation) => {
      expect(operation.query.definitions).toEqual(REMOVE_STUDENT.definitions);
      return true;
    });

    controller.verify();
  })

  it('should update a student', () => {

    const updateStudent : Student= {
      id: 0,
      address: 'TestLocation',
      DOB: new Date(),
      gender: 'Female',
      mobileNo: 711458236,
      name: 'Testname',
      age: 0
    }
    service.updateStudent(updateStudent);

    const op = controller.expectOne((operation) => {
      expect(operation.query.definitions).toEqual(UPDATE_STUDENT.definitions);
      return true;
    });

    controller.verify();
  })

  it('should get all students', () => {

    const student : Student= {
      id: 0,
      address: 'TestLocation',
      DOB: new Date(),
      gender: 'Female',
      mobileNo: 711458236,
      name: 'Testname',
      age: 0
    }
    service.getStudents();

    const op = controller.expectOne(GET_STUDENTS);
    expect(op.operation.query.definitions).toEqual(GET_STUDENTS.definitions);
    controller.verify();
  })

  it('should create student in save method', async () => {
    const data = {
      address: 'TestLocation',
      DOB: new Date(),
      gender: 'Female',
      mobileNo: 711458236,
      name: 'Testname',
      age: 0
    };
    const isNew = true;
    
    spyOn(service,'reset');
    spyOn(service,'createStudent');
    service.save(data, isNew);
    expect(service.reset).toHaveBeenCalled();
    expect(service.createStudent).toHaveBeenCalled();
  })

  it('should update student in save method', async () => {
    const data = {
      id: 0,
      address: 'TestLocation',
      DOB: new Date(),
      gender: 'Female',
      mobileNo: 711458236,
      name: 'Testname',
      age: 0
    };
    const isNew = false;
    
    spyOn(service,'reset');
    spyOn(service,'updateStudent');
    service.save(data, isNew);
    expect(service.reset).toHaveBeenCalled();
    expect(service.updateStudent).toHaveBeenCalled();
  })

  it('should remove student', async () => {
    const data = {
      id: 0,
      address: 'TestLocation',
      DOB: new Date(),
      gender: 'Female',
      mobileNo: 711458236,
      name: 'Testname',
      age: 0
    };
    spyOn(service,'reset');
    spyOn(service,'removeStudent');
    service.remove(data);
    expect(service.reset).toHaveBeenCalled();
    expect(service.removeStudent).toHaveBeenCalled();
  })
});
