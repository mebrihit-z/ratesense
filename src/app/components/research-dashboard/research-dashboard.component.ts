import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ResearchProject {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
  lastUpdated: Date;
  documents: number;
  insights: number;
}

interface RecentActivity {
  id: number;
  type: 'document' | 'insight' | 'report' | 'comment';
  title: string;
  description: string;
  timestamp: Date;
  user: string;
}

@Component({
  selector: 'app-research-dashboard',
  imports: [CommonModule],
  templateUrl: './research-dashboard.component.html',
  styleUrl: './research-dashboard.component.scss'
})
export class ResearchDashboardComponent {
  projects: ResearchProject[] = [
    {
      id: 1,
      title: 'Market Analysis Q4 2024',
      description: 'Comprehensive market research for Q4 strategic planning',
      status: 'active',
      progress: 75,
      lastUpdated: new Date('2024-11-10'),
      documents: 24,
      insights: 15
    },
    {
      id: 2,
      title: 'Competitor Intelligence',
      description: 'Analysis of competitor strategies and market positioning',
      status: 'active',
      progress: 60,
      lastUpdated: new Date('2024-11-09'),
      documents: 18,
      insights: 12
    },
    {
      id: 3,
      title: 'Customer Sentiment Study',
      description: 'Deep dive into customer feedback and satisfaction metrics',
      status: 'pending',
      progress: 30,
      lastUpdated: new Date('2024-11-08'),
      documents: 10,
      insights: 5
    },
    {
      id: 4,
      title: 'Industry Trends 2025',
      description: 'Forward-looking analysis of industry trends and projections',
      status: 'completed',
      progress: 100,
      lastUpdated: new Date('2024-11-05'),
      documents: 35,
      insights: 28
    }
  ];

  recentActivities: RecentActivity[] = [
    {
      id: 1,
      type: 'document',
      title: 'New Document Added',
      description: 'Market_Analysis_Report_Final.pdf uploaded to Market Analysis Q4 2024',
      timestamp: new Date('2024-11-12T10:30:00'),
      user: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'insight',
      title: 'AI Insight Generated',
      description: 'New competitive advantage identified in Competitor Intelligence',
      timestamp: new Date('2024-11-12T09:15:00'),
      user: 'AI Assistant'
    },
    {
      id: 3,
      type: 'report',
      title: 'Report Exported',
      description: 'Customer Sentiment Study report exported as PDF',
      timestamp: new Date('2024-11-11T16:45:00'),
      user: 'Michael Chen'
    },
    {
      id: 4,
      type: 'comment',
      title: 'Comment Added',
      description: 'New comment on Industry Trends 2025 summary section',
      timestamp: new Date('2024-11-11T14:20:00'),
      user: 'Emily Davis'
    }
  ];

  stats = {
    totalProjects: 4,
    activeProjects: 2,
    totalDocuments: 87,
    totalInsights: 60
  };

  getStatusClass(status: string): string {
    const statusClasses: {[key: string]: string} = {
      'active': 'status-active',
      'completed': 'status-completed',
      'pending': 'status-pending'
    };
    return statusClasses[status] || '';
  }

  getActivityIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'document': '/icons/doc-icon.svg',
      'insight': '/icons/sparkle-icon.svg',
      'report': '/icons/export-icon.svg',
      'comment': '/icons/comment-icon.svg'
    };
    return icons[type] || '/icons/doc-icon.svg';
  }

  formatTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
  }

  onProjectClick(project: ResearchProject): void {
    console.log('Project clicked:', project);
    // Navigate to project details or open project
  }

  onCreateNewProject(): void {
    console.log('Create new project');
    // Open create project modal or navigate to create page
  }
}

