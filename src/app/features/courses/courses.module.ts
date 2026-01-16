import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseFormComponent } from './components/course-form/course-form.component';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }