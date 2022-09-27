import {Schema, model} from "mongoose";

const userSchema = new Schema({
    email: {
        type: "String",
        required: true,
        unique: true,
        lowercase: true,

    },
    password: {
        type: "String",
        required: true,
        unique: true,
        lowercase: true,

    }
})

export const User = model("user", userSchema)