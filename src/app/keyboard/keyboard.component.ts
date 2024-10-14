import { Component, OnInit, OnDestroy, HostListener, HostBinding, ElementRef } from '@angular/core';
// import { KeyboardService } from '../app/keyboard.service';
import { Subscription } from 'rxjs';
import { KeyboardService } from '../keyboard.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  @HostBinding('class.shown')
  private shown!: boolean;

  private keyboardSubscription!: Subscription;

  constructor(private el: ElementRef,  public keyboard: KeyboardService) {
  }

  ngOnInit() {
    this.keyboardSubscription = this.keyboard.keyboardRequested.subscribe(show => {
      if (show) {
        this.shown = true;
      }
      else {
        this.shown = false;
      }
    });
  }

  ngOnDestroy() {
   // this.keyboardSubscription.unsubscribe();
  }

  onShift() {
    this.keyboard.shift = !this.keyboard.shift;
  }

  onAlt() {
    this.keyboard.alt = !this.keyboard.alt;
    this.keyboard.shift = false;
  }

  onBackspace() {
    this.keyboard.fireBackspacePressed();
  }

  onEnter() {
    this.keyboard.fireEnterPressed();
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('click', ['$event'])
  onMouseEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

}
