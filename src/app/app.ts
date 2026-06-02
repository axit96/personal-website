import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(private router: Router) {}

    scrollToContact() {
      document.getElementById('contactFormSection')?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  protected readonly title = signal('Personal Profile');
}
