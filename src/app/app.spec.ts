import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  it('should create the app and render content', () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();

    const compiled = fixture.nativeElement as HTMLElement;
    const brandLink = compiled.querySelector('.brand-link');
    expect(brandLink?.textContent).toContain('Personal Profile');

    const buttons = compiled.querySelectorAll('.nav-btn');
    expect(buttons.length).toBe(3);
    expect(buttons[0].textContent).toContain('Experience');
    expect(buttons[1].textContent).toContain('Skills');
    expect(buttons[2].textContent).toContain('Contact Me');

    fixture.destroy();
  });

  it('should scroll to section on scrollTo call', () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;

    const mockElement = document.createElement('div');
    const scrollIntoView = vi.fn();
    mockElement.scrollIntoView = scrollIntoView;
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);
    component.scrollTo('experienceSection');
    expect(document.getElementById).toHaveBeenCalledWith('experienceSection');
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    fixture.destroy();
  });

  it('should handle scrollTo when element not found', () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(App);
    const component = fixture.componentInstance;

    vi.spyOn(document, 'getElementById').mockReturnValue(null);
    expect(() => component.scrollTo('nonexistent')).not.toThrow();

    fixture.destroy();
  });
});
