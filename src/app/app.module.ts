import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QuestionairePage } from '../pages/questionaire/questionaire'; 

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuestionairePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuestionairePage
  ],
  providers: []
})
export class AppModule {}
