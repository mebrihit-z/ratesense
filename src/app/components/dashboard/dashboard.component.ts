import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface QuickAction {
  id: number;
  title: string;
  icon: string;
  description: string;
  route?: string;
  color: string;
}

interface Metric {
  id: number;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

interface RecentReport {
  id: number;
  title: string;
  strategy: string;
  status: 'draft' | 'review' | 'completed';
  lastUpdated: Date;
  author: string;
  progress: number;
}

interface UpcomingDeadline {
  id: number;
  title: string;
  type: 'review' | 'report' | 'meeting';
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentDate = new Date();
  
  currentUser = {
    name: 'John Doe',
    greeting: this.getGreeting()
  };

  quickActions: QuickAction[] = [
    {
      id: 1,
      title: 'New Research Report',
      icon: '/icons/doc-icon.svg',
      description: 'Start a new research report',
      route: '/report',
      color: '#4f46e5'
    },
    {
      id: 2,
      title: 'Research Dashboard',
      icon: '/icons/sparkle-icon.svg',
      description: 'View all research projects',
      route: '/research-dashboard',
      color: '#06b6d4'
    },
    {
      id: 3,
      title: 'Export Reports',
      icon: '/icons/export-icon.svg',
      description: 'Export and share reports',
      color: '#8b5cf6'
    },
    {
      id: 4,
      title: 'View Analytics',
      icon: '/icons/inspect-icon.svg',
      description: 'Access detailed analytics',
      color: '#f59e0b'
    }
  ];

  metrics: Metric[] = [
    {
      id: 1,
      title: 'Total Reports',
      value: 24,
      change: 12,
      changeType: 'increase',
      icon: '/icons/doc-icon.svg',
      color: '#3b82f6'
    },
    {
      id: 2,
      title: 'Active Projects',
      value: 8,
      change: 3,
      changeType: 'increase',
      icon: '/icons/active-circle-icon.svg',
      color: '#22c55e'
    },
    {
      id: 3,
      title: 'Pending Reviews',
      value: 5,
      change: 2,
      changeType: 'decrease',
      icon: '/icons/preview-icon.svg',
      color: '#f59e0b'
    },
    {
      id: 4,
      title: 'Insights Generated',
      value: 156,
      change: 23,
      changeType: 'increase',
      icon: '/icons/sparkle-icon.svg',
      color: '#a855f7'
    }
  ];

  recentReports: RecentReport[] = [
    {
      id: 1,
      title: 'AB\'s US Equity Strategy',
      strategy: 'AB Global Core',
      status: 'review',
      lastUpdated: new Date('2024-11-12T10:30:00'),
      author: 'Sarah Johnson',
      progress: 85
    },
    {
      id: 2,
      title: 'European Market Analysis',
      strategy: 'European Growth',
      status: 'draft',
      lastUpdated: new Date('2024-11-11T15:20:00'),
      author: 'Michael Chen',
      progress: 60
    },
    {
      id: 3,
      title: 'Emerging Markets Overview',
      strategy: 'EM Opportunities',
      status: 'completed',
      lastUpdated: new Date('2024-11-10T09:45:00'),
      author: 'Emily Davis',
      progress: 100
    },
    {
      id: 4,
      title: 'Fixed Income Strategy Review',
      strategy: 'Core Fixed Income',
      status: 'draft',
      lastUpdated: new Date('2024-11-09T14:15:00'),
      author: 'David Wilson',
      progress: 45
    }
  ];

  upcomingDeadlines: UpcomingDeadline[] = [
    {
      id: 1,
      title: 'LRC Review - US Equity Strategy',
      type: 'review',
      dueDate: new Date('2024-11-15'),
      priority: 'high'
    },
    {
      id: 2,
      title: 'European Market Report Final Draft',
      type: 'report',
      dueDate: new Date('2024-11-16'),
      priority: 'high'
    },
    {
      id: 3,
      title: 'Strategy Committee Meeting',
      type: 'meeting',
      dueDate: new Date('2024-11-18'),
      priority: 'medium'
    },
    {
      id: 4,
      title: 'RRC Review - Fixed Income Strategy',
      type: 'review',
      dueDate: new Date('2024-11-20'),
      priority: 'medium'
    }
  ];

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  getStatusClass(status: string): string {
    const statusClasses: {[key: string]: string} = {
      'draft': 'status-draft',
      'review': 'status-review',
      'completed': 'status-completed'
    };
    return statusClasses[status] || '';
  }

  getPriorityClass(priority: string): string {
    const priorityClasses: {[key: string]: string} = {
      'high': 'priority-high',
      'medium': 'priority-medium',
      'low': 'priority-low'
    };
    return priorityClasses[priority] || '';
  }

  getDeadlineIcon(type: string): string {
    const icons: {[key: string]: string} = {
      'review': '/icons/preview-icon.svg',
      'report': '/icons/doc-icon.svg',
      'meeting': '/icons/comment-icon.svg'
    };
    return icons[type] || '/icons/doc-icon.svg';
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / 86400000);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  }

  onQuickAction(action: QuickAction): void {
    console.log('Quick action clicked:', action);
    if (action.route) {
      // Navigation will be handled by routerLink in template
    }
  }

  onReportClick(report: RecentReport): void {
    console.log('Report clicked:', report);
    // Navigate to report details
  }

  onDeadlineClick(deadline: UpcomingDeadline): void {
    console.log('Deadline clicked:', deadline);
    // Navigate to deadline item
  }
}

