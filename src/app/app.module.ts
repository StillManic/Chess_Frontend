import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { SpaceComponent } from './components/space/space.component';
import { PieceComponent } from './components/piece/piece.component';
import { CapturedComponent } from './components/captured/captured.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SpaceComponent,
    PieceComponent,
    CapturedComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
