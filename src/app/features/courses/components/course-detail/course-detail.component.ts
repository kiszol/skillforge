import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  course: Course | null = null;
  courseId: string | null = null;
  loading = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.getCourseDetail(+this.courseId);
    }
  }

  getCourseDetail(id: number): void {
    this.loading = true;
    this.error = null;
    
    this.courseService.getCourse(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Course) => {
          this.course = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching course details', error);
          this.error = 'Failed to load course details';
          this.loading = false;
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }

  deleteCourse(): void {
    if (!this.course || !this.course.id) return;

    if (confirm(`Biztosan törölni szeretnéd a(z) "${this.course.title}" kurzust?`)) {
      this.courseService.deleteCourse(this.course.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.router.navigate(['/courses']);
          },
          error: (error) => {
            console.error('Error deleting course:', error);
            alert('Hiba történt a kurzus törlésekor');
          }
        });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'badge-success';
      case 'completed': return 'badge-info';
      case 'planned': return 'badge-warning';
      default: return 'badge-info';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active': return 'Aktív';
      case 'completed': return 'Befejezett';
      case 'planned': return 'Tervezett';
      default: return status;
    }
  }

  getDifficultyText(difficulty: string): string {
    switch (difficulty) {
      case 'beginner': return 'Kezdő';
      case 'intermediate': return 'Középhaladó';
      case 'advanced': return 'Haladó';
      default: return difficulty;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}