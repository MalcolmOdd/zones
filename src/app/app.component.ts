import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public age = 32;
  public fcMinimale = 58;
  public columnsToDisplay = ["zoneId", "pourcentage", "fcAstrand", "fcKarvonen", "pourcentageEquivalent"];
  public sexe: Sexe = Sexe.Universel;
  public sexeType = Sexe;
  public fcMaximale = 999;
  public zoneDefs : ZoneDef [] = [
    new ZoneDef(1, 50),
    new ZoneDef(2, 60),
    new ZoneDef(3, 70),
    new ZoneDef(4, 80),
    new ZoneDef(5, 90),
  ];
  ngOnInit(): void {
    this.rafraichirFcMax();
  }
  rafraichirFcMax() {
    this.fcMaximale = this.calculerFcMax();
  }
  calculerFcMax() : number {
    switch(this.sexe) {
      case Sexe.Homme:
        return 220 - this.age;
      case Sexe.Femme:
        return 226 - this.age;
      default:
        return 207 - Math.floor(0.7 * this.age);
    }
  }
  getZoneDefs() {
    const topKarvonen = this.fcMaximale - this.fcMinimale;
    for(var zone of this.zoneDefs) {
      zone.fcAstrand = Math.floor(zone.pourcentage *  this.fcMaximale / 100.0);
      zone.fcKarvonen = Math.floor(zone.pourcentage * topKarvonen / 100.0) + this.fcMinimale;
      zone.pourcentageEquivalent = Math.floor(100.0 * zone.fcKarvonen /  this.fcMaximale);
    }
    return this.zoneDefs;
  }
}
class ZoneDef {
  public pourcentage = 0;
  public fcAstrand = 0;
  public fcKarvonen = 0;
  public pourcentageEquivalent = 0;
  constructor(readonly zoneId : number, pourcentageAstrand : number){
    this.pourcentage = pourcentageAstrand;
  }
}
enum Sexe {
  Homme, Femme, Universel
}
