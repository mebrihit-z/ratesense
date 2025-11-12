import { Component, Renderer2, ElementRef, AfterViewInit, QueryList, ViewChildren, HostListener } from '@angular/core';
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
export class ReportComponent implements AfterViewInit {
  editingProId: number | null = null;
  editingConId: number | null = null;
  editingKeyTakeaway: boolean = false;
  currentEditingElement: HTMLElement | null = null;
  private initializedProItems = new Set<number>();
  private initializedConItems = new Set<number>();
  private keyTakeawayInitialized = false;
  private newlyAddedProIds = new Set<number>();
  private newlyAddedConIds = new Set<number>();

  // Toolbar state
  isBold = false;
  isItalic = false;
  isUnderline = false;
  isStrikethrough = false;
  currentAlignment = 'left';
  
  // Inspect dropdown state
  inspectMode: 'inspect' | 'preview' = 'inspect';
  isInspectDropdownOpen = false;

  @ViewChildren('editableItem') editableProItems!: QueryList<ElementRef>;
  @ViewChildren('editableConItem') editableConItems!: QueryList<ElementRef>;
  @ViewChildren('editableKeyTakeaway') editableKeyTakeawayElement!: QueryList<ElementRef>;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideInspect = this.elementRef.nativeElement.querySelector('.inspect-dropdown')?.contains(target);
    
    if (!clickedInsideInspect && this.isInspectDropdownOpen) {
      this.closeInspectDropdown();
    }
  }

  ngAfterViewInit() {
    // Set initial HTML content for all items
    this.initializeEditableContent();
    
    // Watch for changes (like when adding new items)
    this.editableProItems.changes.subscribe(() => {
      this.initializeProContent();
    });
    
    this.editableConItems.changes.subscribe(() => {
      this.initializeConContent();
    });

    this.editableKeyTakeawayElement.changes.subscribe(() => {
      this.initializeKeyTakeawayContent();
    });
  }

  private initializeEditableContent() {
    this.initializeProContent();
    this.initializeConContent();
    this.initializeKeyTakeawayContent();
  }

  private initializeProContent() {
    this.editableProItems.forEach((item, index) => {
      const pro = this.pros[index];
      if (pro && !this.initializedProItems.has(pro.id)) {
        item.nativeElement.innerHTML = pro.text;
        this.initializedProItems.add(pro.id);
      }
    });
  }

  private initializeConContent() {
    this.editableConItems.forEach((item, index) => {
      const con = this.cons[index];
      if (con && !this.initializedConItems.has(con.id)) {
        item.nativeElement.innerHTML = con.text;
        this.initializedConItems.add(con.id);
      }
    });
  }

  private initializeKeyTakeawayContent() {
    if (this.editableKeyTakeawayElement && this.editableKeyTakeawayElement.first && !this.keyTakeawayInitialized) {
      const element = this.editableKeyTakeawayElement.first.nativeElement;
      element.innerHTML = this.keyTakeaway.text;
      this.keyTakeawayInitialized = true;
    }
  }
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
      // Clean up from all tracking sets
      this.initializedProItems.delete(id);
      this.initializedConItems.delete(id);
      this.newlyAddedProIds.delete(id);
      this.newlyAddedConIds.delete(id);
    }
  }

  addPro() {
    const newId = Math.max(...this.pros.map(p => p.id), 0) + 1;
    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`;
    
    this.pros.push({
      id: newId,
      text: 'New pro item...',
      byAI: false,
      date: formattedDate
    });

    // Mark this as a newly added item
    this.newlyAddedProIds.add(newId);

    // Focus the new item after it's rendered
    setTimeout(() => {
      const items = this.editableProItems.toArray();
      const lastItem = items[this.pros.length - 1];
      if (lastItem) {
        const element = lastItem.nativeElement;
        element.focus();
        // Select all text so it gets replaced when user types
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }, 150);
  }

  addCon() {
    const newId = Math.max(...this.cons.map(c => c.id), ...this.pros.map(p => p.id), 0) + 1;
    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`;
    
    this.cons.push({
      id: newId,
      text: 'New con item...',
      byAI: false,
      date: formattedDate
    });

    // Mark this as a newly added item
    this.newlyAddedConIds.add(newId);

    // Focus the new item after it's rendered
    setTimeout(() => {
      const items = this.editableConItems.toArray();
      const lastItem = items[this.cons.length - 1];
      if (lastItem) {
        const element = lastItem.nativeElement;
        element.focus();
        // Select all text so it gets replaced when user types
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }, 150);
  }

  onProContentChange(event: Event, pro: ReportItem) {
    const target = event.target as HTMLElement;
    
    // If this is a newly added item and user is typing for the first time
    if (this.newlyAddedProIds.has(pro.id)) {
      // Clear the placeholder text
      const currentText = target.innerText.trim();
      if (currentText === 'New pro item...') {
        target.innerHTML = '';
      }
      // Remove from newly added set since user has started editing
      this.newlyAddedProIds.delete(pro.id);
    }
    
    pro.text = target.innerHTML;
    console.log('Pro content changed:', pro.text);
  }

  onProFocus(proId: number, element: HTMLElement) {
    console.log('Focus on pro:', proId);
    // Only allow editing if not in preview mode
    if (this.inspectMode !== 'preview') {
      this.editingProId = proId;
      this.editingConId = null;
      this.editingKeyTakeaway = false;
      this.currentEditingElement = element;
      this.updateToolbarState();
    }
  }

  onConContentChange(event: Event, con: ReportItem) {
    const target = event.target as HTMLElement;
    
    // If this is a newly added item and user is typing for the first time
    if (this.newlyAddedConIds.has(con.id)) {
      // Clear the placeholder text
      const currentText = target.innerText.trim();
      if (currentText === 'New con item...') {
        target.innerHTML = '';
      }
      // Remove from newly added set since user has started editing
      this.newlyAddedConIds.delete(con.id);
    }
    
    con.text = target.innerHTML;
    console.log('Con content changed:', con.text);
  }

  onConFocus(conId: number, element: HTMLElement) {
    console.log('Focus on con:', conId);
    // Only allow editing if not in preview mode
    if (this.inspectMode !== 'preview') {
      this.editingConId = conId;
      this.editingProId = null;
      this.editingKeyTakeaway = false;
      this.currentEditingElement = element;
      this.updateToolbarState();
    }
  }

  onKeyTakeawayContentChange(event: Event) {
    const target = event.target as HTMLElement;
    this.keyTakeaway.text = target.innerHTML;
    console.log('Key takeaway content changed:', this.keyTakeaway.text);
  }

  onKeyTakeawayFocus(element: HTMLElement) {
    console.log('Focus on key takeaway');
    // Only allow editing if not in preview mode
    if (this.inspectMode !== 'preview') {
      this.editingKeyTakeaway = true;
      this.editingProId = null;
      this.editingConId = null;
      this.currentEditingElement = element;
      this.updateToolbarState();
    }
  }

  onKeyTakeawayBlur(element: HTMLElement) {
    console.log('Blur on key takeaway, saving content');
    // Save the final content
    this.keyTakeaway.text = element.innerHTML;
    this.editingKeyTakeaway = false;
    
    // Delay clearing to allow toolbar clicks
    setTimeout(() => {
      if (this.currentEditingElement === element) {
        this.currentEditingElement = null;
      }
    }, 300);
  }

  onSelectionChange() {
    if (this.currentEditingElement) {
      this.updateToolbarState();
    }
  }

  updateToolbarState() {
    // Update toolbar buttons to reflect current formatting
    this.isBold = document.queryCommandState('bold');
    this.isItalic = document.queryCommandState('italic');
    this.isUnderline = document.queryCommandState('underline');
    this.isStrikethrough = document.queryCommandState('strikeThrough');
    
    // Check alignment
    if (document.queryCommandState('justifyLeft')) {
      this.currentAlignment = 'left';
    } else if (document.queryCommandState('justifyCenter')) {
      this.currentAlignment = 'center';
    } else if (document.queryCommandState('justifyRight')) {
      this.currentAlignment = 'right';
    }
  }

  onProBlur(element: HTMLElement, pro: ReportItem) {
    console.log('Blur on pro, saving content');
    // Save the final content
    pro.text = element.innerHTML;
    this.editingProId = null;
    
    // Delay clearing to allow toolbar clicks
    setTimeout(() => {
      if (this.currentEditingElement === element) {
        this.currentEditingElement = null;
      }
    }, 300);
  }

  onConBlur(element: HTMLElement, con: ReportItem) {
    console.log('Blur on con, saving content');
    // Save the final content
    con.text = element.innerHTML;
    this.editingConId = null;
    
    // Delay clearing to allow toolbar clicks
    setTimeout(() => {
      if (this.currentEditingElement === element) {
        this.currentEditingElement = null;
      }
    }, 300);
  }

  applyFormat(command: string, value?: string) {
    console.log('Applying format:', command, 'to element:', this.currentEditingElement);
    
    if (!this.currentEditingElement) {
      console.warn('No editing element found');
      return;
    }

    // Store reference to avoid null issues
    const element = this.currentEditingElement;
    
    // Ensure element is focused
    element.focus();
    
    // Apply the formatting command
    try {
      const result = document.execCommand(command, false, value);
      console.log('execCommand result:', result);
      
      // Keep focus on the element
      element.focus();
      
      // Update toolbar state to reflect changes
      setTimeout(() => this.updateToolbarState(), 10);
    } catch (error) {
      console.error('Error applying format:', error);
    }
  }

  // Additional formatting commands
  insertLink() {
    if (!this.currentEditingElement) {
      console.warn('No editing element found');
      return;
    }
    
    // Store the current element before showing prompt
    const element = this.currentEditingElement;
    const url = prompt('Enter URL:');
    
    if (url) {
      // Restore the editing element and focus
      this.currentEditingElement = element;
      element.focus();
      this.applyFormat('createLink', url);
    } else {
      // Restore focus even if cancelled
      element.focus();
    }
  }

  removeFormat() {
    this.applyFormat('removeFormat');
  }

  changeFontSize(size: string) {
    this.applyFormat('fontSize', size);
  }

  changeTextColor(color: string) {
    this.applyFormat('foreColor', color);
  }

  changeBackgroundColor(color: string) {
    this.applyFormat('hiliteColor', color);
  }

  undo() {
    this.applyFormat('undo');
  }

  redo() {
    this.applyFormat('redo');
  }

  onToolbarMouseDown(event: MouseEvent) {
    console.log('Toolbar button mousedown');
    // Prevent the mousedown from causing blur on the contenteditable element
    event.preventDefault();
    event.stopPropagation();
  }

  onEditableClick(event: MouseEvent, element: HTMLElement) {
    console.log('Editable clicked');
    // Only allow editing if not in preview mode
    if (this.inspectMode !== 'preview') {
      element.setAttribute('contenteditable', 'true');
      this.currentEditingElement = element;
      this.updateToolbarState();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    // Handle keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
      switch (event.key.toLowerCase()) {
        case 'b':
          event.preventDefault();
          this.applyFormat('bold');
          break;
        case 'i':
          event.preventDefault();
          this.applyFormat('italic');
          break;
        case 'u':
          event.preventDefault();
          this.applyFormat('underline');
          break;
        case 'z':
          if (event.shiftKey) {
            event.preventDefault();
            this.redo();
          } else {
            event.preventDefault();
            this.undo();
          }
          break;
        case 'y':
          event.preventDefault();
          this.redo();
          break;
      }
    }
  }

  toggleInspectDropdown() {
    this.isInspectDropdownOpen = !this.isInspectDropdownOpen;
  }

  selectInspectMode(mode: 'inspect' | 'preview') {
    this.inspectMode = mode;
    this.isInspectDropdownOpen = false;
    console.log('Inspect mode changed to:', mode);
    
    // You can add additional logic here based on the selected mode
    // For example, trigger different views or behaviors
  }

  closeInspectDropdown() {
    this.isInspectDropdownOpen = false;
  }

  getInspectModeLabel(): string {
    switch (this.inspectMode) {
      case 'inspect':
        return 'Inspect';
      case 'preview':
        return 'Preview';
      default:
        return 'Inspect';
    }
  }

  getInspectModeIcon(): string {
    switch (this.inspectMode) {
      case 'inspect':
        return '/icons/inspect-icon.svg';
      case 'preview':
        return '/icons/preview-icon.svg';
      default:
        return '/icons/inspect-icon.svg';
    }
  }
}
