import { Component, OnInit } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';
import { Space, SpaceComponent } from '../space/space.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  brown: boolean = false;
  public spaces = new Array();

  constructor() {
    for (let i = 0; i < 8; i = i + 2) {
      let even = new Array();
      let odd = new Array();

      for (let j = 0; j < 8; j = j + 2) {
        even[j] = new Space(false, this.brown, new PieceComponent());
        even[j + 1] = new Space(true, this.brown, new PieceComponent());
        // even[j] = new Space(false, this.brown);
        // even[j + 1] = new Space(true, this.brown);
      }

      for (let j = 0; j < 8; j = j + 2) {
        odd[j] = new Space(true, this.brown, new PieceComponent());
        odd[j + 1] = new Space(false, this.brown, new PieceComponent());
        // odd[j] = new Space(true, this.bshis.brown);
      }

      this.spaces[i] = even;
      this.spaces[i + 1] = odd;
    }
  }

  ngOnInit(): void {}
}
