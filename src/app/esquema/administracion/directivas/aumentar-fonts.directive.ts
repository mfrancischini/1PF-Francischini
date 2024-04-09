import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAumentarFonts]'
})
export class AumentarFontsDirective {

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.fontSize = '20px';
  } 

  

}
