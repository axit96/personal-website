import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { StockAnalysisService } from './stock-analysis.service';

interface ChatChoice {
  index: number;
  message: { role: string; content: string };
}

interface ChatResponse {
  choices: ChatChoice[];
}

@Component({
  selector: 'app-stock-analysis-page',
  templateUrl: './stock-analysis.page.html',
  styleUrls: ['./stock-analysis.page.scss'],
  imports: [JsonPipe, FormsModule],
})
export class StockAnalysisPage implements OnInit {
  message = 'Hello';
  chatContent = '';
  chatError = '';
  stockResult: unknown = null;
  chatLoading = false;
  stockLoading = false;

  constructor(
    private readonly service: StockAnalysisService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadChat();
    this.loadStock();
  }

  loadChat() {
    this.chatLoading = true;
    this.chatError = '';
    this.service.chatCompletion(this.message).pipe(
      finalize(() => {
        this.chatLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: (res) => {
        const data = res as ChatResponse;
        this.chatContent = data.choices?.[0]?.message?.content ?? JSON.stringify(res);
      },
      error: (err) => {
        this.chatError = err.message ?? String(err);
        this.chatContent = '';
      },
    });
  }

  loadStock() {
    this.stockLoading = true;
    this.service.getStockData().pipe(
      finalize(() => {
        this.stockLoading = false;
        this.cdr.markForCheck();
      }),
    ).subscribe({
      next: (res) => { this.stockResult = res; },
      error: (err) => { this.stockResult = { error: err.message ?? String(err) }; },
    });
  }
}
