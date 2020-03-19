import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
  path: 'sample-form',
  component: SampleFormComponent,
}];

@NgModule({
  declarations: [
    AppComponent,
    SampleFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
