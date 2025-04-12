import {Schema,model,Document} from 'mongoose'

export interface IBlog extends Document{
    title:string;
    content:string;
    category:string;
    tags:string[];
}

const BlogSchema = new Schema<IBlog> (
   {
    title: {type:String,required:true},
    content:{type:String,required:true},
    category:{type:String,required:true},
    tags:{type:[String],required:true}
   }
)

export default model<IBlog>("Blog", BlogSchema);