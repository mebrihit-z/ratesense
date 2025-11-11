import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WorkflowStep {
  name: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface ChapterSubsection {
  name: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

interface Chapter {
  number: number;
  name: string;
  progress: number; // 0-5 (number of filled dots)
  expanded: boolean;
  subsections: ChapterSubsection[];
}

@Component({
  selector: 'app-left-side-bar',
  imports: [CommonModule],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.scss'
})
export class LeftSideBarComponent {
  activeTab: 'chapters' | 'sources' = 'chapters';
  sourcesCount = 4;

  workflowSteps: WorkflowStep[] = [
    { name: 'Due Diligence', isActive: false, isCompleted: true },
    { name: 'Draft Research Report', isActive: true, isCompleted: false },
    { name: 'Peer Review', isActive: false, isCompleted: false },
    { name: 'LRC Review', isActive: false, isCompleted: false },
    { name: 'RRC Review', isActive: false, isCompleted: false }
  ];

  chapters: Chapter[] = [
    {
      number: 1,
      name: 'Mercer View',
      progress: 0,
      expanded: false,
      subsections: []
    },
    {
      number: 2,
      name: 'Idea Generation',
      progress: 4,
      expanded: true,
      subsections: [
        { name: 'Key Takeaway', status: 'completed' },
        { name: 'Pros', status: 'in-progress' },
        { name: 'Cons', status: 'in-progress' },
        { name: 'Idea Generation Rating', status: 'in-progress' }
      ]
    },
    {
      number: 2,
      name: 'Implementation',
      progress: 0,
      expanded: false,
      subsections: [
        { name: 'Key Takeaway', status: 'not-started' },
        { name: 'Pros', status: 'not-started' },
        { name: 'Cons', status: 'not-started' },
        { name: 'Implementation Rating', status: 'not-started' }
      ]
    },
    {
      number: 3,
      name: 'Portfolio Construction',
      progress: 3.5,
      expanded: false,
      subsections: [
        { name: 'Key Takeaway', status: 'in-progress' },
        { name: 'Pros', status: 'in-progress' },
        { name: 'Cons', status: 'in-progress' },
        { name: 'Implementation Rating', status: 'in-progress' }
      ]
    }
  ];

  toggleTab(tab: 'chapters' | 'sources') {
    this.activeTab = tab;
  }

  toggleChapter(chapter: Chapter) {
    chapter.expanded = !chapter.expanded;
  }

  getProgressDots(progress: number): number[] {
    // Handle partial progress (e.g., 3.5 means 3 filled, 1 partial, 1 empty)
    return Array(5).fill(0).map((_, i) => {
      if (i < Math.floor(progress)) return 1;
      if (i === Math.floor(progress) && progress % 1 !== 0) return 0.5;
      return 0;
    });
  }
}
