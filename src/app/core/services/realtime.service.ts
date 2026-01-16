import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

export interface WebSocketMessage {
  type: 'course_created' | 'course_updated' | 'course_deleted';
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private socket: Socket | null = null;
  private courseUpdatesSubject = new Subject<WebSocketMessage>();
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);

  public courseUpdates$ = this.courseUpdatesSubject.asObservable();
  public connectionStatus$ = this.connectionStatusSubject.asObservable();

  private readonly WS_URL = 'http://localhost:3000'; // Backend WebSocket URL

  constructor() {
    this.initializeWebSocket();
  }

  private initializeWebSocket(): void {
    try {
      this.socket = io(this.WS_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      });

      this.socket.on('connect', () => {
        console.log('WebSocket connected');
        this.connectionStatusSubject.next(true);
      });

      this.socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
        this.connectionStatusSubject.next(false);
      });

      // Course events
      this.socket.on('course:created', (data: any) => {
        this.courseUpdatesSubject.next({ type: 'course_created', data });
      });

      this.socket.on('course:updated', (data: any) => {
        this.courseUpdatesSubject.next({ type: 'course_updated', data });
      });

      this.socket.on('course:deleted', (data: any) => {
        this.courseUpdatesSubject.next({ type: 'course_deleted', data });
      });

      this.socket.on('error', (error: any) => {
        console.error('WebSocket error:', error);
      });

    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
    }
  }

  public emit(event: string, data: any): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket is not connected. Cannot emit event:', event);
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}