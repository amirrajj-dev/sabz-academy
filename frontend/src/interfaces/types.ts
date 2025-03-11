export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  isBanned: boolean;
  phone: string;
  profile? : string
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
  updatedAt: Date;
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
  video?: File;
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
  cover?: File;
  shortName: string;
  categoryID: string;
  creatorID?: string;
  publish: number;
  category: ICategory;
  creator?: IUser;
  createdAt: Date;
}

export interface IDiscount {
  id : string
  discount : number
  code : string
  maxUse : number
  courseId : string
  createdAt: Date;
}

export interface ITicket {
  id: string;
  department: string;
  type: 'issue' | 'request' | 'suggestion' | 'question';
  title: string;
  priority: 'low' | 'medium' | 'high'; 
  content: string;
  status: 'open' | 'in_progress' | 'closed'; 
  userId: string;
  user: IUser;
  replies: IReply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IReply {
  id: string;
  content: string;
  userId: string;
  ticketId: string;
  user: IUser;
  ticket: ITicket;
  createdAt: Date;
  updatedAt: Date;
}

export enum TicketType {
  ISSUE = 'issue',
  REQUEST = 'request',
  SUGGESTION = 'suggestion',
  QUESTION = 'question'
}

export enum TicketStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed'
}

export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}