import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from '../dice/dice.component';
import { Dice } from '../dice/dice';

const DICE_VALUES = [
  "one", "two", "three", "four", "five", "six"
]

@Component({
  selector: 'app-dice-game',
  standalone: true,
  imports: [CommonModule, DiceComponent],
  templateUrl: './dice-game.component.html',
  styleUrl: './dice-game.component.css'
})
export class DiceGameComponent {
  dices: Dice[] = [
    { id: 1, value: "four" },
    { id: 2, value: "three" }
  ]

  rollDice(evt: MouseEvent): void {
    const randomizeDice = setInterval(() => {
      this.dices = this.dices.map(({ ...dice }) => {
        return { ...dice, value: DICE_VALUES[Math.floor(Math.random() * 6)] }
      })
    }, 100);

    setTimeout(() => clearInterval(randomizeDice), 2500);
  }
}
