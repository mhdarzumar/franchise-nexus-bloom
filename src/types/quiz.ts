
export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  questions: Question[];
  createdBy: string; // manager ID
  createdAt: Date;
  isActive: boolean;
  invitedParticipants: Participant[];
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  quizId: string;
  uniqueLink: string;
  status: 'pending' | 'completed' | 'expired';
  startedAt?: Date;
  completedAt?: Date;
  score?: number;
  proctorRecordingUrl?: string;
  tabSwitches?: number;
  warnings?: ProctorWarning[];
}

export interface ProctorWarning {
  timestamp: Date;
  type: 'tab_switch' | 'fullscreen_exit' | 'suspicious_motion' | 'face_not_visible';
  details?: string;
}

export interface QuizResponse {
  quizId: string;
  participantId: string;
  answers: {
    questionId: string;
    answer: string | string[];
  }[];
  score?: number;
  startedAt: Date;
  completedAt?: Date;
  timeSpent: number; // in seconds
}

export interface Manager {
  id: string;
  name: string;
  email: string;
  organization?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalQuizzes: number;
  totalParticipants: number;
  attemptRate: number; // percentage
  activeQuizzes: number;
  completedQuizzes: number;
  upcomingQuizzes: number;
}
