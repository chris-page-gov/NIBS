// NIBS - Nuffield Interactive Book System
// Modern implementation of the accessibility-focused book reader

import { enhanceNIBSWithContentLoader } from './content-loader.js';

class NIBSSystem {
  constructor() {
    this.currentDocument = null;
    this.snippets = [];
    this.notes = '';
    this.searchIndex = new Map();
    this.currentTextSize = 16;
    this.highlightMode = false;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadSampleDocument();
    this.announceToUser('NIBS system initialized. Use tab to navigate between controls.');
  }

  setupEventListeners() {
    // Navigation buttons
    document.getElementById('browse-btn').addEventListener('click', () => this.showBrowseMode());
    document.getElementById('search-btn').addEventListener('click', () => this.showSearchMode());
    document.getElementById('snippets-btn').addEventListener('click', () => this.focusSnippets());
    document.getElementById('notes-btn').addEventListener('click', () => this.focusNotes());

    // Text controls
    document.getElementById('text-size-decrease').addEventListener('click', () => this.adjustTextSize(-2));
    document.getElementById('text-size-increase').addEventListener('click', () => this.adjustTextSize(2));
    document.getElementById('highlight-mode').addEventListener('click', () => this.toggleHighlightMode());

    // Structure browser
    document.getElementById('section-select').addEventListener('change', (e) => this.navigateToSection(e.target.value));
    document.getElementById('subsection-select').addEventListener('change', (e) => this.navigateToSubsection(e.target.value));

    // Search functionality
    document.getElementById('search-execute').addEventListener('click', () => this.performSearch());
    document.getElementById('search-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.performSearch();
    });

    // Tab controls
    document.getElementById('snippets-tab').addEventListener('click', () => this.switchTab('snippets'));
    document.getElementById('notes-tab').addEventListener('click', () => this.switchTab('notes'));

    // Notes and snippets
    document.getElementById('save-notes-btn').addEventListener('click', () => this.saveNotes());
    document.getElementById('create-document-btn').addEventListener('click', () => this.createDocumentFromSnippets());

    // Text selection for snippet creation
    document.getElementById('text-content').addEventListener('mouseup', () => this.handleTextSelection());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
  }

  loadSampleDocument() {
    const sampleDocument = {
      title: "Introduction to Accessible Computing",
      sections: [
        {
          id: "intro",
          title: "Introduction",
          subsections: [
            {
              id: "overview",
              title: "Overview",
              content: `
                <h3>Accessible Computing Overview</h3>
                <p>Accessible computing ensures that technology is usable by people with disabilities. This includes individuals with motor disabilities, visual impairments, hearing impairments, and cognitive disabilities.</p>
                <p>The principles of accessible design benefit all users, not just those with disabilities. Features like keyboard navigation, high contrast displays, and clear navigation structures improve the experience for everyone.</p>
                <p>Historical context shows that accessibility features often become mainstream. Examples include curb cuts, which were originally designed for wheelchair users but are now used by everyone with wheeled luggage, strollers, or bicycles.</p>
              `
            },
            {
              id: "principles",
              title: "Key Principles",
              content: `
                <h3>Key Accessibility Principles</h3>
                <p><strong>Perceivable:</strong> Information must be presentable in ways users can perceive. This includes providing text alternatives for images and captions for videos.</p>
                <p><strong>Operable:</strong> Interface components must be operable by all users. This means functionality must be available from a keyboard and users have enough time to read content.</p>
                <p><strong>Understandable:</strong> Information and UI operation must be understandable. This includes making text readable and helping users avoid and correct mistakes.</p>
                <p><strong>Robust:</strong> Content must be robust enough to be interpreted by assistive technologies like screen readers and voice recognition software.</p>
              `
            }
          ]
        },
        {
          id: "history",
          title: "Historical Development",
          subsections: [
            {
              id: "early-systems",
              title: "Early Systems",
              content: `
                <h3>Early Accessibility Systems</h3>
                <p>The development of accessible computing began in the 1960s with the first screen readers for blind users. These early systems used speech synthesis to read text displayed on computer screens.</p>
                <p>The 1970s saw the development of the first electronic book systems, including projects like the Kurzweil Reading Machine, which could scan printed text and read it aloud.</p>
                <p>During the 1980s, personal computers became more accessible with the introduction of specialized keyboards, mouse alternatives, and voice recognition systems.</p>
              `
            },
            {
              id: "modern-era",
              title: "Modern Era",
              content: `
                <h3>Modern Accessibility</h3>
                <p>The 1990s marked a significant advancement with the development of systems like NIBS (Nuffield Interactive Book System), which provided electronic books specifically designed for students with motor disabilities.</p>
                <p>Web accessibility standards were established in the late 1990s and early 2000s, providing guidelines for making web content accessible to all users.</p>
                <p>Today, accessibility is integrated into major operating systems and applications, with features like screen readers, voice control, and customizable interfaces built-in by default.</p>
              `
            }
          ]
        }
      ]
    };

    this.currentDocument = sampleDocument;
    this.populateStructureBrowser();
    this.buildSearchIndex();
    this.displaySection('intro', 'overview');
  }

  populateStructureBrowser() {
    const sectionSelect = document.getElementById('section-select');
    const subsectionSelect = document.getElementById('subsection-select');
    
    // Clear existing options
    sectionSelect.innerHTML = '<option value="">Select a section...</option>';
    subsectionSelect.innerHTML = '<option value="">Select a subsection...</option>';
    
    // Populate sections
    this.currentDocument.sections.forEach(section => {
      const option = document.createElement('option');
      option.value = section.id;
      option.textContent = section.title;
      sectionSelect.appendChild(option);
    });
    
    this.updateStructureMap();
  }

  updateStructureMap() {
    const mapContent = document.querySelector('.map-content');
    let mapHTML = '<ul role="tree">';
    
    this.currentDocument.sections.forEach(section => {
      mapHTML += `<li role="treeitem" aria-expanded="true">
        <strong>${section.title}</strong>
        <ul>`;
      
      section.subsections.forEach(subsection => {
        mapHTML += `<li role="treeitem">
          <button onclick="nibsSystem.displaySection('${section.id}', '${subsection.id}')" class="map-link">
            ${subsection.title}
          </button>
        </li>`;
      });
      
      mapHTML += '</ul></li>';
    });
    
    mapHTML += '</ul>';
    mapContent.innerHTML = mapHTML;
  }

  navigateToSection(sectionId) {
    if (!sectionId) return;
    
    const section = this.currentDocument.sections.find(s => s.id === sectionId);
    const subsectionSelect = document.getElementById('subsection-select');
    
    // Update subsection dropdown
    subsectionSelect.innerHTML = '<option value="">Select a subsection...</option>';
    section.subsections.forEach(subsection => {
      const option = document.createElement('option');
      option.value = subsection.id;
      option.textContent = subsection.title;
      subsectionSelect.appendChild(option);
    });
    
    // Display first subsection by default
    if (section.subsections.length > 0) {
      this.displaySection(sectionId, section.subsections[0].id);
      subsectionSelect.value = section.subsections[0].id;
    }
  }

  navigateToSubsection(subsectionId) {
    if (!subsectionId) return;
    
    const sectionSelect = document.getElementById('section-select');
    const sectionId = sectionSelect.value;
    
    if (sectionId) {
      this.displaySection(sectionId, subsectionId);
    }
  }

  displaySection(sectionId, subsectionId) {
    try {
      const section = this.currentDocument.sections.find(s => s.id === sectionId);
      const subsection = section?.subsections.find(ss => ss.id === subsectionId);
      
      if (!subsection) {
        this.announceToUser('Section not found');
        return;
      }
      
      const textContent = document.getElementById('text-content');
      textContent.innerHTML = subsection.content;
      
      // Update dropdowns to reflect current position
      document.getElementById('section-select').value = sectionId;
      document.getElementById('subsection-select').value = subsectionId;
      
      this.announceToUser(`Now displaying: ${section.title} - ${subsection.title}`);
    } catch (error) {
      console.error('Error displaying section:', error);
      this.announceToUser('Error loading section');
    }
  }

  buildSearchIndex() {
    this.searchIndex.clear();
    
    this.currentDocument.sections.forEach(section => {
      section.subsections.forEach(subsection => {
        const text = subsection.content.replace(/<[^>]*>/g, '').toLowerCase();
        const words = text.split(/\W+/).filter(word => word.length > 2);
        
        words.forEach(word => {
          if (!this.searchIndex.has(word)) {
            this.searchIndex.set(word, []);
          }
          this.searchIndex.get(word).push({
            sectionId: section.id,
            subsectionId: subsection.id,
            title: `${section.title} - ${subsection.title}`,
            context: this.extractContext(text, word)
          });
        });
      });
    });
  }

  extractContext(text, word) {
    const index = text.indexOf(word);
    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + word.length + 50);
    return text.substring(start, end);
  }

  performSearch() {
    try {
      const query = document.getElementById('search-input').value.trim().toLowerCase();
      if (!query) return;
      
      const results = [];
      const words = query.split(/\W+/);
      
      words.forEach(word => {
        if (this.searchIndex.has(word)) {
          results.push(...this.searchIndex.get(word));
        }
      });
      
      this.displaySearchResults(results, query);
    } catch (error) {
      console.error('Search error:', error);
      this.announceToUser('Search error occurred');
    }
  }

  displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
      searchResults.innerHTML = `<p>No results found for "${query}"</p>`;
      this.announceToUser(`No results found for ${query}`);
      return;
    }
    
    let resultsHTML = `<h4>${results.length} results for "${query}":</h4>`;
    
    // Remove duplicates
    const uniqueResults = results.filter((result, index, self) => 
      index === self.findIndex(r => r.sectionId === result.sectionId && r.subsectionId === result.subsectionId)
    );
    
    uniqueResults.forEach((result, index) => {
      resultsHTML += `
        <div class="search-result">
          <button onclick="nibsSystem.displaySection('${result.sectionId}', '${result.subsectionId}')" class="result-link">
            ${result.title}
          </button>
          <p class="result-context">${result.context}</p>
        </div>
      `;
    });
    
    searchResults.innerHTML = resultsHTML;
    this.announceToUser(`Found ${uniqueResults.length} results for ${query}`);
  }

  showBrowseMode() {
    document.getElementById('search-panel').classList.add('hidden');
    this.announceToUser('Browse mode activated. Use structure browser to navigate.');
  }

  showSearchMode() {
    document.getElementById('search-panel').classList.remove('hidden');
    document.getElementById('search-input').focus();
    this.announceToUser('Search mode activated. Enter search terms.');
  }

  focusSnippets() {
    this.switchTab('snippets');
    this.announceToUser('Snippets panel focused. Select text in the main content to create snippets.');
  }

  focusNotes() {
    this.switchTab('notes');
    document.getElementById('notes-editor').focus();
    this.announceToUser('Notes panel focused. Use the text area to write notes.');
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('tabindex', '-1');
    });
    
    const activeTab = document.getElementById(`${tabName}-tab`);
    activeTab.classList.add('active');
    activeTab.setAttribute('tabindex', '0');
    
    // Update views
    document.getElementById('snippets-view').classList.toggle('hidden', tabName !== 'snippets');
    document.getElementById('notes-view').classList.toggle('hidden', tabName !== 'notes');
  }

  adjustTextSize(change) {
    this.currentTextSize += change;
    this.currentTextSize = Math.max(12, Math.min(24, this.currentTextSize));
    
    document.getElementById('text-content').style.fontSize = `${this.currentTextSize}px`;
    this.announceToUser(`Text size adjusted to ${this.currentTextSize} pixels`);
  }

  toggleHighlightMode() {
    this.highlightMode = !this.highlightMode;
    const btn = document.getElementById('highlight-mode');
    btn.textContent = this.highlightMode ? '🖍️ ON' : '🖍️';
    btn.setAttribute('aria-pressed', this.highlightMode);
    
    this.announceToUser(`Highlight mode ${this.highlightMode ? 'enabled' : 'disabled'}`);
  }

  handleTextSelection() {
    if (!this.highlightMode) return;
    
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText.length > 0) {
      this.createSnippet(selectedText);
      selection.removeAllRanges();
    }
  }

  createSnippet(text) {
    const snippet = {
      id: Date.now(),
      text: text,
      source: this.getCurrentLocation(),
      timestamp: new Date().toLocaleString()
    };
    
    this.snippets.push(snippet);
    this.updateSnippetsList();
    this.announceToUser(`Snippet created: ${text.substring(0, 50)}...`);
  }

  getCurrentLocation() {
    const sectionSelect = document.getElementById('section-select');
    const subsectionSelect = document.getElementById('subsection-select');
    
    const sectionText = sectionSelect.options[sectionSelect.selectedIndex]?.text || '';
    const subsectionText = subsectionSelect.options[subsectionSelect.selectedIndex]?.text || '';
    
    return `${sectionText} - ${subsectionText}`;
  }

  updateSnippetsList() {
    const snippetsList = document.getElementById('snippets-list');
    
    if (this.snippets.length === 0) {
      snippetsList.innerHTML = '<p>No snippets yet. Enable highlight mode and select text to create snippets.</p>';
      return;
    }
    
    let snippetsHTML = '';
    this.snippets.forEach(snippet => {
      snippetsHTML += `
        <div class="snippet" role="listitem">
          <div class="snippet-text">${snippet.text}</div>
          <div class="snippet-meta">
            <small>From: ${snippet.source}</small>
            <small>Created: ${snippet.timestamp}</small>
            <button onclick="nibsSystem.deleteSnippet(${snippet.id})" aria-label="Delete snippet">❌</button>
          </div>
        </div>
      `;
    });
    
    snippetsList.innerHTML = snippetsHTML;
  }

  deleteSnippet(snippetId) {
    this.snippets = this.snippets.filter(s => s.id !== snippetId);
    this.updateSnippetsList();
    this.announceToUser('Snippet deleted');
  }

  saveNotes() {
    this.notes = document.getElementById('notes-editor').value;
    localStorage.setItem('nibs-notes', this.notes);
    this.announceToUser('Notes saved');
  }

  createDocumentFromSnippets() {
    if (this.snippets.length === 0) {
      this.announceToUser('No snippets available to create document');
      return;
    }
    
    let documentContent = '<h2>My Study Document</h2>\n';
    documentContent += `<p>Created from ${this.snippets.length} snippets on ${new Date().toLocaleString()}</p>\n\n`;
    
    this.snippets.forEach((snippet, index) => {
      documentContent += `<div class="snippet-section">`;
      documentContent += `<h3>Extract ${index + 1}</h3>`;
      documentContent += `<blockquote>${snippet.text}</blockquote>`;
      documentContent += `<p><em>Source: ${snippet.source}</em></p>`;
      documentContent += `</div>\n\n`;
    });
    
    // Display in main content area
    document.getElementById('text-content').innerHTML = documentContent;
    this.announceToUser(`Document created from ${this.snippets.length} snippets`);
  }

  handleKeyboardNavigation(e) {
    // Escape key to close search
    if (e.key === 'Escape') {
      document.getElementById('search-panel').classList.add('hidden');
    }
    
    // Ctrl+F to open search
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      this.showSearchMode();
    }
    
    // Ctrl+S to save notes
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      this.saveNotes();
    }
  }

  announceToUser(message) {
    const announcer = document.getElementById('status-announcer');
    announcer.textContent = message;
    
    // Clear after a short delay to allow for new announcements
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  }
}

// Initialize the NIBS system when the page loads
let nibsSystem;
document.addEventListener('DOMContentLoaded', () => {
  nibsSystem = new NIBSSystem();
  
  // Enhance with content loader
  enhanceNIBSWithContentLoader(nibsSystem);
});

// Make nibsSystem globally available for inline event handlers
window.nibsSystem = nibsSystem;
