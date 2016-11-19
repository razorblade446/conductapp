import { Component, NgZone, Output } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {Subscription} from 'rxjs/Subscription';

import { KnowledgeBaseService } from '../../app/services/knowledge-base.service';
import { QuestionairePage } from "../questionaire/questionaire";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  initialized: boolean = false;
  @Output() progress: any = 0;
  totalRules: any= 10000;
  subscription: Subscription;

  constructor(private navCtrl: NavController,
              private kbService: KnowledgeBaseService,
              private zone: NgZone,
              private platform: Platform) {
  }

  ionViewDidLoad () {
    console.log('conteo...');
    this.subscription = this.kbService.progress$.subscribe(progress => {this.progress = progress; console.log(progress)});

    this.platform.ready()
      .then(() => {
        this.kbService.initDB();
        setTimeout(() => {
          this.kbService.calculateRulesAndWarns();
          console.log('calculo disparado!');
        }, 1000);
      });
  }

  progressComplete = () => {
    return this.progress >= this.totalRules;
  };

  openQuestionaire = () => {
    this.navCtrl.setRoot(QuestionairePage);
  };
}
