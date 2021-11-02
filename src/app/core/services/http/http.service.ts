import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { RequestParams } from '../../interface/request-param';
import {environment} from 'src/environments/environment';
import * as _ from 'lodash-es';
import { UserService } from '../user/user.service';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl;
  userDetail:any={};
  constructor(
    private http: HTTP,
    private userService:UserService,
    private loaderService: LoaderService
    ) {
    this.baseUrl=environment.baseUrl;
  }

  async setHeaders() {
    let token = await this.userService.getToken();
    const headers = {
      'X-auth-token':  token ? token : "", 
      'Content-Type': 'application/json',
    }
    return headers;
  }

  async post(requestParam: RequestParams) {
    await this.loaderService.startLoader();
    const headers = await this.setHeaders();
    let body = requestParam.payload ? requestParam.payload : {};
    console.log(headers);
    let data:any =await this.http.post(this.baseUrl + requestParam.url, body, headers)
    try {
      let result: any = JSON.parse(data.data);
      this.loaderService.stopLoader();
      if (result.responseCode === "OK") {
        return result;
      }
    }
    catch (error) {
      this.loaderService.stopLoader();
      console.log(error);
    }
  }

}
