import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
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
  playerIsWhite: boolean = true;

  constructor() {
    let playerColor = this.playerIsWhite ? Color.white : Color.black;
    let cpuColor = this.playerIsWhite ? Color.black : Color.white;
    for (let col = 0; col < 8; col++) {
      this.spaces[col] = new Array();
      for (let row = 0; row < 8; row++) {
        let dark: boolean = (col % 2 == 0 && row % 2 == 1) || (col % 2 == 1 && row % 2 == 0);
        this.spaces[col][row] = new Space(dark, this.brown);
        switch(col) {
          case 0:
          case 7:
            if (row == 0) this.spaces[col][row].setPiece(Type.rook, cpuColor);
            if (row == 7) this.spaces[col][row].setPiece(Type.rook, playerColor);
            break;
          case 1:
          case 6:
            if (row == 0) this.spaces[col][row].setPiece(Type.knight, cpuColor);
            if (row == 7) this.spaces[col][row].setPiece(Type.knight, playerColor);
            break;
          case 2:
          case 5:
            if (row == 0) this.spaces[col][row].setPiece(Type.bishop, cpuColor);
            if (row == 7) this.spaces[col][row].setPiece(Type.bishop, playerColor);
            break;
          case 3:
            if (row == 0) this.spaces[col][row].setPiece(Type.king, cpuColor);
            if (row == 7) this.spaces[col][row].setPiece(Type.king, playerColor);
            break;
          case 4:
            if (row == 0) this.spaces[col][row].setPiece(Type.queen, cpuColor);
            if (row == 7) this.spaces[col][row].setPiece(Type.queen, playerColor);
            break;  
        }

        if (row == 1) {
          this.spaces[col][row].setPiece(Type.pawn, cpuColor);
        }

        if (row == 6) {
          this.spaces[col][row].setPiece(Type.pawn, playerColor);
        }
      }
    }
  }

  ngOnInit(): void {}
}
