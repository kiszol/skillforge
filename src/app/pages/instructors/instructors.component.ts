import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent implements OnInit {
  instructors: any[] = [];
  loading = false;

  constructor() { }

  ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors(): void {
    this.loading = true;
    // TODO: Load instructors from service
    setTimeout(() => {
      this.instructors = [
        { id: 1, name: 'Dr. Kovács János', department: 'Informatika', courses: 5 },
        { id: 2, name: 'Dr. Tóth Mária', department: 'Matematika', courses: 3 },
        { id: 3, name: 'Dr. Horváth Gábor', department: 'Fizika', courses: 4 }
      ];
      this.loading = false;
    }, 500);
  }
}
