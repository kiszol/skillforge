import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { CourseListComponent } from './features/courses/components/course-list/course-list.component';
import { CourseDetailComponent } from './features/courses/components/course-detail/course-detail.component';
import { CourseFormComponent } from './features/courses/components/course-form/course-form.component';
import { StudentsComponent } from './pages/students/students.component';
import { InstructorsComponent } from './pages/instructors/instructors.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/new', component: CourseFormComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'courses/edit/:id', component: CourseFormComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }