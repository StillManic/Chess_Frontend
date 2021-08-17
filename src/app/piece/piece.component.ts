import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  sprite: string = '../assets/images/pawn_w.png';
  
  constructor() { }

  ngOnInit(): void {
  }

}
