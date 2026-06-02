import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [ReactiveFormsModule, CommonModule], // Add CommonModule to the imports array
})
export class ProfilePage {
  @ViewChild('experienceSection') experienceSection!: ElementRef;

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

  readonly experience = [
    {
      title: 'Digital Specialist Engineer',
      company: 'Infosys Limited',
      startYear: 'October 2021',
      endYear: 'Present',
      description: 'Lead developer of enterprize grader application develpment for various clients',
    }
  ]; 

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
    {
      title: 'Project Two',
      description: 'Another line describing what problem it solves.',
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

  readonly education = [
    {
      degree: 'Master\'s of Technology (M.Tech)',
      school: 'NIT Goa',
      year: '2019-2021',
      field: 'Computer Science',
    },
    {
      degree: 'Gate Exam Coaching',
      school: 'ACE Academy, Hyderabad',
      year: '2018-2019',
      field: 'GATE (Graduate Aptitude Test in Engineering)',
    },
    {
      degree: 'Bachelor of Engineering (BE)',
      school: 'Parul Institute of Engineering andTechnology',
      year: '2014-2018',
      field: 'Computer Engineering',
    }
  ];

  readonly contact = {
    email: 'you@example.com',
    github: 'https://github.com/your-handle',
    linkedin: 'https://www.linkedin.com/in/your-handle',
    twitter: 'https://twitter.com/yourhandle',
    portfolio: 'https://yourportfolio.com',
  };

  scrollToExperience() {
    setTimeout(() => {
      this.experienceSection.nativeElement.scrollIntoView({ 
        behavior: 'smooth',
        top: '200px'
      });
    }, 100);
  }

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName:     ['', [Validators.required, Validators.minLength(2)]],
      lastName:      ['', [Validators.required, Validators.minLength(2)]],
      contactNumber: ['', [Validators.pattern('^[0-9]{10}$')]],
      emailId:       ['', [Validators.required, Validators.email]],
      city:          ['', ],
      state:         ['', ],
      query:         ['', [Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched(); // shows all errors on submit
      return;
    }
    console.log('Form Data:', this.contactForm.value);
    // hook up EmailJS or API call here
  }
}
