import {Config} from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    profile_photo_path?: string;
  role?: Role;
}

export enum Role {
  Admin = 'admin',
  User = 'user',
}

export interface Exercise {
  id: number;
  question: string;
  answer: string;
}

export interface Chapter {
  id: number;
  section_id: string;
  title: string;
  content: string;
  order: number;
  exercises: Exercise[];
}

export interface Section {
  id: number;
  course_id: string;
  title: string;
  order: number;
  chapters: Chapter[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  order: number | string;
  sections: Section[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
