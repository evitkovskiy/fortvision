import { IComment } from "../../components/comment/comment.interface";

export interface IPost {
  id?: number;
  author: string;
  content: string;
  timestamp: string;
  likes?: ILikes;
  comments?: IComment[];
}

export interface ILikes {
  count: number;
  usersLiked: Array<string>;
}
