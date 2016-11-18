import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { KnowledgeBaseService } from '../../app/services/knowledge-base.service';
import {QuestionairePage} from "../questionaire/questionaire";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController,
              private kbService: KnowledgeBaseService,
              private zone: NgZone,
              private platform: Platform) {
  }

  ionViewDidLoad () {
    console.log('loader..');
    this.platform.ready()
      .then(() => {
        this.kbService.initDB();
      });
  }

  openQuestionaire = () => {
    this.navCtrl.setRoot(QuestionairePage);
  };

}
