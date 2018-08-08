import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NewLinkComponent} from './new-link/new-link.component';
import {RouterModule, Routes} from '@angular/router';
import {VoteListComponent} from './vote-list/vote-list.component';
import {BsDropdownModule, PaginationModule} from 'ngx-bootstrap';
import {LinkService} from './service/link.service';
import {OrderByPipe} from './pipe/orderByPipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';


const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/list'},
  {path: 'list', component: VoteListComponent},
  {path: 'new', component: NewLinkComponent},
];



@NgModule({
  declarations: [
    AppComponent,
    NewLinkComponent,
    VoteListComponent,
    OrderByPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    PaginationModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers:
    [LinkService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
