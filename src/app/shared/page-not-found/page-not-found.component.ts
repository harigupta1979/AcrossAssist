import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [ RouterModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent  {

  goBack(): void {
    window.history.back();
  }
 
}
