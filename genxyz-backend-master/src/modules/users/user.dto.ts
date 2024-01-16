import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { ExpType, Gender, UserType } from "./user.interface";

export class CompanyDetails {
    @IsNotEmpty({message: "Company Name Should Not be Empty!"})
    companyName: string;
    logo?: string;
}
export class UserDto {
    @IsNotEmpty({message: "First Name Should Not be Empty!"})
    @Length(1, 10)
    readonly firstName: string;
    @IsNotEmpty({message: "Last Name Should Not be Empty!"})
    readonly lastName: string;
    @IsNotEmpty({message: "Last Name Should Not be Empty!"})
    psw: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty({message: "Phone Number Should Not be Empty!"})
    readonly phoneNo: string;
    @IsNotEmpty({message: "Please choose your gender"})
    readonly gender: Gender
    readonly expType?: ExpType
 }

 export class CompanyDto extends UserDto {
    readonly companyDetails: CompanyDetails;
 }


 export class UpdateUserDto {
    @IsNotEmpty({message: "First Name Should Not be Empty!"})
    @Length(1, 10)
    readonly firstName: string;
    @IsNotEmpty({message: "Last Name Should Not be Empty!"})
    readonly lastName: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty({message: "Phone Number Should Not be Empty!"})
    readonly phoneNo: string;
    // @IsNotEmpty({message: "Phone Number  Should Not be Empty!"})
    // readonly gender: Gender
 }

 export class CompanyDetailsUpdateDto {
    logo: string;
}

 export class CompanyUpdateDto  extends UpdateUserDto {
    readonly companyDetails: CompanyDetailsUpdateDto;
 }

export class LoginDto {
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly psw: string;
}

export interface ILoginqRes {
    accessToken: ITokenRes;
    refreshToken: ITokenRes;
}

export interface ITokenRes {
    cookies: string;
    token: string;
}

export interface ILoginTokenPayload extends ILoginqRes {
    payload: ILoginPayload;
}

export interface ILoginPayload {
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    gender: Gender;
    userType: UserType;
    userId: string;
    profileType: string;
    profileId: string;
    iat: number;
    companyName?: string;
    expType?: string;
}

export class IRenewRefreshToken {
    refreshToken: string;
}