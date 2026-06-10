import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  scrollTo(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  protected readonly navItems = [
    { label: 'Experience', id: 'experienceSection' },
    { label: 'Skills', id: 'skillsSection' },
    { label: 'Contact Me', id: 'contactFormSection' },
  ];
}
