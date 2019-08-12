import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

type AdminType = AdminModel & mongoose.Document; 

export interface AdminModel {
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

const Admin: Model<AdminType> = mongoose.model<AdminType>('Admin', AdminSchema);
export default Admin;
