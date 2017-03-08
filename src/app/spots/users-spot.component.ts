import { Component, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { isBrowser, isNode } from 'angular2-universal';

@Component({
	selector:'users-spot',
	template: `
	<h2>Users</h2>
		<div *ngFor="let user of users">{{user.name}} - {{user.company}}</div>
	`
})
export class UsersSpotComponent {

	static ref = 'users';

	@Input()
	public data;

	users:any[];
	constructor(private http: Http) {
		//setTimeout( ()=> {
			if(isBrowser) {
    		this.getUsers().subscribe(data => this.users = data);
			}
		//}, 10000);
	}

  getUsers() {
    return this.http.get(`/api/users`)
    .map((res:Response) => res.json());
  }
}