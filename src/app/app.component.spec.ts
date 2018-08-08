import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';

import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {VoteListComponent} from './vote-list/vote-list.component';
import {NewLinkComponent} from './new-link/new-link.component';
import {LinkService} from './service/link.service';
import {FormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [LinkService],
      imports: [
        FormsModule,
        PaginationModule.forRoot(),
        RouterTestingModule.withRoutes(
          [
            {path: '', pathMatch: 'full', redirectTo: '/list'},
            {path: 'new', component: NewLinkComponent},
            {path: 'list', component: VoteListComponent}]),
      ],
      declarations: [
        AppComponent, VoteListComponent, NewLinkComponent
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'HepsiburadaCase'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('HepsiburadaCase');
  }));

  it('should \n' + 'logo class contains \'Hepsiburada\' text', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.slogo').textContent).toContain('Hepsiburada');
  }));
});
