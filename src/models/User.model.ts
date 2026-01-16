import {Schema ,model ,Document} from "mongoose"
import { BlockList } from "node:net"

export type UserRole = "admin" | "teacher" | "student"

export interface UserDocument extends Document{
    name:string,
    email:string,
    password:string,
    role:UserRole,
    isActive:Boolean
}


const userSchema = new Schema<UserDocument>(
    {
        name:{
            type:String,
            trim:true,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true,
            minLength:7
        },
        role:{
            type:String,
            enum:["admin","teacher","student"],
            default:"student"
        },
        isActive:{
            type:Boolean,
            default:true
        }
    },{
        timestamps:true
    }
)

export const User = model<UserDocument>("User",userSchema)