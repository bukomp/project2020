export interface DataBaseObject {
  id?: string;
}

export interface User extends DataBaseObject {
  username: string;
  email: string;
  password?: string;
}

export interface Post extends DataBaseObject {
  user_id: string;
  likes: number;
  created_at: Date | string;
  file_link: string;
  filters: string;
}

export interface Comment extends DataBaseObject {
  post_id: string;
  user_id: string;
  likes: number;
  created_at: Date | string;
  text: string;
}
