import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { StockAnalysisPage } from './stock-analysis.page';
import { StockAnalysisService } from './stock-analysis.service';
import { of, throwError } from 'rxjs';

describe('StockAnalysisPage', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [StockAnalysisPage],
      providers: [provideHttpClient()],
    }).compileComponents();

    const fixture = TestBed.createComponent(StockAnalysisPage);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component };
  }

  describe('component creation', () => {
    it('should create', async () => {
      const { component } = await setup();
      expect(component).toBeTruthy();
    });

    it('should have default message "Hello"', async () => {
      const { component } = await setup();
      expect(component.message).toBe('Hello');
    });

    it('should have empty chatContent and null stockResult initially', async () => {
      const { component } = await setup();
      expect(component.chatContent).toBe('');
      expect(component.chatError).toBe('');
      expect(component.stockResult).toBeNull();
    });
  });

  describe('loadChat', () => {
    it('should extract choices[0].message.content on success', async () => {
      const { component } = await setup();
      const service = TestBed.inject(StockAnalysisService);
      const mockResponse = { choices: [{ message: { content: 'Hello! How can I help?' } }] };
      vi.spyOn(service, 'chatCompletion').mockReturnValue(of(mockResponse));

      component.loadChat();
      expect(component.chatContent).toBe('Hello! How can I help?');
      expect(component.chatError).toBe('');
      expect(component.chatLoading).toBe(false);
    });

    it('should fallback to JSON string if choices are missing', async () => {
      const { component } = await setup();
      const service = TestBed.inject(StockAnalysisService);
      const mockResponse = { foo: 'bar' };
      vi.spyOn(service, 'chatCompletion').mockReturnValue(of(mockResponse));

      component.loadChat();
      expect(component.chatContent).toBe(JSON.stringify(mockResponse));
      expect(component.chatLoading).toBe(false);
    });

    it('should set chatError on failure', async () => {
      const { component } = await setup();
      const service = TestBed.inject(StockAnalysisService);
      vi.spyOn(service, 'chatCompletion').mockReturnValue(throwError(() => new Error('Network error')));

      component.loadChat();
      expect(component.chatError).toBe('Network error');
      expect(component.chatContent).toBe('');
      expect(component.chatLoading).toBe(false);
    });
  });

  describe('loadStock', () => {
    it('should set stockResult on success', async () => {
      const { component } = await setup();
      const service = TestBed.inject(StockAnalysisService);
      const mockResponse = { chart: { result: [{ meta: { symbol: 'TCS.NS' } }] } };
      vi.spyOn(service, 'getStockData').mockReturnValue(of(mockResponse));

      component.loadStock();
      expect(component.stockResult).toEqual(mockResponse);
      expect(component.stockLoading).toBe(false);
    });

    it('should set stockResult with error on failure', async () => {
      const { component } = await setup();
      const service = TestBed.inject(StockAnalysisService);
      vi.spyOn(service, 'getStockData').mockReturnValue(throwError(() => new Error('API error')));

      component.loadStock();
      expect(component.stockResult).toEqual({ error: 'API error' });
      expect(component.stockLoading).toBe(false);
    });
  });

  describe('template', () => {
    it('should render title', async () => {
      const { fixture } = await setup();
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('h1')?.textContent).toContain('Stock Analysis');
    });

    it('should display message input with default value', async () => {
      const { fixture } = await setup();
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('#messageInput') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.value).toBe('Hello');
    });

    it('should show chat content after success', async () => {
      const { fixture, component } = await setup();
      component.chatContent = 'Hello! How can I help?';
      fixture.detectChanges();
      const pres = fixture.nativeElement.querySelectorAll('.api-section .json-output');
      expect(pres[0]?.textContent).toContain('Hello! How can I help?');
    });

    it('should show error when chat fails', async () => {
      const { fixture, component } = await setup();
      component.chatError = 'Network error';
      fixture.detectChanges();
      const pres = fixture.nativeElement.querySelectorAll('.api-section .json-output');
      expect(pres[0]?.textContent).toContain('Network error');
      expect(pres[0]?.classList.contains('error')).toBe(true);
    });

    it('should show json output after stock success', async () => {
      const { fixture, component } = await setup();
      component.stockResult = { price: 3800 };
      fixture.detectChanges();
      const pres = fixture.nativeElement.querySelectorAll('.json-output');
      expect(pres[pres.length - 1]?.textContent).toContain('3800');
    });
  });
});
