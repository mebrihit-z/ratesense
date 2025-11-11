import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tab {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
}

@Component({
  selector: 'app-right-side-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './right-side-bar.component.html',
  styleUrl: './right-side-bar.component.scss'
})
export class RightSideBarComponent {
  isOpen = true;
  activeTab: string = 'ai-companion';
  userInput: string = '';

  tabs: Tab[] = [
    {
      id: 'ai-companion',
      label: 'AI Companion',
      icon: 'sparkle',
      isActive: true
    },
    {
      id: 'comments',
      label: 'Comments',
      icon: 'comment',
      isActive: false
    }
  ];

  switchTab(tabId: string) {
    this.activeTab = tabId;
    this.tabs.forEach(tab => {
      tab.isActive = tab.id === tabId;
    });
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  onSendMessage() {
    if (this.userInput.trim()) {
      console.log('Sending message:', this.userInput);
      // Handle message sending logic here
      this.userInput = '';
    }
  }

  onAttachFile() {
    console.log('Attach file clicked');
    // Handle file attachment logic here
  }

  closePanel() {
    this.toggleSidebar();
  }
}
