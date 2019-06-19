import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

export type AdminModel = mongoose.Document & {
    name: string;
    email: string;
    password: string;
    role: string;
};

export const adminSecret = 'sdHvj5bS3rq765hSDs';

const AdminSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    role: String
}, {timestamps: true});

const Admin: Model<AdminModel> = mongoose.model<AdminModel>('Admin', AdminSchema);
export default Admin;
