export interface Student {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  enrolledCourses?: number[];
  created_at?: Date | string;
}
