import moongose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new moongose.Schema({
    email: {
        type: "String",
        required: true,
        unique: true,
        lowercase: true,

    },
    password: {
        type: "String",
        required: true,
    }
})

userSchema.pre("save", async function(next) {
    const user = this
    if (!user.isModified("password")) return next()
    try {
       const salt = await bcryptjs.genSalt(12)
       user.password = await bcryptjs.hash(user.password, salt)
    } catch (error) {
        console.log(error)
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = moongose.model("user", userSchema)