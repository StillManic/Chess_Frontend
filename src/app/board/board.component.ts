import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Color, MoveOffset, PieceComponent, Type } from '../piece/piece.component';
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
  private selectedSpace!: Space | null;
  private prevSelectedSpace!: Space | null;

  constructor() {
    this.initializeBoard();
  }

  ngOnInit(): void {}

  spaceClicked(space: Space): void {
    if (space.piece) {      // if clicked square contains a piece
      space.selected = !space.selected;
      this.selectedSpace = space.selected ? space : null;
      if (this.prevSelectedSpace && this.prevSelectedSpace != this.selectedSpace) {
        this.prevSelectedSpace.selected = false;
        let [destinations, attacks] = this.getDestinations(this.prevSelectedSpace);
        for (let dest of destinations) dest.valid = false;
        for (let attack of attacks) attack.attacked = false;
      }
      let [destinations, attacks] = this.getDestinations(space);
      for (let dest of destinations) {
        dest.valid = !dest.valid;
      }
      for (let attack of attacks) {
        attack.attacked = !attack.attacked;
      }
      this.prevSelectedSpace = this.selectedSpace;
    } else {
      if (this.selectedSpace && this.selectedSpace.piece && this.selectedSpace != space && space.valid) {
        let [destinations, attacks] = this.getDestinations(this.selectedSpace!);
        for (let dest of destinations) {
          dest.valid = false;
          dest.selected = false;
          dest.attacked = false;
        }
        for (let attack of attacks) {
          attack.valid = false;
          attack.selected = false;
          attack.attacked = false;
        }
        space.piece = this.selectedSpace.piece;
        this.selectedSpace.piece = null;
        this.selectedSpace.selected = false;
      }
    }
  }

  private getDestinations(space: Space): [Space[], Space[]] {     // returns: 0 = destinations, 1 = attacks
    let destinations: Space[] = new Array();
    let attacks: Space[] = new Array();

    if (space.piece) {
      let destX = space.row;
      let destY = space.col;

      start: for (let move of space.piece.moveOffsets) {
        destX = space.row;
        destY = space.col;

        repeat: while (true) {
          destX += move.x;
          destY += move.y;

          if (this.checkInRange(destX, destY)) {
            let currSpace = this.spaces[destY][destX];
            if (currSpace.piece) {
              if (currSpace.piece.color == space.piece.color) continue start;
              else {
                attacks.push(currSpace);
                continue start;
              }
            } else destinations.push(currSpace);
            if (space.piece.movesRepeat) continue repeat;
          }
          break;
        }
      }
    }

    return [destinations, attacks];
  }

  private checkInRange(x: number, y: number): boolean {
    return x < 8 && y < 8 && x >= 0 && y >= 0;
  }

  getMovesRepeating(pieceType: Type): boolean {
    if (pieceType == Type.pawn || pieceType == Type.king || pieceType == Type.knight) return false;
    else return true;
  }

  initializeBoard(): void {
    let playerColor = this.playerIsWhite ? Color.white : Color.black;
    let cpuColor = this.playerIsWhite ? Color.black : Color.white;
    for (let col = 0; col < 8; col++) {
      this.spaces[col] = new Array();
      for (let row = 0; row < 8; row++) {
        let dark: boolean = (col % 2 == 0 && row % 2 == 1) || (col % 2 == 1 && row % 2 == 0);
        this.spaces[col][row] = new Space(dark, this.brown);
        this.spaces[col][row].setLocation(row, col);
        switch(col) {
          case 0:
          case 7:
            if (row == 0) this.spaces[col][row].setPiece(Type.rook, cpuColor, this.getMoveOffsets(Type.rook, cpuColor), this.getMovesRepeating(Type.rook));
            if (row == 7) this.spaces[col][row].setPiece(Type.rook, playerColor, this.getMoveOffsets(Type.rook, playerColor), this.getMovesRepeating(Type.rook));
            break;
          case 1:
          case 6:
            if (row == 0) this.spaces[col][row].setPiece(Type.knight, cpuColor, this.getMoveOffsets(Type.knight, cpuColor), this.getMovesRepeating(Type.knight));
            if (row == 7) this.spaces[col][row].setPiece(Type.knight, playerColor, this.getMoveOffsets(Type.knight, playerColor), this.getMovesRepeating(Type.knight));
            break;
          case 2:
          case 5:
            if (row == 0) this.spaces[col][row].setPiece(Type.bishop, cpuColor, this.getMoveOffsets(Type.bishop, cpuColor), this.getMovesRepeating(Type.bishop));
            if (row == 7) this.spaces[col][row].setPiece(Type.bishop, playerColor, this.getMoveOffsets(Type.bishop, playerColor), this.getMovesRepeating(Type.bishop));
            break;
          case 3:
            if (row == 0) this.spaces[col][row].setPiece(Type.king, cpuColor, this.getMoveOffsets(Type.king, cpuColor), this.getMovesRepeating(Type.king));
            if (row == 7) this.spaces[col][row].setPiece(Type.king, playerColor, this.getMoveOffsets(Type.king, playerColor), this.getMovesRepeating(Type.king));
            break;
          case 4:
            if (row == 0) this.spaces[col][row].setPiece(Type.queen, cpuColor, this.getMoveOffsets(Type.queen, cpuColor), this.getMovesRepeating(Type.queen));
            if (row == 7) this.spaces[col][row].setPiece(Type.queen, playerColor, this.getMoveOffsets(Type.queen, playerColor), this.getMovesRepeating(Type.queen));
            break;  
        }

        if (row == 1) this.spaces[col][row].setPiece(Type.pawn, cpuColor, this.getMoveOffsets(Type.pawn, cpuColor), this.getMovesRepeating(Type.pawn));
        if (row == 6) this.spaces[col][row].setPiece(Type.pawn, playerColor, this.getMoveOffsets(Type.pawn, playerColor), this.getMovesRepeating(Type.pawn));
      }
    }
  }

  changeBoardColor(): void {
    this.brown = !this.brown;
    for (let row of this.spaces) {
      for (let space of row) {
        space.brown = this.brown;
      }
    }
  }

  getMoveOffsets(pieceType: Type, pieceColor: Color): MoveOffset[] {
    let moves: MoveOffset[] = new Array();
    switch (pieceType) {
      case Type.pawn:
        if (pieceColor == Color.black) moves.push(new MoveOffset(1, 0));
        if (pieceColor == Color.white) moves.push(new MoveOffset(-1, 0));
        break;
      case Type.rook:
        moves.push(new MoveOffset(1, 0));
        moves.push(new MoveOffset(0, 1));
        moves.push(new MoveOffset(-1, 0));
        moves.push(new MoveOffset(0, -1));
        break;
      case Type.bishop:
        moves.push(new MoveOffset(1, 1));
        moves.push(new MoveOffset(-1, 1));
        moves.push(new MoveOffset(1, -1));
        moves.push(new MoveOffset(-1, -1));
        break;
      case Type.queen:
      case Type.king:
        moves.push(new MoveOffset(1, 0));
        moves.push(new MoveOffset(0, 1));
        moves.push(new MoveOffset(-1, 0));
        moves.push(new MoveOffset(0, -1));
        moves.push(new MoveOffset(1, 1));
        moves.push(new MoveOffset(-1, 1));
        moves.push(new MoveOffset(1, -1));
        moves.push(new MoveOffset(-1, -1));
        break;
      case Type.knight:
        moves.push(new MoveOffset(-1, 2));
        moves.push(new MoveOffset(1, 2));
        moves.push(new MoveOffset(2, 1));
        moves.push(new MoveOffset(2, -1));
        moves.push(new MoveOffset(1, -2));
        moves.push(new MoveOffset(-1, -2));
        moves.push(new MoveOffset(-2, -1));
        moves.push(new MoveOffset(-2, 1));
        break;
    }
    return moves;
  }
}
