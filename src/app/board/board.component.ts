import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  @ViewChild("board", { static: true }) board: ElementRef<HTMLDivElement> | undefined;
  playerPosition: number = 0;
  @Input() diceMove: number = 0;

  moveDice(): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.playerPosition += 1;
        this.diceMove -= 1;
        resolve(this.diceMove);
      }, 400);
    })
  }
  
  async ngOnChanges() {
    for(let i = this.diceMove; i > 0; i--) {
      await this.moveDice();
      // untoggle the previous position, toggle the current position
      const boardSpaces = this.board?.nativeElement.getElementsByClassName("playspace");
      if(boardSpaces) {
        const prevPosition = (this.playerPosition + 27) % 28;
        boardSpaces[prevPosition].classList.remove("on-board");
        boardSpaces[this.playerPosition].classList.add("on-board");
      }
    }
  }
}
