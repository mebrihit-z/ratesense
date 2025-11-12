import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tab {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
}

interface FileAttachment {
  name: string;
  type: 'DOC' | 'PDF';
  uploadDate: string;
}

interface Message {
  content: string;
  files?: FileAttachment[];
  type: 'ai' | 'user';
}

interface Comment {
  id: string;
  avatar: string;
  quotedText: string;
  commentText: string;
  authorType: 'user' | 'self';
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

  messages: Message[] = [
    {
      type: 'ai',
      content: `The above summary was generated based on key insights synthesized from multiple sections of the AB Global Core Equity Research Report.

The AI identified and consolidated recurring themes related to investment philosophy, valuation discipline, and risk management across several portions of the document to provide a concise, holistic takeaway.

<strong>Summary Rationale</strong>
After semantic cross-referencing and pattern clustering, the AI determined that the key takeaway sentence encapsulates the consistent narrative of the report:
• "Disciplined investment approach" echoed across the Idea Generation and Process Overview sections.
• "Long-term focus on cash-flow generative businesses" first introduced in the Philosophy section and reiterated in the Idea Generation segment.
• "Valuation discipline and attention to downside risk" explicitly emphasized in the Risk Commentary section as a differentiator for the team's strategy.`,
      files: [
        {
          name: 'DDQ 2024.docx',
          type: 'DOC',
          uploadDate: '20 Jan, 2025'
        },
        {
          name: 'News Item.pdf',
          type: 'PDF',
          uploadDate: '20 Jan, 2025'
        }
      ]
    }
  ];

  comments: Comment[] = [
    {
      id: '1',
      avatar: 'avatar-1',
      quotedText: "The balance of power in investment decisions does seem to lie in Dalgas'",
      commentText: 'I believe this argument should be reinforced with relevant statistics.',
      authorType: 'user'
    },
    {
      id: '2',
      avatar: 'avatar-1',
      quotedText: 'The team applies sensible screens in order to narrow the universe',
      commentText: 'I appreciate this direction. Could you please provide relevant examples to further substantiate it?',
      authorType: 'user'
    },
    {
      id: '3',
      avatar: 'avatar-2',
      quotedText: '',
      commentText: 'I have incorporated the modifications based on your comments. Could you please review and confirm?',
      authorType: 'self'
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

  onEditFile(file: FileAttachment) {
    console.log('Edit file:', file.name);
    // Handle file edit logic here
  }

  closePanel() {
    this.toggleSidebar();
  }
}
