import { Document } from 'mongoose';

export interface JobPost extends Document {
    readonly giverId: any,
    readonly companyName: string;
    readonly status: boolean,
    readonly giverType: EGiverType,
    readonly jobTitle: string,
    readonly jobDescription: string,
    readonly vacancies: number,
    readonly keyWord: IkeyWords[],
    readonly workExp: IworkExp,
    readonly ctc: Ictc,
    readonly industry: string,
    readonly funcArea: string,
    readonly location: Ilocation,
    readonly upload: string,
    readonly type: string,
    readonly logo: string
 }

 enum EGiverType {
    COMPANY="COMPANY",
    INDIVIDUAL="INDIVIDUAL"
 }

 interface Ilocation {
   country: string;
   state: string;
   city: string;
 }

 interface IworkExp {
   readonly min: number,
   readonly max: number
 }

 interface Ictc {
   readonly min: number,
   readonly max: number,
   readonly currency: Icurrency
 }

 interface IkeyWords {
   name: string;
 }

 interface Icurrency {
   name: string,
   symbol: string;
 }