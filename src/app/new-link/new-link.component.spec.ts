import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {NewLinkComponent} from './new-link.component';
import {LinkService} from '../service/link.service';
import {} from 'jasmine';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {VoteListComponent} from '../vote-list/vote-list.component';
import {PaginationModule} from 'ngx-bootstrap';
import { HttpClientModule} from '@angular/common/http';

describe('NewLinkComponent', () => {
  let component: NewLinkComponent;
  let fixture: ComponentFixture<NewLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewLinkComponent],
      providers: [LinkService],
      imports: [HttpClientModule, PaginationModule.forRoot(), FormsModule, ToastrModule.forRoot({
        positionClass: 'toast-top-center',
        preventDuplicates: true,
      })]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new link to array', () => {
    fixture = TestBed.createComponent(NewLinkComponent);
    const app = fixture.debugElement.componentInstance;
    const slinkService = fixture.debugElement.injector.get(LinkService);
    const beforeAdd = slinkService.getLinks().length;
    fixture.detectChanges();
    slinkService.addLink({name: 'test', url: 'http://example.com', vote: 0});
    expect(slinkService.getLinks().length).toBeGreaterThan(beforeAdd);
  });


});
