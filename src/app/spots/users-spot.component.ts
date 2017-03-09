import { Component, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { isBrowser } from 'angular2-universal';

@Component({
	selector:'users-spot',
	template: `
		<h2>Users</h2>
		<div *ngFor="let user of users">
			{{user.name}} - {{user.company}}
		</div>
	`
})
export class UsersSpotComponent {

	static ref = 'users';

	@Input()
	public data;

	users:any[];
	constructor(private http: Http) {
			if(isBrowser) {
    		this.getUsers().subscribe(data => this.users = data);
			}
	}

  getUsers() {
    return this.http.get(`/api/users`)
    .map((res:Response) => res.json());
  }
}