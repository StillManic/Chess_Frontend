import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  private _sprite: string = '../assets/images/';
  type: Type = Type.pawn;
  color: Color = Color.white;

  constructor() {}

  ngOnInit(): void {}

  public get sprite() {
    return `${this._sprite}${this.type}_${this.color}.png`;
  }
}
