export interface DataBaseObject {
  id?: string;
}

export interface User extends DataBaseObject {
  username: string;
  email: string;
  passwordHash?: string;
}

export interface Post extends DataBaseObject {
  userId: string;
  likes: number;
  timestamp: string;
  fileLink: string;
  filters: string;
}

export interface Comment extends DataBaseObject {
  postId: string;
  userId: string;
  likes: number;
  timestamp: string;
  comment: string;
}
