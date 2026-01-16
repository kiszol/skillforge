import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  loading = false;

  constructor() { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    // TODO: Load students from service
    setTimeout(() => {
      this.students = [
        { id: 1, name: 'Kiss Anna', email: 'kiss.anna@example.com', courses: 3 },
        { id: 2, name: 'Nagy Péter', email: 'nagy.peter@example.com', courses: 2 },
        { id: 3, name: 'Szabó Eszter', email: 'szabo.eszter@example.com', courses: 4 }
      ];
      this.loading = false;
    }, 500);
  }
}
