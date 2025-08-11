import { Directive, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounce]'
})
export class DebounceDirective implements OnDestroy {
  @Input() debounceTime = 300; // tempo padrão: 300ms
  @Output() debounce = new EventEmitter<any>();

  private subject = new Subject<any>();
  private subscription: Subscription;

  constructor() {
    this.subscription = this.subject
      .pipe(debounceTime(this.debounceTime))
      .subscribe(value => this.debounce.emit(value));
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.subject.next(target.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
