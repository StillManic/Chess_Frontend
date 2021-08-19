import { Component, Input, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { Color, MoveOffset, PieceComponent, Type } from '../piece/piece.component';

export class Space {
  private _background: string = '../assets/images/square_';
  brown: boolean = true;
  dark: boolean = false;
  public row: number = -1;
  public col: number = -1;
  public piece!: PieceComponent | null;

  // TODO: change these to a single enum so that it is impossible to have a space be in two states at once!!!
  selected: boolean = false;
  attacked: boolean = false;
  valid: boolean = false;

  constructor(dark: boolean, brown: boolean, piece?: PieceComponent) {
    this.dark = dark;
    this.brown = brown;
    if (piece) {
      this.piece = piece;
    }
  }

  setPiece(type: Type, color: Color, moves: MoveOffset[], repeating: boolean): void {
    this.piece = new PieceComponent();
    this.piece.type = type;
    this.piece.color = color;
    this.piece.moveOffsets = moves;
    this.piece.movesRepeat = repeating;
  }

  public get background() {
    return this._background + (this.brown ? 'brown_' : 'grey_') + (this.dark ? 'dark' : 'light') + '.png';
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
  
  public set selected(selected: boolean) {
    this.space.selected = selected;
  }

  public get selected() {
    return this.space.selected;
  }

  public set attacked(attacked: boolean) {
    this.space.attacked = attacked;
  }

  public get attacked() {
    return this.space.attacked;
  }

  public set valid(valid: boolean) {
    this.space.valid = valid;
  }

  public get valid() {
    return this.space.valid;
  }

  constructor() {}

  ngOnInit(): void {}
}
