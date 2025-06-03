import e from 'express';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: {
    type: String,
    require: function () {
      return !this.googleId; // اجعل كلمة المرور مطلوبة للتسجيل المحلي فقط
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});
