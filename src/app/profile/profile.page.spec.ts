import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProfilePage } from './profile.page';

describe('ProfilePage', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProfilePage);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    return { fixture, component };
  }

  async function templateSetup() {
    await TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProfilePage);
    const component = fixture.componentInstance;
    return { fixture, component };
  }

  it('should create the component', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  describe('scroll behavior', () => {
    it('should set scrollIndicator false on scroll', async () => {
      const { component } = await setup();
      expect((component as any).scrollIndicator).toBe(true);
      (component as any).onScroll();
      expect((component as any).scrollIndicator).toBe(false);
    });

    it('should not change scrollIndicator if already false', async () => {
      const { component } = await setup();
      (component as any).scrollIndicator = false;
      (component as any).onScroll();
      expect((component as any).scrollIndicator).toBe(false);
    });
  });

  describe('project modal', () => {
    it('should open project and lock body scroll', async () => {
      const { component } = await setup();
      const project = (component as any).projects[0];
      (component as any).openProject(project);
      expect((component as any).selectedProject).toBe(project);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should close project and restore body scroll', async () => {
      const { component } = await setup();
      const project = (component as any).projects[0];
      (component as any).openProject(project);
      (component as any).closeProject();
      expect((component as any).selectedProject).toBeNull();
      expect(document.body.style.overflow).toBe('');
    });

    it('should close project on Escape when a project is selected', async () => {
      const { component } = await setup();
      const project = (component as any).projects[0];
      (component as any).openProject(project);
      (component as any).onEscape();
      expect((component as any).selectedProject).toBeNull();
    });

    it('should not close on Escape when no project is selected', async () => {
      const { component } = await setup();
      (component as any).onEscape();
      expect((component as any).selectedProject).toBeNull();
    });
  });

  describe('ngOnInit', () => {
    it('should hide scroll indicator if page is already scrolled', async () => {
      const originalScrollY = window.scrollY;
      Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
      const { component } = await setup();
      expect((component as any).scrollIndicator).toBe(false);
      Object.defineProperty(window, 'scrollY', { value: originalScrollY, configurable: true });
    });
  });

  describe('ngOnDestroy', () => {
    it('should restore body scroll', async () => {
      const { component } = await setup();
      document.body.style.overflow = 'hidden';
      component.ngOnDestroy();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('contact form validity', () => {
    it('should be invalid when empty', async () => {
      const { component } = await setup();
      expect(component.contactForm.valid).toBe(false);
    });

    it('should be valid when all required fields are filled correctly', async () => {
      const { component } = await setup();
      component.contactForm.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        emailId: 'john@example.com',
      });
      expect(component.contactForm.valid).toBe(true);
    });

    it('should be invalid with short first name', async () => {
      const { component } = await setup();
      component.contactForm.patchValue({ firstName: 'J' });
      component.contactForm.markAllAsTouched();
      expect(component.contactForm.controls['firstName'].errors?.['minlength']).toBeTruthy();
    });

    it('should be invalid with bad email', async () => {
      const { component } = await setup();
      component.contactForm.patchValue({ emailId: 'not-an-email' });
      component.contactForm.markAllAsTouched();
      expect(component.contactForm.controls['emailId'].errors?.['email']).toBeTruthy();
    });

    it('should be invalid with non-digit contact number characters', async () => {
      const { component } = await setup();
      component.contactForm.patchValue({ contactNumber: 'abc' });
      component.contactForm.markAllAsTouched();
      expect(component.contactForm.controls['contactNumber'].errors?.['pattern']).toBeTruthy();
    });
  });

  describe('submit behavior', () => {
    it('should mark all fields as touched when form is invalid on submit', async () => {
      const { component } = await setup();
      vi.spyOn(component.contactForm, 'markAllAsTouched');
      component.onSubmit();
      expect(component.contactForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should reset form after successful submit', async () => {
      const { component } = await setup();
      component.contactForm.patchValue({
        firstName: 'John',
        lastName: 'Doe',
        emailId: 'john@example.com',
      });
      vi.spyOn(component.contactForm, 'reset');
      component.onSubmit();
      expect(component.contactForm.reset).toHaveBeenCalled();
    });
  });

  describe('yearsOfExperience', () => {
    it('should return a string with years', async () => {
      const { component } = await setup();
      expect(typeof component.yearsOfExperience).toBe('string');
      expect(parseFloat(component.yearsOfExperience)).toBeGreaterThan(0);
    });
  });

  describe('summary', () => {
    it('should include company name', async () => {
      const { component } = await setup();
      expect(component.summary).toContain('Infosys');
    });
  });

  describe('f getter', () => {
    it('should return contact form controls', async () => {
      const { component } = await setup();
      expect(component.f).toBe(component.contactForm.controls);
    });
  });

  describe('mouse interactions', () => {
    it('should apply transform on mouse move over skill cards', async () => {
      const { component } = await setup();
      const mockCard = document.createElement('div');
      mockCard.classList.add('category-card-inner');
      Object.defineProperty(mockCard, 'getBoundingClientRect', {
        value: () => ({ left: 0, top: 0, width: 200, height: 100 }),
      });
      vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockCard] as any);
      const event = { clientX: 100, clientY: 50 } as MouseEvent;
      component.onMouseMove(event);
      expect(mockCard.style.transform).toContain('perspective(1000px)');
    });

    it('should reset transform on mouse leave', async () => {
      const { component } = await setup();
      const mockCard = document.createElement('div');
      mockCard.classList.add('category-card-inner');
      mockCard.style.transform = 'perspective(1000px) rotateY(3deg)';
      const event = { currentTarget: mockCard } as unknown as MouseEvent;
      component.onMouseLeave(event);
      expect(mockCard.style.transform).toBe('');
    });

    it('should handle mouse leave when no card found', async () => {
      const { component } = await setup();
      const event = { currentTarget: document.createElement('div') } as unknown as MouseEvent;
      expect(() => component.onMouseLeave(event)).not.toThrow();
    });
  });

  describe('template', () => {
    it('should show scroll indicator by default', async () => {
      const { fixture, component } = await templateSetup();
      expect((component as any).scrollIndicator).toBe(true);
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      const indicator = el.querySelector('.scroll-indicator');
      expect(indicator?.classList.contains('hidden')).toBe(false);
    });

    it('should hide scroll indicator when scrolled', async () => {
      const { fixture, component } = await templateSetup();
      (component as any).scrollIndicator = false;
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      const indicator = el.querySelector('.scroll-indicator');
      expect(indicator?.classList.contains('hidden')).toBe(true);
    });

    it('should render project cards', async () => {
      const { fixture } = await templateSetup();
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      const projects = el.querySelectorAll('.project');
      expect(projects.length).toBe(4);
    });

    it('should open and display modal with project details', async () => {
      const { fixture, component } = await templateSetup();
      (component as any).selectedProject = (component as any).projects[0];
      fixture.detectChanges();
      const el = fixture.nativeElement as HTMLElement;
      const overlay = el.querySelector('.modal-overlay');
      expect(overlay).toBeTruthy();
      const title = el.querySelector('.modal-title');
      expect(title?.textContent).toContain('Mainframe Modernization');
      const tags = el.querySelectorAll('.tech-tag');
      expect(tags.length).toBe((component as any).projects[0].technologies.length);
      const items = el.querySelectorAll('.highlight-item');
      expect(items.length).toBe((component as any).projects[0].highlights.length);
      const meta = el.querySelector('.modal-meta');
      expect(meta?.textContent).toContain('Full Stack Developer');
    });
  });
});
