import { Directive, HostBinding } from '@angular/core';
import { BridgeService } from 'src/app/modules/service/bridge.service';
@Directive({
  selector: '[appLeftMenuNavbar]'
})
export class LeftMenuNavbarDirective {
  @HostBinding('class.activee') leftActiveNavbar: boolean = false;
  constructor(private _BridgeService: BridgeService) {

    if (Array.from(((document.querySelector('app-left-menu') as HTMLBodyElement).childNodes[0] as any).classList).includes("active")) {
      this.leftActiveNavbar = true;
    }
    this._BridgeService.leftNavBar.subscribe(($left: any) => {
      this.leftActiveNavbar = $left;
    })
  }
}
