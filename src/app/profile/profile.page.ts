import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.scss',
})
export class ProfilePage {
  readonly name = 'Your Name';
  readonly headline = 'Role • Specialty • Location';
  readonly summary =
    'A short summary about what you do, what you’re good at, and what you’re looking to build next.';

  readonly highlights = [
    'Currently: what you’re working on',
    'Previously: a notable company/project',
    'Strength: a core skill or domain',
  ];

  readonly skills = ['Angular', 'TypeScript', 'RxJS', 'HTML/CSS', 'Node.js'];

  readonly projects = [
    {
      title: 'Project One',
      description: 'One line describing the impact and tech stack.',
      linkText: 'View',
      linkHref: '#',
    },
    {
      title: 'Project Two',
      description: 'Another line describing what problem it solves.',
      linkText: 'View',
      linkHref: '#',
    },
  ];

  readonly contact = {
    email: 'you@example.com',
    github: 'https://github.com/your-handle',
    linkedin: 'https://www.linkedin.com/in/your-handle',
  };
}

