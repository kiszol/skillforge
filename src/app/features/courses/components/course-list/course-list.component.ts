import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService, CourseFilter } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { RealtimeService } from '../../../../core/services/realtime.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  loading = false;
  error: string | null = null;
  
  // Filter & Pagination
  searchTerm = '';
  selectedStatus = '';
  selectedDifficulty = '';
  sortBy: 'created_at' | 'title' | 'difficulty' = 'created_at';
  sortOrder: 'asc' | 'desc' = 'desc';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 0;
  
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private courseService: CourseService,
    private realtimeService: RealtimeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.setupSearch();
    this.setupRealtimeUpdates();
  }

  setupSearch(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        this.searchTerm = searchTerm;
        this.currentPage = 1;
        this.loadCourses();
      });
  }

  setupRealtimeUpdates(): void {
    this.realtimeService.courseUpdates$
      .pipe(takeUntil(this.destroy$))
      .subscribe(update => {
        if (update.type === 'course_created') {
          this.loadCourses();
        } else if (update.type === 'course_deleted') {
          this.courses = this.courses.filter(c => c.id !== update.data.id);
        } else if (update.type === 'course_updated') {
          const index = this.courses.findIndex(c => c.id === update.data.id);
          if (index !== -1) {
            this.courses[index] = update.data;
          }
        }
      });
  }

  loadCourses(): void {
    this.loading = true;
    this.error = null;

    const filter: CourseFilter = {
      search: this.searchTerm || undefined,
      status: this.selectedStatus || undefined,
      difficulty: this.selectedDifficulty || undefined,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      page: this.currentPage,
      limit: this.itemsPerPage
    };

    this.courseService.getCourses(filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.courses = response.data;
          this.totalItems = response.total;
          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading courses:', error);
          this.error = 'Hiba történt a kurzusok betöltésekor';
          this.loading = false;
        }
      });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadCourses();
  }

  onSortChange(): void {
    this.loadCourses();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadCourses();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadCourses();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCourses();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCourses();
    }
  }

  viewCourse(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  editCourse(courseId: number): void {
    this.router.navigate(['/courses/edit', courseId]);
  }

  deleteCourse(course: Course): void {
    if (!course.id) return;
    
    if (confirm(`Biztosan törölni szeretnéd a(z) "${course.title}" kurzust?`)) {
      this.courseService.deleteCourse(course.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadCourses();
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