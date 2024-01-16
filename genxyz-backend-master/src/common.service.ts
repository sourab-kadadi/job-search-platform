import { ApiProperty } from "@nestjs/swagger";
export class IModuleRes {
    @ApiProperty()
    status?: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    error?: string;
}

export class IDataModuleRes<T> {
    @ApiProperty()
    status: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    error?: string;
    @ApiProperty()
    data?: T;
}

export class IResponce<T> extends IModuleRes {
    status: boolean;
    message: string;
    responce?: T;
}

