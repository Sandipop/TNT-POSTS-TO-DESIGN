
export enum ContentType {
  Image = 'image',
  Video = 'video',
}

export enum ImageStep {
  Initial = 'initial',
  Editing = 'editing',
  Done = 'done',
}

// FIX: Moved User interface here for reusability and to fix type errors.
export interface User {
    id: number;
    email: string;
    signUpDate: string;
    status: 'Active' | 'Banned';
}
