import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { UserDto, LoginDto, ILoginTokenPayload, ILoginPayload, CompanyDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IjwtTokenSecrate } from 'src/config/configration.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async generateHash(password: string): Promise<string> {
    let salt = bcrypt.genSaltSync(12);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  async CreateUser(UserDto: UserDto): Promise<any> {
    try {
      UserDto.psw = await this.generateHash(UserDto.psw);
      const createUser = new this.userModel(UserDto);
      let result = await createUser.save();
      console.log(result);
      return {message: "Registerd Successfully"};
    } catch (error) {
      if (error.code && error.code == 11000) {
        let findDuplicateObjecttoArray = Object.keys(error.keyPattern);
        let DuplicateArrayToString = findDuplicateObjecttoArray.toString();
        throw new HttpException(
          (DuplicateArrayToString == 'phoneNo' ? 'Phone Number' : 'Email')  + ' Aleary Exist',
          HttpStatus.CONFLICT,
        );
      } else {
         throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async verifyUser(LoginDto: LoginDto, UserType: string): Promise<any> {
    try {
      let user = await this.userModel.findOne({ email: LoginDto.email, userType:  UserType});
      let verify = await this.verifyBcrypt(LoginDto.psw, user.psw);
      if (user && verify) {
        let userObj = {
          email: user.email,
          userId: user._id
        };
        return userObj;
      }
      return null;
    } catch (error) {
       throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async updateActiveTime(userId: string): Promise<any> {
    try {
      let user = await this.userModel.updateOne({ userId: userId }, {$set: {lastActiveDate: new Date()}});
      if (user) {
        // let userObj = {
        //   email: user.email,
        //   userId: user._id,
        //   userName: user.userName,
        // };
        return user;
      }
      return null;
    } catch (error) {
       throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verifyBcrypt(psw: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(psw, hash);
  }

  async login(user: any): Promise<ILoginTokenPayload> {
    let aggregate: any[] = await this.userModel.aggregate([
      { $match: { email: user.email } },
      {
        $lookup: {
          from: 'candidateprofiles',
          localField: '_id',
          foreignField: 'userId',
          as: 'profile',
        },
      },
      { $unwind: { path: '$profile', preserveNullAndEmptyArrays: true } },
    ]);
    const payload: ILoginPayload  = {
      firstName: aggregate[0].firstName,
      lastName: aggregate[0].lastName,
      phoneNo: aggregate[0].phoneNo,
      userType: aggregate[0].userType,
      gender: aggregate[0].gender,
      companyName: aggregate[0].companyDetails && aggregate[0].companyDetails.companyName ? aggregate[0].companyDetails.companyName : null,
      email: user.email,
      userId: aggregate[0]._id,
      profileType: aggregate[0].profile &&  aggregate[0].profile.profileType ? aggregate[0].profile.profileType : null,
      profileId:  aggregate[0].profile && aggregate[0].profile._id ?  aggregate[0].profile._id : null,
      expType:  aggregate[0].expType,
      iat: new Date().getTime()
    };
    let accessToken = await this.generateAccessToken(payload);
    let accessCookies = `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=Session`;
    let refreshToken = await this.generateRefreshToken(payload);
    let refreshCookies = `RefreshToken=${refreshToken}; Path=/; Max-Age=Session`;
    return {
      accessToken:{
        cookies: accessCookies,
        token: accessToken
      },
      refreshToken: {
        cookies: refreshCookies,
        token: refreshToken
      },
      payload: payload
    };
  }

  async generateRefreshToken(payload: any) {
    return await this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get('expiryToken.refresh_token_exp')}`
    });
  }

  async generateAccessToken(payload: any) {
    return await this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get('expiryToken.access_token_exp')}`
    });
  }

  logOut() {
      return [
        'Authentication=; HttpOnly; Path=/; Max-Age=0',
        'Refresh=; HttpOnly; Path=/; Max-Age=0'
      ];
  }


  async updateUser(userId: string, updateUser:  UpdateUserDto) {
    let user = await this.userModel.updateOne({ _id: userId }, {$set: updateUser});
    if (user && user.n > 0) {
      return {message: "Updated Successfully"};
    }
    throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
  }


  async updateCompany(userId: string, updateUser:  UpdateUserDto) {
    let user = await this.userModel.updateOne({ _id: userId }, {$set: updateUser});
    if (user && user.n > 0) {
      return {message: "Updated Successfully"};
    }
    throw new HttpException("Something went wrong. Please try after sometime", HttpStatus.INTERNAL_SERVER_ERROR);
  }


  async findUserById(userId: string) {
    let user = await this.userModel.findOne({ _id: userId }, {"projection": {psw: 0}});
    if (user) {
      return {message: "User Information", data: user};
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }
}
