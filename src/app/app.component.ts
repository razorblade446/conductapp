import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { QuestionairePage } from '../pages/questionaire/questionaire';


@Component({
  templateUrl: 'app.component.html' 
})
export class MyApp{
  rootPage = HomePage;

  pages: Array<{title: string, component: any}>;

  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    console.log('test');

    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Cuestionario', component: QuestionairePage }
    ];
  }

  openPage = (page: any) => {
    this.nav.setRoot(page.component);
  }
}
