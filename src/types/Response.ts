import {Comment, Post} from "@prisma/client";

export interface PostsResponseType {
  posts: Post[];
  meta: MetaType;
}

export interface CommentsResponseType {
  comments: Comment[];
  meta: MetaType;
}

interface MetaType {
  meta: {
    totalCount: number;
    currentPage: number;
    nextPage: number | null;
  };
}
