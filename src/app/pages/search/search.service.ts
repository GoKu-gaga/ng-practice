import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {
  baseUrl = 'http://192.168.1.151:3000';

  constructor(private http: HttpClient) { }

  getHot() {
    return this.http.get(this.baseUrl + '/search/hot').pipe(
      map((data: any) => {
        return data.result.hots.map(item => item.first);
      })
    );
  }

  getSuggest(keyword: string): Observable<string[]> {
    const params = new HttpParams().set('keywords', keyword);
    return this.http.get(this.baseUrl + '/search/suggest', {params: params}).pipe(
      map((data: any) => {
        if (data.result && data.result.songs) {
          return data.result.songs.map(item => item.name);
        }
      })
    );
  }

  search(keyword: string) {
    const params = new HttpParams().set('keywords', keyword);
    return this.http.get(this.baseUrl + '/search', {params: params}).pipe(
      map((data: any) => {
        if (data.result && data.result.songs) {
          return {
            total: data.result.songCount,
            list: data.result.songs
          };
        }
      })
    );
  }

}
