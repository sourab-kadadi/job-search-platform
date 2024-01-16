import { Document } from 'mongoose';

export interface JobApply extends Document {
    readonly jobPostId: any;
    readonly candidateUserId: any;
    readonly candidateName: string;
    readonly companyId: any;
    readonly companyName: string;
    readonly createdAt: Date;
}
