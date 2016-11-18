import { Injectable } from '@angular/core';
import { Rule } from '../models/rule.model';

import * as PouchDB from 'pouchdb';

@Injectable()

export class KnowledgeBaseService {
  private _db;
  private _rules;

  initDB = () => {
    this._db = new PouchDB('conductapp', { adapter: 'websql' });
  };

  addRule = (rule: any) => {
    return this._db.post(rule);
  };

  updateRule = (rule: any) => {
    return this._db.put(rule);
  };

  removeRule = (rule: any) => {
    this._db.remove(rule);
  };

  getAllRules = () => {
    if (!this._rules) {
      return this._db.allDocs({ include_docs: true})
        .then(docs => {
          this._rules = docs.rows.map(row => {
            return row.doc;
          });

          this._db.changes({ live: true, since: 'now', include_docs: true}).
            on('change', this.onDatabaseChange);
        });
    }
  };

  private onDatabaseChange = (change: any) => {
    var index = this.findIndex(this._rules, change.id);
    var rule = this._rules[index];

    if (change.deleted) {
      if (rule) {
        this._rules.splice(index, 1); // Elimina el registro
      }
    } else {
      if (rule && rule._id === change.id) {
        this._rules[index] = change.doc; // Actualiza el registro
      } else {
        this._rules.splice(index, 0, change.doc); // Inserta el registro
      }
    }
  };

  private findIndex = (array: any, id: any) => {
    var low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
  };

  /*
   Las siguientes son las reglas y sus validadores, las usaremos para inicializar
   la base de conocimiento.

   Las siguientes son las variables:

   1. age16 = Edad menor de 16
   2. age18 = Edad menor de 18
   3. age60	= Edad menor de 60
   4. age80 = Edad menor de 80
   5. parentPermission = Permiso de los padres para menores de edad
   6. canRW = Sabe leer y escribir
   7. theoricTest = Aprobó exámen Teórico
   8. practiceTest = Aprobó examen práctico
   9. visuallyDiminished = Disminuido Visualmente
   10. visuallyImpaired = Discapacitado Visualmente
   11. auditionDiminished = Disminuido Auditivamente
   12. auditionImpaired = Discapacitado Auditivamente
   13. phisicallyDiminished = Disminuido Físicamente
   14. phisicallyImpaired = Discapacitado Físicamente

   */

  private _ruleCanAccessLicense = (rule: Rule) => {
    return !rule.age16 &&
      ((rule.age18 && rule.parentPermission) || rule.age60 || rule.age80) &&
      !(rule.auditionImpaired || rule.visuallyImpaired || rule.phisicallyImpaired);
  };

  private _ruleWarnVisualDevice = (rule: Rule) => {
    return rule.visuallyDiminished;
  };

  private _ruleWarnAudioDevice = (rule: Rule) => {
    return rule.auditionDiminished;
  };

  private _ruleWarnPhisicalDevice = (rule: Rule) => {
    return rule.phisicallyDiminished;
  };

}
