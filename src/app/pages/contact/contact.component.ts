import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Contact form submitted:', this.contactForm);
    alert('Üzenet elküldve! Hamarosan felvesszük Önnel a kapcsolatot.');
    this.resetForm();
  }

  resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
