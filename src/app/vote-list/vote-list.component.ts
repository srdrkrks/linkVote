import {Component, OnInit} from '@angular/core';
import {PageChangedEvent} from 'ngx-bootstrap';
import {Link} from '../model/link';
import {LinkService} from '../service/link.service';

import Swal, {default as swal} from 'sweetalert2';

@Component({
  selector: 'app-vote-list',
  templateUrl: './vote-list.component.html',
  styleUrls: ['./vote-list.component.css']
})

export class VoteListComponent implements OnInit {
  contentArray = new Array(90).fill('');
  returnedArray: string[];
  voteType: boolean;

  startItem = 0;
  endItem = 5;

  links: Link[];
  linkItem: Link;

  orderByType = 'desc';


  hoveredDivId;
  defaultDivStyles = {'opacity': '0'};
  hoveredDivStyles = {'opacity': '1'};


  constructor(private linkService: LinkService) {
    this.links = this.linkService.getLinks();
    /*console.log(this.linkService.getLinks());*/
    /* this.links = [
       {name: 'google', url: 'http://www.google.com', vote: 10},
       {name: 'yahoo', url: 'http://www.yahoo.com', vote: 20},
       {name: 'mynet', url: 'http://www.mynet.com', vote: 30},
       {name: 'pyksys', url: 'http://www.pyksys.com', vote: 14},
       {name: 'Serdar Karakaş', url: 'http://www.serdarkarakas.com', vote: 24},
       {name: 'Product Hunt', url: 'http://www.producthunt.com', vote: 14},
       {name: 'Reddit', url: 'http://www.reddit.com', vote: 12},
       {name: 'facebook', url: 'http://www.facebook.com', vote: 37},
       {name: 'twitter', url: 'http://www.twitter.com', vote: 54},
       {name: 'Kahkaha', url: 'http://www.kahkaha.com', vote: 124},
       {name: 'hepsiburada', url: 'http://www.hepsiburada.com', vote: 125}
     ];*/
  }

  orderBy(sortType: boolean) {
    /*console.log(sortType);*/
    this.orderByType = sortType ? 'desc' : 'asc';

    this.contentArray = this.links.sort(this.compareValues('vote', this.orderByType));
    this.returnedArray = this.contentArray.slice(this.startItem, this.endItem);
  }

  vote(voteType: boolean, url: string) {

    this.linkItem = this.links.filter(obj => {
      return obj.url === url;
    })[0];
    voteType ? this.linkItem.vote++ : this.linkItem.vote--;
    this.linkService.saveLinks(this.links);

    this.contentArray = this.links.sort(this.compareValues('vote', this.orderByType));
    this.returnedArray = this.returnedArray.sort(this.compareValues('vote', this.orderByType));
  }


  compareValues(key, order = 'desc') {
    return function (a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }


  showDivWithHoverStyles(divId: string) {
    /*console.log(divId);*/
    this.hoveredDivId = divId;
  }

  showAllDivsWithDefaultStyles() {
    this.hoveredDivId = null;
  }

  delLink(link: string) {
    /*console.log('del ', link);*/

    this.links = this.links.filter(function (obj) {
      return obj.url !== link;
    });

    this.linkService.saveLinks(this.links);

    this.contentArray = this.links.sort(this.compareValues('vote', this.orderByType));
    this.returnedArray = this.returnedArray.sort(this.compareValues('vote', this.orderByType));
    this.returnedArray = this.contentArray.slice(this.startItem, this.endItem);

  }

  delRequest(link: string, name: string) {

    const that = this;
    swal({
      title: 'Do you want to remove:',
      text: name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function (e) {
      if (e.value) {
        that.delLink(link);
        swal(
          'Deleted!',
          'Link has been deleted.',
          'success'
        );
      }

    });
  }

  ngOnInit(): void {
    this.contentArray = this.links.sort(this.compareValues('vote', this.orderByType));
    this.returnedArray = this.contentArray.slice(0, 5);
  }

  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(this.startItem, this.endItem);
  }
}
