// import * as bcrypt from 'bcrypt-nodejs';
// import * as crypto from 'crypto';
// import * as mongoose from 'mongoose';
// import { Model } from 'mongoose';
//
// export type SystemUserModel = mongoose.Document & {
//     username: string,
//     password: string,
//     passwordResetToken: string,
//     passwordResetExpires: Date,
//
//     tokens: Array<AuthToken>,
//
//     profile: {
//         name: string,
//         gender: string,
//         picture: string
//     },
//
//     comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void
// };
//
// export interface AuthToken {
//     accessToken: string;
//     kind: string;
// }
//
// export const SystemUserSchema = new mongoose.Schema({
//     password: String,
//     passwordResetExpires: Date,
//     passwordResetToken: String,
//     username: { type: String, unique: true },
//
//     tokens: Array,
//
//     profile: {
//         gender: String,
//         name: String,
//         picture: String
//     }
// }, { timestamps: true });
//
// /**
//  * Password hash middleware.
//  */
// SystemUserSchema.pre('save', function (next) {
//     const user = this;
//     if (!user.isModified('password')) { return next(); }
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) { return next(err); }
//         bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
//             if (err) { return next(err); }
//             user.password = hash;
//             next();
//         });
//     });
// });
//
// SystemUserSchema.methods.comparePassword = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => {
//     bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error , isMatch: boolean) => {
//         cb(err, isMatch);
//     });
// };
//
//
// /**
//  * Helper method for getting user's gravatar.
//  */
// SystemUserSchema.methods.gravatar = (size: number) => {
//     if (!size) {
//         size = 200;
//     }
//     if (!this.username) {
//         return `https://gravatar.com/avatar/?s=${size}&d=retro`;
//     }
//     const md5 = crypto.createHash('md5').update(this.username).digest('hex');
//     return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
// };
//
// // export const Agent: UserType = mongoose.model<UserType>('Agent', userSchema);
// const SystemUser: Model<SystemUserModel> = mongoose.model<SystemUserModel>('SystemUser', SystemUserSchema);
// export default SystemUser;
