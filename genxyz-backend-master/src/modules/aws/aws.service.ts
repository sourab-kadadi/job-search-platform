import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Is3Config } from '../../config/configration.dto';
import { ICreateSignedUrlPostReq, IS3uploadReq, IUpload } from './aws.dto';
import * as AWS from 'aws-sdk';
import { ManagedUpload, PresignedPost, PutObjectRequest } from 'aws-sdk/clients/s3';
import { uuid } from 'uuidv4';
@Injectable()
export class AwsService {
  private s3Config: Is3Config;
  private config;
  constructor(private configService: ConfigService) {
    this.s3Config = this.configService.get<Is3Config>('s3Credential');
    this.config = {
      accessKeyId: this.s3Config.accessKey,
      secretAccessKey: this.s3Config.secrateKey,
      region: this.s3Config.region,
    };
  }

  public async  fileUploadS3(req: IS3uploadReq): Promise<IUpload> {
    let config = this.config;
    let uploadObject: PutObjectRequest = {
      Bucket: this.s3Config.bucketName,
      Body: req.content,
      Key: req.fileName,
      ContentType: req.contentType,
      ACL: req.ACL,
    };

    const s3 = new AWS.S3(config);
    return new Promise((resolve, reject) => {
      s3.upload(uploadObject, (err: Error, data: ManagedUpload.SendData) => {
        if (err) {
          reject(err);
        }
        resolve({
          location: data.Location,
          Etag: data.ETag,
          key: data.Key,
        });
      });
    });
  }

  public async getSignedUrl(req: ICreateSignedUrlPostReq): Promise<PresignedPost> {
    let config = this.config;
    let udid = uuid();
    let preSignedObject: PresignedPost.Params = {
      Bucket: this.s3Config.bucketName,
      Fields: {
        key: `${req.filePath}/${udid}`,
      },
      Conditions: [
        ['starts-with', '$Content-Type', ''],
        ['starts-with', '$key', req.filePath],
        ['content-length-range', 0, 10000000000000]
      ],
    };

    const s3 = new AWS.S3(config);
    return new Promise((resolve, reject) => {
      s3.createPresignedPost(preSignedObject, (err: Error, data: PresignedPost) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
