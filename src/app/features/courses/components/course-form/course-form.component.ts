import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnDestroy {
  courseForm: FormGroup;
  courseId: number | null = null;
  isEditMode = false;
  loading = false;
  submitError: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['planned', Validators.required],
      difficulty: ['beginner', Validators.required],
      instructor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseId = +id;
      this.isEditMode = true;
      this.loadCourse(this.courseId);
    }
  }

  loadCourse(id: number): void {
    this.loading = true;
    this.courseService.getCourse(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (course) => {
          this.courseForm.patchValue(course);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading course:', error);
          this.submitError = 'Hiba történt a kurzus betöltésekor';
          this.loading = false;
        }
      });
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.markFormGroupTouched(this.courseForm);
      return;
    }

    this.loading = true;
    this.submitError = null;
    const course: Course = this.courseForm.value;

    const request$ = this.isEditMode && this.courseId
      ? this.courseService.updateCourse(this.courseId, course)
      : this.courseService.createCourse(course);

    request$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          console.error('Error saving course:', error);
          this.submitError = 'Hiba történt a mentés során';
          this.loading = false;
        }
      });
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }

  // Helper to mark all fields as touched for validation display
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Getter methods for template
  get title() { return this.courseForm.get('title'); }
  get description() { return this.courseForm.get('description'); }
  get status() { return this.courseForm.get('status'); }
  get difficulty() { return this.courseForm.get('difficulty'); }
  get instructor() { return this.courseForm.get('instructor'); }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}