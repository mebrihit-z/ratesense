import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ReportItem {
  id: number;
  text: string;
  byAI: boolean;
  sources?: number;
  score?: 'high' | 'medium' | 'low';
  date: string;
  avatar?: string;
}

@Component({
  selector: 'app-report',
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  keyTakeaway = {
    text: "AB Core follows a disciplined investment approach that supports the team's clear philosophy with its long-term focus on cash-flow generative businesses. The valuation discipline and attention to downside risk strengthen this offering.",
    byAI: true,
    sources: 2,
    score: 'high' as const,
    date: '20 Oct 2025'
  };

  pros: ReportItem[] = [
    {
      id: 1,
      text: 'The team of experienced investment professionals has worked together for many years and displays a high level of commitment to the approach.',
      byAI: false,
      date: '18 Oct 2025'
    },
    {
      id: 2,
      text: 'It is the methodical and detailed due diligence that differentiates the strategy with each step of the process reflecting a significant amount of thought.',
      byAI: true,
      sources: 1,
      score: 'low',
      date: '20 Oct 2025'
    },
    {
      id: 3,
      text: 'The devil\'s advocate process at the stock-selection stage of the process ensures robust challenge.',
      byAI: true,
      sources: 2,
      score: 'high',
      date: '20 Oct 2025'
    }
  ];

  cons: ReportItem[] = [
    {
      id: 4,
      text: 'The balance of power in investment decisions does seem to lie in Dalgas\' hands and we view him as the guardian of the approach. Although low, there is an element of key-man risk in the strategy. Similarly, we would review the rating if Ingemann left.',
      byAI: true,
      sources: 2,
      score: 'medium',
      date: '20 Oct 2025'
    }
  ];

  removeItem(items: ReportItem[], id: number) {
    const index = items.findIndex(item => item.id === id);
    if (index > -1) {
      items.splice(index, 1);
    }
  }

  addPro() {
    console.log('Add pro clicked');
  }

  addCon() {
    console.log('Add con clicked');
  }
}
