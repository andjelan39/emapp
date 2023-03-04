import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Employee {
  id?: string;
  name: string;
  lastName: string;
  department: string;
  salary: number;
  address: string;
  email: string;
  phoneNumber: string;
}

export interface User {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore, private auth: Auth) { }


  getEmployees(): Observable<Employee[]>{
    const employeeRef = collection(this.firestore, 'employees');
    return collectionData(employeeRef, {idField: 'id'}) as Observable<Employee[]> ;
  }

  getEmployeeById(id: string): Observable<Employee>{ 
    const employeeDocRef = doc(this.firestore, `employees/${id}`);
    return docData(employeeDocRef, {idField: 'id'}) as Observable<Employee>;
  }

  addEmployee(employee: Employee) {
    const employeeRef = collection(this.firestore, 'employees');
    return addDoc(employeeRef, employee);
  }

  deleteEmployee(employee: Employee) {
    const employeeDocRef = doc(this.firestore, `employees/${employee.id}`);
    return deleteDoc(employeeDocRef);
  }

  updateEmployee(employee: Employee) {
    const employeeDocRef = doc(this.firestore, `employees/${employee.id}`);
    return updateDoc(employeeDocRef, {name: employee.name, lastName: employee.lastName, department: employee.department,
    salary: employee.salary, address: employee.address, email: employee.email, phoneNumber: employee.phoneNumber} );
  }

  getUsers(): Observable<User[]>{
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, {idField: 'id'}) as Observable<User[]> ;
  }

  getUserById(id: string): Observable<User>{ 
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, {idField: 'id'}) as Observable<User>;
  }

  /*addUser(user: User) {
    const userRef = collection(this.firestore, 'users');
    return addDoc (userRef, user);
  }*/

  addUser(user: User) {

    setDoc(doc(this.firestore, `users/${this.auth.currentUser?.uid}`), user);

  }

  updateUser(user: User) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(userDocRef, {name: user.name, lastName: user.lastName,
    email: user.email, phoneNumber: user.phoneNumber});
  }

  
}
