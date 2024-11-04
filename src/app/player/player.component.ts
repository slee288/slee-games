import { Component, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  @Input() board: HTMLDivElement | undefined = undefined;
  @Input() move: number = 0;
  playerPosition: number = 0;
  @ViewChild("playerinstance", { static: true }) player: ElementRef<HTMLDivElement> | undefined;

  ngOnInit() {
    this.setPlayer()
  }

  setPlayer(): void {
    const playspaces = this.board?.querySelectorAll(".playspace");
    const initialSpacePosition = playspaces?.[this.playerPosition].getBoundingClientRect() || { top: 0, bottom: 0, left: 0, right: 0 };


    if(this.player?.nativeElement) {
      this.player.nativeElement.style.top = (initialSpacePosition.top + initialSpacePosition.bottom) / 2 + "px";
      this.player.nativeElement.style.left = (initialSpacePosition.left + initialSpacePosition.right) / 2 + "px";
    }
  }

  movePlayer(): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.playerPosition = (this.playerPosition + 1) % 28; // round robin for position
        this.move -= 1;
        this.setPlayer();
        resolve(this.move);
      }, 400);
    })
  }
  
  async ngOnChanges() {
    for(let i = this.move; i > 0; i--) {
      await this.movePlayer();
      // untoggle the previous position, toggle the current position
      // const boardSpaces = this.board?.nativeElement.getElementsByClassName("playspace");
      // if(boardSpaces) {
      //   const prevPosition = (this.playerPosition + 27) % 28;
      //   boardSpaces[prevPosition].classList.remove("on-board");
      //   boardSpaces[this.playerPosition].classList.add("on-board");
      // }
    }
  }
}
