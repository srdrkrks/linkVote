import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VoteListComponent} from './vote-list.component';
import {PaginationModule} from 'ngx-bootstrap';
import {LinkService} from '../service/link.service';
import {Link} from '../model/link';
import {NewLinkComponent} from '../new-link/new-link.component';


describe('VoteListComponent', () => {
  let component: VoteListComponent;
  let fixture: ComponentFixture<VoteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoteListComponent],
      providers: [LinkService],
      imports: [PaginationModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should links array length greater than 0', () => {
    fixture = TestBed.createComponent(VoteListComponent);
    const app = fixture.debugElement.componentInstance;
    const linkService = fixture.debugElement.injector.get(LinkService);
    fixture.detectChanges();
    expect(linkService.getLinks().length).toBeGreaterThan(0);
  });

  it('should increase vote', () => {
    fixture = TestBed.createComponent(VoteListComponent);
    const app = fixture.debugElement.componentInstance;
    const linkService = fixture.debugElement.injector.get(LinkService);
    fixture.detectChanges();

    const beforeVote = linkService.getLinks()[0].vote;

    component.vote(true, linkService.getLinks()[0].url);

    console.log(linkService.getLinks()[0].vote, beforeVote);

    expect(linkService.getLinks()[0].vote).toBeGreaterThan(beforeVote);
  });

  it('should decrease vote', () => {
    fixture = TestBed.createComponent(VoteListComponent);
    const app = fixture.debugElement.componentInstance;
    const linkService = fixture.debugElement.injector.get(LinkService);
    fixture.detectChanges();

    const beforeVote = linkService.getLinks()[0].vote;

    component.vote(false, linkService.getLinks()[0].url);

    console.log(linkService.getLinks()[0].vote, beforeVote);

    expect(linkService.getLinks()[0].vote).toBeLessThan(beforeVote);
  });

  it('should delete link object', () => {
    fixture = TestBed.createComponent(VoteListComponent);
    const app = fixture.debugElement.componentInstance;
    const linkService = fixture.debugElement.injector.get(LinkService);
    fixture.detectChanges();

    const beforedelete = linkService.getLinks().length;
    component.delLink(linkService.getLinks()[0].url);
    expect(beforedelete).toBeGreaterThan(linkService.getLinks().length);
  });


});
