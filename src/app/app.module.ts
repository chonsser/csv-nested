import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule} from '@angular/common/http';
import { ListEntryComponent } from './list-entry/list-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListEntryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
