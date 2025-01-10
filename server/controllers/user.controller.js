import handleAsync from '../middlewares/asyncHandler.middleware.js'
import User from '../models/user.model.js';
import generateResetPasswordEmail from '../templates/mailTemplate.js';
import sendEmail from '../config/nodemailer.js';
import crypto from 'crypto';

export const register = handleAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return  res.status(400).json({message: 'Please enter all fields'})
    }
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({message: 'User already exists'})
    }

    const imgPath = req.file ? req.file.path : null;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: imgPath
        }
    });

    if(!user){
        return res.status(400).json({message: 'User not created, please try again'})
    }

    await user.save();
    user.password = undefined;

    res.status(201).json(
        {
            user,
            message: 'User created successfully'
        }
    );
});

export const login = handleAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({message: 'Please enter all fields'})
    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(404).json({message: 'User not found'})
    }

    if(!(await user.matchPassword(password))){
        return res.status(401).json({message: 'Invalid credentials'})
    }

    user.password = undefined;
    res.status(200).json(
        {
            user,
            message: 'User logged in successfully'
        }
    );
});

export const forgetPassword = handleAsync(async (req, res, next) => {
    const { email } = req.body;
    if(!email){
        return res.status(400).json({message: 'Please enter email'})
    }

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message: 'User not found'})
    }

    const resetToken = user.generateResetPasswordToken();
    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/auth/reset/${resetToken}`;

    const subject = 'Password reset link for your account';
    const message = generateResetPasswordEmail(resetPasswordURL);

    try{
        await sendEmail({email, subject, message});
        res.status(200).json({message: 'Reset link sent successfully'})
    } catch(err){
        user.forgotPasswordToken = undefined;
        user.forgotPasswordToken = undefined;
        await user.save();
        return res.status(500).json({message: 'Email could not be sent'})
    }
});

export const resetPassword = handleAsync(async (req, res, next) => {
    const {resetId} = req.params;
    const {password, confirmPassword} = req.body;

    console.log(resetId);
    console.log(password, confirmPassword);
    

    if(!resetId){
        return res.status(400).json({message: 'Invalid token'})
    }

    if(!password || !confirmPassword){
        return res.status(400).json({message: 'Please enter password and confirm password'})
    }
    
    const forgetPasswordToken = crypto.createHash('sha256').update(resetId).digest('hex');

    console.log("hashedToken :", forgetPasswordToken);
    
    const user = await User.findOne({
        forgotPasswordToken: forgetPasswordToken,
        forgotPasswordExpiry: {$gt: Date.now()}
    });

    console.log(user);

    if(!user){
        return res.status(400).json({message: 'Token expired, please try again'})
    }

    if(password !== confirmPassword){
        return res.status(400).json({message: 'Passwords do not match'})
    }

    user.password = password;

    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();
    res.status(200).json({message: 'Password reset successfully'})
});

export const deleteProfile = handleAsync(async (req, res, next) => {
    const {id} = req.body
    const user = await User.findByIdAndDelete(id);
    if(!user){
        return res.status(404).json({message: 'User not found'})
    }
    res.status(200).json({message: 'User deleted successfully'})
});

export const updateProfile = handleAsync(async (req, res, next) => {
    const { name, email, id } = req.body;

const user = await User.findByIdAndUpdate(
  id,
  {
    name,
    email,
  },
  { new: true }
);

if (!user) {
  return res.status(400).json({ message: "User not found" });
}

if (req.file) {
  user.avatar.secure_url = req.file.path;
  await user.save();
}

res.status(200).json({ user, message: "User updated successfully" });
});

export const changePassword = handleAsync(async (req, res, next) => {
    const { oldPassword ,newPassword, confirmPassword, id } = req.body;
    if(!oldPassword || !newPassword || !confirmPassword){
        return res.status(400).json({message: 'Please enter all fields'})
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json({message: 'Passwords do not match'})
    }

    if(oldPassword === newPassword){
        return res.status(400).json({message: 'New password cannot be same as old password'})
    }

    const user = await User.findById(id).select('+password');
    if(!user){
        return res.status(404).json({message: 'User not found'})
    }

    if(!(await user.matchPassword(oldPassword))){
        return res.status(401).json({message: 'Wrong password'})
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({message: 'Password changed successfully'})
});
