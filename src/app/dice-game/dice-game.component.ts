import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from '../dice/dice.component';
import { Dice } from '../dice/dice';
import { BoardComponent } from '../board/board.component';
import { PlayerComponent } from '../player/player.component';
import { Player } from '../player/player';

@Component({
  selector: 'app-dice-game',
  standalone: true,
  imports: [
    CommonModule, 
    DiceComponent,
    BoardComponent,
    PlayerComponent
  ],
  templateUrl: './dice-game.component.html',
  styleUrl: './dice-game.component.css'
})
export class DiceGameComponent {
  dices: Dice[] = [
    { id: 1, value: 1 },
    { id: 2, value: 1 }
  ];
  diceMove: number = 0;
  players: Player[] = [];
  isRolling: boolean = false;

  ngOnInit() {
    this.players.push(new Player());
  }

  // player logic
  addPlayer(evt: MouseEvent): void {
    const newPlayer = new Player();
    this.players.push(newPlayer);
  }

  // Dice logic
  getDiceValue(): Promise<Dice[]> {
    const randomizeDice = setInterval(() => {
      this.dices = this.dices.map(({ ...dice }) => {
        return { ...dice, value: Math.ceil(Math.random() * 6) }
      })
    }, 100);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        clearInterval(randomizeDice);
        resolve(this.dices);
      }, 2500);
    })
  }

  async rollDice(evt: MouseEvent): Promise<void> {
    this.isRolling = true;
    const diceValues = await this.getDiceValue();
    const totalValue = diceValues.reduce(
      (accum: number, { value }: { value: number }) => accum + value, 0
    );
    this.diceMove = totalValue;
    this.isRolling = false;
  }
}
