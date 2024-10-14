import {
  Directive,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable, of, fromEvent, merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Directive({
  selector: '[appNetworkDetector]'
})
export class NetworkDetectorDirective implements OnInit {

  onlineStatus = true;
  @Output() withNetworkClick = new EventEmitter();

  @HostListener('click', ['$event'])
  clickEvent(event:any) {
    if (!this.onlineStatus) {
      // console.log('internet not available');
      event.stopPropagation();
      event.preventDefault();
      alert('Internet connection is not available, please try again later.');
    } else {
      this.withNetworkClick.emit(event);
    }
  }

  constructor() {}

  ngOnInit() {
    console.log('init');
    const online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
    online$.subscribe((status) => {
      this.onlineStatus = status;
    });
  }

}
