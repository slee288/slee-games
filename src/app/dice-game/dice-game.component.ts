import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from '../dice/dice.component';
import { Dice } from '../dice/dice';
import { BoardComponent } from '../board/board.component';

const DICE_VALUES = [
  "one", "two", "three", "four", "five", "six"
]

@Component({
  selector: 'app-dice-game',
  standalone: true,
  imports: [
    CommonModule, 
    DiceComponent,
    BoardComponent
  ],
  templateUrl: './dice-game.component.html',
  styleUrl: './dice-game.component.css'
})
export class DiceGameComponent {
  dices: Dice[] = [
    { id: 1, value: 4 },
    { id: 2, value: 3 }
  ];
  diceMove: number = 0;

  getDiceValue(): Promise<Dice[]> {
    const randomizeDice = setInterval(() => {
      this.dices = this.dices.map(({ ...dice }) => {
        return { ...dice, value: Math.ceil(Math.random() * 6) }
      })
    }, 100);

    setTimeout(() => {
      clearInterval(randomizeDice);
      return this.dices;
    }, 2500);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        clearInterval(randomizeDice);
        resolve(this.dices);
      }, 2500);
    })
  }

  async rollDice(evt: MouseEvent): Promise<void> {
    const diceValues = await this.getDiceValue();
    const totalValue = diceValues.reduce(
      (accum: number, { value }: { value: number }) => accum + value, 0
    );
    this.diceMove = totalValue;
  }
}
