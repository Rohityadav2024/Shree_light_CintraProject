import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ToastrService,ActiveToast  } from 'ngx-toastr';
import { Observable,Subject  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotiferService {
  private renderer: Renderer2;
  constructor(private _ToastrService: ToastrService, private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
   }
  showSuccess(msg: string): void {
    this._ToastrService.success(msg);
  }
  showError(msg: string): void {
    this._ToastrService.error(msg);
  }
  showInfo(msg: string): void {
    this._ToastrService.info(msg);
  }

}
