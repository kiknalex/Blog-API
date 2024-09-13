import {Request} from "express";

export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>;
export type RequestWithBody<B> = Request<{}, {}, B>;
export type RequestWithParams<P> = Request<P>;
export type RequestWithParamsAndBody<P, B> = Request<P, {}, B>;
export type RequestWithAll<P, B, Q> = Request<P, {}, B, Q>;
export type CustomRequest = Request<
  {postId: string},
  {},
  {content: string},
  {anon: boolean}
>;
