import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [ReactiveFormsModule],
})
export class ProfilePage implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  protected displayText = '';
  protected animState = 'hidden';
  protected cycleKey = 0;
  private readonly words = ['Skills', 'Expertise', 'Abilities'];
  private wordIndex = 0;
  private timeouts: any[] = [];

  private tick() {
    this.cdr.detectChanges();
  }

  private cycleWord() {
    this.displayText = this.words[this.wordIndex];
    this.animState = 'hidden';
    this.cycleKey++;
    this.tick();

    this.timeouts.push(setTimeout(() => {
      this.animState = 'entering';
      this.tick();
      this.timeouts.push(setTimeout(() => {
        this.animState = 'visible';
        this.tick();
        this.timeouts.push(setTimeout(() => {
          this.animState = 'leaving';
          this.tick();
          this.timeouts.push(setTimeout(() => {
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            this.cycleWord();
          }, 400));
        }, 400));
      }, 400));
    }, 100));
  }

  readonly name = 'Akshit Vaishnav';
  readonly headline = 'Software Engineer • Agentic AI Learner • Begaluru';
  readonly summary =
    'A short summary about what you do, what you’re good at, and what you’re looking to build next.';

  readonly highlights = [
    'Currently: what you’re working on',
    'Previously: a notable company/project',
    'Strength: a core skill or domain',
  ];

  readonly skillCategories = [
    {
      name: 'Programming Languages',
      icon: '💻',
      skills: ['TypeScript', 'JavaScript', 'HTML/CSS', 'SQL'],
      color: '#2563eb',
      bg: 'linear-gradient(145deg, rgba(37,99,235,0.08), rgba(37,99,235,0.02))',
    },
    {
      name: 'Frameworks',
      icon: '⚙️',
      skills: ['Angular', 'RxJS', 'Node.js', 'Express'],
      color: '#7c3aed',
      bg: 'linear-gradient(145deg, rgba(124,58,237,0.08), rgba(124,58,237,0.02))',
    },
    {
      name: 'Database',
      icon: '🗄️',
      skills: ['MySQL', 'MongoDB', 'PostgreSQL'],
      color: '#059669',
      bg: 'linear-gradient(145deg, rgba(5,150,105,0.08), rgba(5,150,105,0.02))',
    },
    {
      name: 'Deployment & Monitoring',
      icon: '🚀',
      skills: ['Git', 'Docker', 'AWS', 'CI/CD'],
      color: '#d97706',
      bg: 'linear-gradient(145deg, rgba(217,119,6,0.08), rgba(217,119,6,0.02))',
    },
  ];

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
      id: 1,
      title: 'Project One',
      description: 'One line describing the impact and tech stack.',
      linkText: 'View',
      linkHref: '#',
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Another line describing what problem it solves.',
      linkText: 'View',
      linkHref: '#',
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'Another line describing what problem it solves.',
      linkText: 'View',
      linkHref: '#',
    },
    {
      id: 4,
      title: 'Project Four',
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
    twitter: 'https://twitter.com/yourhandle'
  };
  contactForm!: FormGroup;

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
    this.cycleWord();
  }

  ngOnDestroy() {
    this.timeouts.forEach(t => clearTimeout(t));
  }

  onMouseMove(e: MouseEvent) {
    const cards = document.querySelectorAll('.category-card-inner');
    cards.forEach(card => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      (card as HTMLElement).style.transform =
        `perspective(1000px) rotateY(${dx * 3}deg) rotateX(${-dy * 3}deg)`;
    });
  }

  onMouseLeave(e: MouseEvent) {
    const card = (e.currentTarget as HTMLElement).closest('.category-card-inner');
    if (card) {
      (card as HTMLElement).style.transform = '';
    }
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
    this.contactForm.reset();
    // hook up EmailJS or API call here
  }
}
