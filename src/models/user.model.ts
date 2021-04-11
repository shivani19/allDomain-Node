
import { Schema, model, Document } from "mongoose";


export interface IUsersMOdel extends Document {
    postId: Number
    id: Number
    name: String
    email: String
    body: String
    createdOn: Number
}

export const UserSchema: any = new Schema({
    postId: { type: Number },
    id: { type: Number },
    name: { type: String },
    email: { type: String },
    body: { type: String },
    createdOn: { type: Number }
})


export const Users = model<IUsersMOdel>('users', UserSchema);