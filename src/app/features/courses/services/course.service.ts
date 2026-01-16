import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';
import { Course } from '../models/course.model';

export interface CourseFilter {
  search?: string;
  status?: string;
  difficulty?: string;
  sortBy?: 'created_at' | 'title' | 'difficulty';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();
  
  // MOCK MODE - állítsd false-ra ha van backend API
  private useMockData = true;
  
  // Mock adatok tárolása
  private mockCourses: Course[] = [
    {
      id: 1,
      title: 'Angular Alapok',
      description: 'Tanulj meg Angular alkalmazásokat fejleszteni nulláról. Komponensek, service-ek, routing és még sok más.',
      status: 'active',
      difficulty: 'beginner',
      instructor: 'Dr. Kiss János',
      created_at: '2026-01-10T10:00:00Z'
    },
    {
      id: 2,
      title: 'RxJS Haladó',
      description: 'Reaktív programozás RxJS-sel Angular környezetben. Operátorok, subjects, schedulers.',
      status: 'active',
      difficulty: 'advanced',
      instructor: 'Nagy Éva',
      created_at: '2026-01-12T14:30:00Z'
    },
    {
      id: 3,
      title: 'TypeScript Középhaladó',
      description: 'TypeScript nyelv mélyebb megértése. Generics, decorators, advanced types.',
      status: 'planned',
      difficulty: 'intermediate',
      instructor: 'Kovács Péter',
      created_at: '2026-01-08T09:15:00Z'
    }
  ];
  
  private nextId = 4;

  constructor(private http: HttpClient) {
    if (this.useMockData) {
      this.coursesSubject.next(this.mockCourses);
    }
  }

  getCourses(filter?: CourseFilter): Observable<PaginatedResponse<Course>> {
    if (this.useMockData) {
      // Mock mode: Filter and paginate mockCourses
      let filteredCourses = [...this.mockCourses];

      // Apply filters
      if (filter?.search) {
        const searchLower = filter.search.toLowerCase();
        filteredCourses = filteredCourses.filter(c => 
          c.title.toLowerCase().includes(searchLower) || 
          c.description.toLowerCase().includes(searchLower)
        );
      }
      if (filter?.status) {
        filteredCourses = filteredCourses.filter(c => c.status === filter.status);
      }
      if (filter?.difficulty) {
        filteredCourses = filteredCourses.filter(c => c.difficulty === filter.difficulty);
      }

      // Apply sorting
      if (filter?.sortBy) {
        const sortOrder = filter.sortOrder === 'desc' ? -1 : 1;
        filteredCourses.sort((a: any, b: any) => {
          const aVal = a[filter.sortBy!];
          const bVal = b[filter.sortBy!];
          return aVal > bVal ? sortOrder : aVal < bVal ? -sortOrder : 0;
        });
      }

      // Apply pagination
      const page = filter?.page || 1;
      const limit = filter?.limit || 10;
      const startIndex = (page - 1) * limit;
      const paginatedCourses = filteredCourses.slice(startIndex, startIndex + limit);

      const response: PaginatedResponse<Course> = {
        data: paginatedCourses,
        total: filteredCourses.length,
        page,
        limit,
        totalPages: Math.ceil(filteredCourses.length / limit)
      };

      this.coursesSubject.next(response.data);
      return of(response).pipe(delay(300)); // Simulate network delay
    }

    // Real API mode
    let params = new HttpParams();
    
    if (filter) {
      if (filter.search) params = params.set('search', filter.search);
      if (filter.status) params = params.set('status', filter.status);
      if (filter.difficulty) params = params.set('difficulty', filter.difficulty);
      if (filter.sortBy) params = params.set('sortBy', filter.sortBy);
      if (filter.sortOrder) params = params.set('sortOrder', filter.sortOrder);
      if (filter.page) params = params.set('page', filter.page.toString());
      if (filter.limit) params = params.set('limit', filter.limit.toString());
    }

    return this.http.get<PaginatedResponse<Course>>(this.apiUrl, { params })
      .pipe(
        tap(response => this.coursesSubject.next(response.data))
      );
  }

  getCourse(id: number): Observable<Course> {
    if (this.useMockData) {
      const course = this.mockCourses.find(c => c.id === id);
      if (course) {
        return of(course).pipe(delay(200));
      }
      return throwError(() => new Error('Kurzus nem található'));
    }
    
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    if (this.useMockData) {
      // Generate new ID for mock mode
      const maxId = Math.max(...this.mockCourses.map(c => c.id || 0), 0);
      const newCourse: Course = {
        ...course,
        id: maxId + 1,
        created_at: new Date().toISOString()
      };
      
      this.mockCourses.unshift(newCourse);
      const currentCourses = this.coursesSubject.value;
      this.coursesSubject.next([newCourse, ...currentCourses]);
      
      return of(newCourse).pipe(delay(300));
    }

    return this.http.post<Course>(this.apiUrl, course)
      .pipe(
        tap(newCourse => {
          const currentCourses = this.coursesSubject.value;
          this.coursesSubject.next([newCourse, ...currentCourses]);
        })
      );
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    if (this.useMockData) {
      const index = this.mockCourses.findIndex(c => c.id === id);
      if (index !== -1) {
        const updatedCourse: Course = {
          ...this.mockCourses[index],
          ...course,
          id,
          created_at: this.mockCourses[index].created_at
        };
        
        this.mockCourses[index] = updatedCourse;
        const currentCourses = this.coursesSubject.value;
        const currentIndex = currentCourses.findIndex(c => c.id === id);
        if (currentIndex !== -1) {
          currentCourses[currentIndex] = updatedCourse;
          this.coursesSubject.next([...currentCourses]);
        }
        
        return of(updatedCourse).pipe(delay(300));
      }
      return throwError(() => new Error('Kurzus nem található'));
    }

    return this.http.put<Course>(`${this.apiUrl}/${id}`, course)
      .pipe(
        tap(updatedCourse => {
          const currentCourses = this.coursesSubject.value;
          const index = currentCourses.findIndex(c => c.id === id);
          if (index !== -1) {
            currentCourses[index] = updatedCourse;
            this.coursesSubject.next([...currentCourses]);
          }
        })
      );
  }

  deleteCourse(id: number): Observable<void> {
    if (this.useMockData) {
      const index = this.mockCourses.findIndex(c => c.id === id);
      if (index !== -1) {
        this.mockCourses.splice(index, 1);
        const currentCourses = this.coursesSubject.value;
        this.coursesSubject.next(currentCourses.filter(c => c.id !== id));
        return of(void 0).pipe(delay(200));
      }
      return throwError(() => new Error('Kurzus nem található'));
    }

    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          const currentCourses = this.coursesSubject.value;
          this.coursesSubject.next(currentCourses.filter(c => c.id !== id));
        })
      );
  }
}