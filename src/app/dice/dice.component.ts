import { Component, Input } from '@angular/core';
import { Dice } from './dice';

@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.css'
})
export class DiceComponent {
  @Input() value: string = ""
}
