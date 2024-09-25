import {Comment, Post, User} from "@prisma/client";

export interface PostsResponseType {
  posts: Post[];
  meta: MetaType;
}

export interface CommentsResponseType {
  comments: Comment[];
  meta: MetaType;
}

interface MetaType {
  totalCount: number;
  currentPage: number;
  nextPage: number | null;
}

export interface ProfileResponseType {
  id: User["id"];
  username: User["username"];
  role: User["role"];
  posts: ProfilePostType[];
  comments: ProfileCommentType[];
}

interface ProfilePostType {
  id: Post["id"];
  date_posted: Post["date_posted"];
  title: Post["title"];
  content: Post["content"];
  published: Post["published"];
  _count: {
    comments: number;
  };
}

interface ProfileCommentType {
  id: Comment["id"];
  content: Comment["content"];
  date_posted: Comment["date_posted"];
  postId: Comment["postId"];
}
