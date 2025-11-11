import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  icon?: string;
  route?: string;
  action?: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  initials: string;
}

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  searchQuery: string = '';
  showUserMenu: boolean = false;
  showNotifications: boolean = false;
  notificationCount: number = 3;

  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Reports', route: '/reports' },
    { label: 'Strategies', route: '/strategies' },
    { label: 'Analytics', route: '/analytics' }
  ];

  currentUser: UserProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    initials: 'JD'
  };

  notifications = [
    { id: 1, message: 'New report available', time: '5 min ago', read: false },
    { id: 2, message: 'Strategy updated', time: '1 hour ago', read: false },
    { id: 3, message: 'Review completed', time: '2 hours ago', read: true }
  ];

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    console.log('Search query:', this.searchQuery);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    if (this.showUserMenu) {
      this.showNotifications = false;
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.showUserMenu = false;
    }
  }

  closeDropdowns() {
    this.showUserMenu = false;
    this.showNotifications = false;
  }

  logout() {
    console.log('Logout clicked');
    this.closeDropdowns();
  }

  navigateToProfile() {
    console.log('Navigate to profile');
    this.closeDropdowns();
  }

  navigateToSettings() {
    console.log('Navigate to settings');
    this.closeDropdowns();
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.notificationCount = 0;
  }

  markAsRead(notification: any) {
    notification.read = true;
    this.notificationCount = this.notifications.filter(n => !n.read).length;
  }
}

