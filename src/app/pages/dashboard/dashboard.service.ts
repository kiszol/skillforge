import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, delay, catchError } from 'rxjs/operators';

export interface DashboardStats {
  totalCourses: number;
  activeCourses: number;
  completedCourses: number;
  plannedCourses: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/api'; // Backend API URL
  private useMockData = true; // Set to true to use mock data
  
  private mockStats: DashboardStats = {
    totalCourses: 3,
    activeCourses: 2,
    completedCourses: 0,
    plannedCourses: 1
  };
  
  private statsSubject = new BehaviorSubject<DashboardStats>({
    totalCourses: 0,
    activeCourses: 0,
    completedCourses: 0,
    plannedCourses: 0
  });

  public stats$ = this.statsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStats();
  }

  loadStats(): void {
    if (this.useMockData) {
      // Mock mode: Use predefined stats
      of(this.mockStats).pipe(delay(200)).subscribe(stats => {
        this.statsSubject.next(stats);
      });
      return;
    }

    this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`)
      .pipe(
        tap(stats => this.statsSubject.next(stats)),
        catchError(error => {
          console.error('Error loading dashboard stats:', error);
          // Fallback to mock data on error
          this.statsSubject.next(this.mockStats);
          return of(this.mockStats);
        })
      )
      .subscribe();
  }

  updateStats(stats: Partial<DashboardStats>): void {
    const currentStats = this.statsSubject.value;
    const updatedStats = { ...currentStats, ...stats };
    this.statsSubject.next(updatedStats);
    
    // Update mock stats as well if in mock mode
    if (this.useMockData) {
      this.mockStats = updatedStats;
    }
  }

  incrementTotalCourses(): void {
    const currentStats = this.statsSubject.value;
    const updatedStats = {
      ...currentStats,
      totalCourses: currentStats.totalCourses + 1
    };
    this.statsSubject.next(updatedStats);
    
    // Update mock stats as well if in mock mode
    if (this.useMockData) {
      this.mockStats = updatedStats;
    }
  }

  decrementTotalCourses(): void {
    const currentStats = this.statsSubject.value;
    const updatedStats = {
      ...currentStats,
      totalCourses: Math.max(0, currentStats.totalCourses - 1)
    };
    this.statsSubject.next(updatedStats);
    
    // Update mock stats as well if in mock mode
    if (this.useMockData) {
      this.mockStats = updatedStats;
    }
  }
}
