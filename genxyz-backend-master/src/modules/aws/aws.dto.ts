export interface IS3uploadReq {
  filePath: string;
  fileName: string;
  s3Path: string;
  contentType: string;
  ACL: string;
  content: string;
  tag?: Itags[];
}

export interface Itags {
  key: string;
  value: string;
}

export interface IUpload {
  location: string;
  Etag: string;
  key: string;
}

export interface ICreateSignedUrlPostReq {
  filePath: string;
}
