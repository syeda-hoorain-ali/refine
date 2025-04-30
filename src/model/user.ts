import mongoose, { Document, Schema } from "mongoose";


export interface UserCart {
    productId: string;
    quantity: number;
}

export interface User extends Document {
    email: string;
    logo: string;
    username: string;
    password: string;
    cart: UserCart[];
}

const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    
    logo: {
        type: String,
        required: true,
    },
    
    username: {
        type: String,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
    },

    cart: [{
        productId: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
    }]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)
export default UserModel;
