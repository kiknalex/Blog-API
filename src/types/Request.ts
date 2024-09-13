import {Request} from "express";
import {AuthData} from "./AuthData";

export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, T1> = Request<T, {}, T1>;
export type RequestWithAll<T, T1, T2> = Request<T, {}, T1, T2>;
