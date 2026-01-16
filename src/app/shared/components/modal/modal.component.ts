import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Modal';
  @Input() showFooter = true;
  @Input() showConfirmButton = false;
  @Input() confirmText = 'Megerősítés';
  
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  close(): void {
    this.isOpen = false;
    this.closed.emit();
  }

  confirm(): void {
    this.confirmed.emit();
    this.close();
  }
}