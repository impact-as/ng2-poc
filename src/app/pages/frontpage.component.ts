import { Component, Input } from '@angular/core';

@Component({
	selector:'frontpage',
	template:`
		<div class="content">
			<div class="full">
				<h1>{{data.MetaData.PageTitle}}</h1>
			</div>
			<div class="full">
				<spots [spots]="data.Content"></spots>
			</div>
		</div>
	`
})
export class FrontpageComponent {
	@Input() 
	public data;

	static ref = 'Frontpage'

}