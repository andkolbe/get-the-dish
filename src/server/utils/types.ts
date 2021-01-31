import { Request } from 'express';
import { IUsers } from '../db/models';

export interface IPayload {
    userid?: number;
}

export interface ReqUser extends Request {
    user?: IUsers & IPayload
}