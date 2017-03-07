import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  template: `
		<ul class="navigation">
			<li *ngFor="let page of pages"><a [routerLink]="page.Url">{{page.NavigationTitle}}</a></li>
		</ul>

		<router-outlet></router-outlet>

  `,
})
export class AppComponent {
	pages:any[];
	constructor(private http: Http) {
    	this.getmenu().subscribe(data => this.pages = data);
	}

  getmenu() {
    return this.http.get(`/api/menu`)
    .map((res:Response) => res.json());
  }
}
