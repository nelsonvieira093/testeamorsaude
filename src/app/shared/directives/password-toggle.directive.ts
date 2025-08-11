import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]'
})
export class PasswordToggleDirective {
  private isShown = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  toggleVisibility(): void {
    const input = this.el.nativeElement.previousElementSibling as HTMLInputElement;
    if (!input) return;

    this.isShown = !this.isShown;

    this.renderer.setAttribute(input, 'type', this.isShown ? 'text' : 'password');
  }
}
