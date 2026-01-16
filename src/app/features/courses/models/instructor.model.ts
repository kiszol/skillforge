export interface Instructor {
  id?: number;
  name: string;
  email: string;
  specialization: string;
  bio?: string;
  created_at?: Date | string;
}
