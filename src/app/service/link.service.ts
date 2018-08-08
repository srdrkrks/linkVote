import {Injectable} from '@angular/core';
import {Link} from '../model/link';

@Injectable()
export class LinkService {


  private lnkArr: Link[];

  getLinks() {
    return localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : [];
  }

  addLink(link: Link) {
    this.lnkArr = localStorage.getItem('links') ? JSON.parse(localStorage.getItem('links')) : [];
    this.lnkArr.push(link);
    localStorage.setItem('links', JSON.stringify(this.lnkArr));
    return this.lnkArr;
  }


  saveLinks(lnkArr) {
    localStorage.setItem('links', JSON.stringify(lnkArr));
  }

}
