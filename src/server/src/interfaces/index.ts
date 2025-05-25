import { Send } from "express-serve-static-core"
import { User } from "~/model/user"
import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"

export interface TypedRequestBody<T> extends Request {
    user?: User
    headers: { authorization?: string }
    body: T;
    params: ParamsDictionary
}

export interface TypedResponse<ResBody> extends Response {
    json: Send<ResBody, this>;
}
