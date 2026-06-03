import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { ProfilePage } from './profile.page';

describe('ProfilePage', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [ProfilePage],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProfilePage);
    fixture.detectChanges();
    await fixture.whenStable();
    const component = fixture.componentInstance;
    return { fixture, component };
  }

  it('should create the component', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
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
});
