import {Schema , model ,Document} from "mongoose"

export interface SchoolDocument extends Document {
    name:string,
    address?:string,
    status:"active" | "inactive",
    createdAt:Date,
    updatedAt:Date
}


const schoolSchema = new Schema<SchoolDocument>(
    {
        name:{
            type:String,
            required:true,
            unique:true,
            trim:true

        },
        address:{
            type:String,
            trim:true
        },
        
           status:{
            type:String,
            enum:["active","inactive"],
            default:"active"
           } ,
           
        },{
            timestamps:true
        }
    
)

export const School = model<SchoolDocument>("School",schoolSchema)