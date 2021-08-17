import { Component, Input, OnInit } from '@angular/core';
import { PieceComponent } from '../piece/piece.component';

export class Space {
  private _background: string = '../assets/images/square_';
  brown: boolean = true;
  dark: boolean = false;
  private _piece!: PieceComponent;

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

  public set piece(piece: PieceComponent) {
    if (this._piece == null || this._piece == undefined) {
      this._piece = piece;
    }
  }

  public get piece() {
    return this._piece;
  }
}

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {
  @Input() space!: Space;

  constructor() {}

  ngOnInit(): void {}
}
