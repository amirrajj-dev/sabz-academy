export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  isBanned: boolean;
  phone: string;
  role: 'ADMIN' | 'USER';
  courses: ICourse[];
  comments: IComment[];
  articles: IArticle[];
  createdAt: Date;
}

export interface ICourse {
  id: string;
  name: string;
  description: string;
  body : string;
  cover?: string;
  support?: string;
  shortName: string;
  price: number;
  isComplete: number;
  status: string;
  discount: number;
  categoryID: string;
  creatorID?: string;
  category: ICategory;
  creator?: IUser;
  comments: IComment[];
  sessions: ISession[];
  createdAt: Date;
}

export interface ICategory {
  id: string;
  title: string;
  name: string;
  articles: IArticle[];
  courses: ICourse[];
  createdAt: Date;
}

export interface IComment {
  id: string;
  body: string;
  courseID: string;
  creatorID: string;
  answer: number;
  score: number;
  isAnswer: number;
  mainCommentID?: string;
  course: ICourse;
  creator: IUser;
  replies: IComment[];
  parentComment?: IComment;
  createdAt: Date;
}

export interface ISession {
  id: string;
  title: string;
  time: string;
  video?: string;
  free: number;
  courseId?: string;
  course?: ICourse;
  createdAt: Date;
}

export interface IMenu {
  id: string;
  title: string;
  href: string;
  parentID?: string;
  parent?: IMenu;
  children: IMenu[];
  createdAt: Date;
}

export interface IArticle {
  id: string;
  title: string;
  description: string;
  body: string;
  cover?: string;
  shortName: string;
  categoryID: string;
  creatorID?: string;
  publish: number;
  category: ICategory;
  creator?: IUser;
  createdAt: Date;
}