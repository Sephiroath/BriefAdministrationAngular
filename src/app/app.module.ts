import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';


import { AppComponent } from './app.component';
import { TopnavbarComponent } from './common/topnavbar/topnavbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';

import { ProjectService } from './services/job/project.service';


@NgModule({
  declarations: [
    AppComponent,
    TopnavbarComponent,
    HomeComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ ProjectService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
