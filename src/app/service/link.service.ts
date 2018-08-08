import {Injectable} from '@angular/core';
import {Link} from '../model/link';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LinkService {


  constructor(private http: HttpClient) {

  }

  private lnkArr: Link[];

  getLinks() {
    return localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : [];
  }

  addLink(link: Link) {
    this.lnkArr = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : [];
    this.lnkArr.push(link);
    this.sendReport(link);
    localStorage.setItem('links', JSON.stringify(this.lnkArr));
    return this.lnkArr;
  }


  saveLinks(lnkArr) {
    localStorage.setItem('links', JSON.stringify(lnkArr));
  }

  sendReport(link: Link) {
    const headers = new Headers({'Content-type': 'application/json'});
    this.http.post('https://votechallenge-e29a3.firebaseio.com/votes.json', link).subscribe((x) => {
      /*console.log(x);*/
    });

  }

}
