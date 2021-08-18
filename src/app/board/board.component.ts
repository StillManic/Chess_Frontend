import { Component, OnInit } from '@angular/core';
import { Color, PieceComponent, Type } from '../piece/piece.component';
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
    for (let col = 0; col < 8; col++) {
      this.spaces[col] = new Array();
      for (let row = 0; row < 8; row++) {
        let dark: boolean = (col % 2 == 0 && row % 2 == 1) || (col % 2 == 1 && row % 2 == 0);
        this.spaces[col][row] = new Space(dark, this.brown);
        switch(col) {
          case 0:
          case 7:
            if (row == 0) this.spaces[col][row].setPiece(Type.rook, Color.white);
            if (row == 7) this.spaces[col][row].setPiece(Type.rook, Color.black);
            break;
          case 1:
          case 6:
            if (row == 0) this.spaces[col][row].setPiece(Type.knight, Color.white);
            if (row == 7) this.spaces[col][row].setPiece(Type.knight, Color.black);
            break;
          case 2:
          case 5:
            if (row == 0) this.spaces[col][row].setPiece(Type.bishop, Color.white);
            if (row == 7) this.spaces[col][row].setPiece(Type.bishop, Color.black);
            break;
          case 3:
            if (row == 0) this.spaces[col][row].setPiece(Type.king, Color.white);
            if (row == 7) this.spaces[col][row].setPiece(Type.king, Color.black);
            break;
          case 4:
            if (row == 0) this.spaces[col][row].setPiece(Type.queen, Color.white);
            if (row == 7) this.spaces[col][row].setPiece(Type.queen, Color.black);
            break;  
        }

        if (row == 1) {
          this.spaces[col][row].setPiece(Type.pawn, Color.white);
        }

        if (row == 6) {
          this.spaces[col][row].setPiece(Type.pawn, Color.black);
        }
      }
    }
  }

  ngOnInit(): void {}
}
