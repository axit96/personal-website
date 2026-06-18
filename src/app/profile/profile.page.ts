import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import type { Project, Certificate } from './profile.data';
import { skillCategories, experience, projects, certificates, education, contact } from './profile.data';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [ReactiveFormsModule, DatePipe],
})
export class ProfilePage implements OnInit, OnDestroy {
  protected scrollIndicator = true;
  protected selectedProject: Project | null = null;
  protected selectedCertificate: Certificate | null = null;

  constructor(private readonly fb: FormBuilder) {}

  protected open(type: 'project', item: Project): void;
  protected open(type: 'certificate', item: Certificate): void;
  protected open(type: 'project' | 'certificate', item: Project | Certificate): void {
    if (type === 'project') {
      this.selectedProject = item as Project;
    } else {
      this.selectedCertificate = item as Certificate;
    }
    this.lockScroll();
  }

  protected close(type: 'project' | 'certificate'): void {
    if (type === 'project') {
      this.selectedProject = null;
    } else {
      this.selectedCertificate = null;
    }
    this.unlockScroll();
  }

  private lockScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.Escape')
  protected onEscape(): void {
    if (this.selectedProject) {
      this.close('project');
    } else if (this.selectedCertificate) {
      this.close('certificate');
    }
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    if (this.scrollIndicator) {
      this.scrollIndicator = false;
    }
  }

  readonly name = 'Akshit Vaishnav';
  readonly headline = 'Digital Specialist Engineer | Java Full Stack & Angular | AI/ML Enthusiast';

  get yearsOfExperience(): string {
    const start = new Date('2021-10-18');
    const now = new Date();
    const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    return (totalMonths / 12).toFixed(1);
  }

  get summary(): string {
    return `Full Stack Java Engineer with ${this.yearsOfExperience}+ years of experience at Infosys, specializing in Core Java, Spring Boot API development, Angular UI integration, and enterprise microservices including Kafka framework.`;
  }

  readonly skillCategories = skillCategories;
  readonly experience = experience;
  readonly projects = projects;
  readonly certificates = certificates;
  readonly education = education;
  readonly contact = contact;
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
    if (globalThis.scrollY > 0) {
      this.scrollIndicator = false;
    }
  }

  ngOnDestroy(): void {
    this.unlockScroll();
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
      this.contactForm.markAllAsTouched();
      return;
    }

    const { firstName, lastName, contactNumber, emailId, city, state, query } = this.contactForm.value;
    const subject = `Portfolio Inquiry from ${firstName} ${lastName}`;
    const body = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${emailId}`,
      `Phone: ${contactNumber || 'N/A'}`,
      `Location: ${city || 'N/A'}, ${state || 'N/A'}`,
      ``,
      `Message:`,
      `${query || 'N/A'}`,
    ].join('\n');

    console.log('Form Data:', this.contactForm.value);
    globalThis.location.href = `mailto:akshitvaishnav96@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    this.contactForm.reset();
  }
}
