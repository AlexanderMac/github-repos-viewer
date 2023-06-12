import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from '@app/app.component'
import { ReposModule } from '@app/repos/module'
import { SharedModule } from '@shared/module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, SharedModule, ReposModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
