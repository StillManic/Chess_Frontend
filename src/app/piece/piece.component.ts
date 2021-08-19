import { Component, OnInit } from '@angular/core';
import { Space } from '../space/space.component';

export enum Type {
  pawn = 'pawn',
  rook = 'rook',
  knight = 'knight',
  bishop = 'bishop',
  queen = 'queen',
  king = 'king'
}

export enum Color {
  black = 'b',
  white = 'w'
}

export class MoveOffset {
  private _x: number = 0;
  private _y: number = 0;

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
}

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  private _sprite: string = '../assets/images/';
  type: Type = Type.pawn;
  color: Color = Color.white;
  private _moveOffsets: MoveOffset[] = [];
  movesRepeat: boolean = false;
  destinations: Space[] = [];

  constructor() {}

  ngOnInit(): void {}

  public get sprite() {
    return `${this._sprite}${this.type}_${this.color}.png`;
  }

  public get moveOffsets() {
    return this._moveOffsets;
  }

  public set moveOffsets(moves: MoveOffset[]) {
    if (moves && moves.length > 0) this._moveOffsets = moves;
  }
}
