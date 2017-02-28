import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AudioTimePipe } from './audio-time.pipe';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { AudioListComponent } from './audio-list/audio-list.component';
import { AudioItemComponent } from './audio-list/audio-item.component';
import { AudioService } from './audio.service';
import { routing } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    AudioTimePipe,
    AudioPlayerComponent,
    AudioListComponent,
    AudioItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [AudioService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
