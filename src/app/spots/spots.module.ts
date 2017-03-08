import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';

import {GenericSpotDirective} from './generic-spot.directive';
import {SpotsComponent} from './spots.component'


import { TextSpotComponent } from './text-spot.component';
import { GallerySpotComponent } from './gallery-spot.component';
import { UsersSpotComponent } from './users-spot.component';


export const Spots = [TextSpotComponent, GallerySpotComponent, UsersSpotComponent];

@NgModule({
	declarations:[
		GenericSpotDirective,
		SpotsComponent,
		...Spots
	],
	imports:[
		SharedModule
	],
	entryComponents:[
		SpotsComponent,
		...Spots
	],
	exports:[
		SpotsComponent
	]
})
export class SpotsModule {}

