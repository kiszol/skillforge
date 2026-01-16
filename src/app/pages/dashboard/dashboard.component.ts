import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealtimeService } from '../../core/services/realtime.service';
import { DashboardService, DashboardStats } from './dashboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats: DashboardStats = {
    totalCourses: 0,
    activeCourses: 0,
    completedCourses: 0,
    plannedCourses: 0
  };
  
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private dashboardService: DashboardService,
    private realtimeService: RealtimeService
  ) {}

  ngOnInit(): void {
    // Subscribe to dashboard stats
    this.dashboardService.stats$
      .pipe(takeUntil(this.destroy$))
      .subscribe(stats => {
        this.stats = stats;
        this.loading = false;
      });

    // Listen to real-time course updates
    this.realtimeService.courseUpdates$
      .pipe(takeUntil(this.destroy$))
      .subscribe(update => {
        if (update.type === 'course_created') {
          this.dashboardService.incrementTotalCourses();
          this.dashboardService.loadStats(); // Reload full stats
        } else if (update.type === 'course_deleted') {
          this.dashboardService.decrementTotalCourses();
          this.dashboardService.loadStats(); // Reload full stats
        } else if (update.type === 'course_updated') {
          this.dashboardService.loadStats(); // Reload full stats
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  refreshStats(): void {
    this.loading = true;
    this.dashboardService.loadStats();
  }
}