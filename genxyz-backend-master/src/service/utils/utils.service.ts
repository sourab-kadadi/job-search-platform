import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UtilsService {

    constructor(private httpService: HttpService) {}

    async getDataFromUrl(url: string): Promise<Observable<any>> {
        let file = await this.httpService.get(url, { responseType: "arraybuffer" });
        return file;
    }
}
