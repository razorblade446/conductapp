import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Rule } from "../../app/models/rule.model";

@Component({
  selector: 'page-questionaire',
  templateUrl: 'questionaire.html'
})
export class QuestionairePage {
  private ruleModel: Rule = new Rule;
  private ruleItems: any = [];

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad = () => {
    this.ruleItems = [
      {
        label: 'Es menor de 16 Años?',
        model: this.ruleModel.age16
      },{
        label: 'Es menor de 18 Años?',
        model: this.ruleModel.age18
      },{
        label: 'Es menor de 60 Años?',
        model: this.ruleModel.age60
      },{
        label: 'Es menor de 80 Años?',
        model: this.ruleModel.age80
      },{
        label: 'Posee permiso de los padres?',
        model: this.ruleModel.parentPermission
      },{
        label: 'Sabe leer y escribir?',
        model: this.ruleModel.canRW
      },{
        label: 'Cursó y aprobó prueba teórica?',
        model: this.ruleModel.theoricTest
      },{
        label: 'Cursó y aprobó prueba práctica?',
        model: this.ruleModel.practiceTest
      },
    ];
  };
}
