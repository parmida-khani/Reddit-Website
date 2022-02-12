import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SendRequestService {
  public static async sendRequest(
    url: string,
    hasJson: boolean,
    body?: object,
    put?:boolean
  ): Promise<any> {
    const init: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://songs.code-star.ir/user/alter',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
    };
    if (body) {
      init.method = 'POST';
      init.body = JSON.stringify(body);
    }
    if(put){
      init.method='PUT'
    }
    return fetch(url, init).then((res) => {
      if (res.ok) {
        if (hasJson) return res.json();
        return;
      }
      throw res.json();
    });
  }
}
