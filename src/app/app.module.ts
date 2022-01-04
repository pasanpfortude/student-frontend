import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { GridComponent } from './grid/grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { EventService } from './services/event.service';
import { NotificationModule } from "@progress/kendo-angular-notification";
import { UploadComponent } from './upload/upload.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import {  DialogsModule } from '@progress/kendo-angular-dialog';
import { DialogComponent } from './dialog/dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    UploadComponent,
    DialogComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    FormsModule,
    GraphQLModule,
    NotificationModule,
    UploadModule,
    DialogsModule
  ],
  providers: [
    EventService,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: EventService) => function() { return service.init(); },
      deps: [EventService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
