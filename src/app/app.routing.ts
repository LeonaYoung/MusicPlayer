import { Routes,RouterModule } from '@angular/router';

import {AudioListComponent} from './audio-list/audio-list.component';
import {AudioRecommendComponent} from './audio-recommend/audio-recommend.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path:'list', component: AudioListComponent},
  { path:'recommend', component: AudioRecommendComponent},
  { path: 'list/:id', component: AudioPlayerComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);