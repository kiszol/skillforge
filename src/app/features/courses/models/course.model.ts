export interface Course {
  id?: number;
  title: string;
  description: string;
  status: 'planned' | 'active' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  created_at?: Date | string;
}