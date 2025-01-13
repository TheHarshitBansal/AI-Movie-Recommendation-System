import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate : {
            validator: function(email){
                return validator.isEmail(email);
            },
            message: "Email is invalid", 
        },
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, 'Password should be atleast 8 characters long'],
        select: false,
        trim: true,
    },
    subscription:{
        id:{
        type:String,
        default : null
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    avatar:{
        public_id:{
            type:'String'
        },
        secure_url:{
            type:'String'
        }
    },
    forgotPasswordToken:{
        type: 'String'
    },
    forgotPasswordExpiry: Date,
}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods={
    matchPassword: async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password);
    },
    generateResetPasswordToken: function(){
        const resetToken = crypto.randomBytes(20).toString('hex');
        this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000;
        return resetToken;
    }
}

const User = mongoose.model('User', userSchema);
export default User;