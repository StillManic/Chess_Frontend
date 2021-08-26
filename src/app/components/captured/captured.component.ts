import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PieceComponent } from '../piece/piece.component';

@Component({
  selector: 'app-captured',
  templateUrl: './captured.component.html',
  styleUrls: ['./captured.component.css']
})
export class CapturedComponent implements OnInit {
  @Input() pieces: PieceComponent[] = [];

  constructor() {}

  ngOnInit(): void {}

  addPiece(piece: PieceComponent) {
    console.log(`Adding piece: ${piece.color} ${piece.type}`);
    this.pieces.push(piece);
  }
}
