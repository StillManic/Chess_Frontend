import { Component, Input, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { Color, MoveOffset, PieceComponent, Type } from '../piece/piece.component';

export enum Status {
  selected = 'selected',
  attacked = 'attacked',
  valid = 'valid',
  off = 'off'
}

export class Space {
  private _background: string = '../assets/images/square_';
  brown: boolean = true;
  dark: boolean = false;
  public row: number = -1;
  public col: number = -1;
  public piece!: PieceComponent | null;

  status: Status = Status.off;

  constructor(dark: boolean, brown: boolean, piece?: PieceComponent) {
    this.dark = dark;
    this.brown = brown;
    if (piece) {
      this.piece = piece;
    }
  }

  public get background() {
    return this._background + (this.brown ? 'brown_' : 'grey_') + (this.dark ? 'dark' : 'light') + '.png';
  }

  toggleValidity() {
    if (this.status == Status.off) this.status = Status.valid;
    else if (this.status == Status.valid) this.status = Status.off;
  }
  
  toggleSelected() {
    if (this.status == Status.off) this.status = Status.selected;
    else if (this.status == Status.selected) this.status = Status.off;
  }

  toggleAttacked() {
    if (this.status == Status.off) this.status = Status.attacked;
    else if (this.status == Status.attacked) this.status = Status.off;
  }

  setPiece(type: Type, color: Color, moves: MoveOffset[], repeating: boolean): void {
    this.piece = new PieceComponent();
    this.piece.type = type;
    this.piece.color = color;
    this.piece.moveOffsets = moves;
    this.piece.movesRepeat = repeating;
  }

  setLocation(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
}

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {
  @Input() space!: Space;

  selectedHighlight: string = '../assets/images/square_selected.png';
  attackedHighlight: string = '../assets/images/square_attacking.png';
  validHighlight: string = '../assets/images/square_valid.png';
  
  public set status(status: Status) {
    this.space.status = status;
  }

  public get status() {
    return this.space.status;
  }

  constructor() {}

  ngOnInit(): void {}
}
