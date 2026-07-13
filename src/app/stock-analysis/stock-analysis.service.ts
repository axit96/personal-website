import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StockAnalysisService {
  private readonly apiKey = 'sk-7JwiCRwNl5DvUxkzv6bgiJ8psRZG4nESvVYAQeqYcFyOb3Nc9cd1MNHp7IkehvWS';
  private readonly chatUrl = '/api/chat';
  private readonly stockUrl = '/api/stock';

  constructor(private readonly http: HttpClient) {}

  chatCompletion(message: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });
    const body = {
      model: 'deepseek-v4-flash-free',
      messages: [{ role: 'user', content: message }],
    };
    return this.http.post(this.chatUrl, body, { headers });
  }

  getStockData() {
    return this.http.get(this.stockUrl);
  }
}
