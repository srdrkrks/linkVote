import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {LinkService} from '../service/link.service';
import {Link} from '../model/link';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-new-link',
  templateUrl: './new-link.component.html',
  styleUrls: ['./new-link.component.css']
})
export class NewLinkComponent implements OnInit {

  private link: Link;
  linkn: string = '';
  linku: string = '';


  constructor(private linkService: LinkService, private toastr: ToastrService) {

  }

  ngOnInit() {
  }

  createLink(linkName: string, linkUrl: string) {
    /*    console.log(linkName, linkUrl, 0);*/


    const ls = this.linkService.getLinks().filter(function (obj) {
      return obj.url === linkUrl;
    });

    if ((!linkName || !linkUrl) || ls.length > 0) {
      this.toastr.warning('Check Values');
    } else {
      this.linkn = '';
      this.linku = '';
      const ll = new Link();
      ll.name = linkName;
      ll.url = linkUrl;
      ll.vote = 0;
      this.linkService.addLink(ll);
      this.toastr.success('Success');
    }
  }

}
