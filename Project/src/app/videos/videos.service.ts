import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


const endpoint = 'assets/json/videos.json'; // http://www.yourdomain.com/api/videos/

@Injectable()
export class VideoService {
  // tslint:disable-next-line: deprecation
  constructor(private http: Http) { }

  list() {
      return this.http.get(endpoint)
              .map(response => response.json())
              .catch(this.handleError);
  }
  get(slug) {
      return this.http.get(endpoint)
              .map(response => {
                     const data = response.json().filter(item => {
                                      if (item.slug === slug) {
                                          return item;
                                      }
                                  });
                     if (data.length === 1) {
                         return data[0];
                     }
                     return {};
               })
              .catch(this.handleError);
  }

  search(query) {
    return this.http.get(endpoint)
              .map(response => {
                     const data = [];
                     const req = response.json().filter(item => {
                                    if (item.name.indexOf(query) >= 0) {
                                         data.push(item);
                                    }
                                });
                     return data;
               })
              .catch(this.handleError);

  }

  private handleError(error: any, caught: any): any {
      console.log(error, caught);
  }

}
