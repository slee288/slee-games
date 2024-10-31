import { Component, Input } from '@angular/core';

const DICE_VALUES = [
  "one", "two", "three", "four", "five", "six"
]

@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.css'
})
export class DiceComponent {
  @Input() value: number = 1;
  diceValue: string = "one";

  ngOnInit() {
    this.diceValue = DICE_VALUES[this.value - 1];
  }
}
