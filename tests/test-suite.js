// NIBS System Test Suite
// Comprehensive testing for accessibility, functionality, and user workflows

import { gutenbergTexts } from './test-content.js';

class NIBSTestSuite {
  constructor() {
    this.testResults = [];
    this.passedTests = 0;
    this.failedTests = 0;
    this.testStartTime = null;
    this.nibsSystem = null;
  }

  async runAllTests() {
    console.log('🧪 Starting NIBS Test Suite...');
    this.testStartTime = Date.now();
    
    // Wait for NIBS system to initialize
    await this.waitForNIBSInit();
    
    // Run test categories
    await this.testSystemInitialization();
    await this.testContentLoading();
    await this.testNavigation();
    await this.testSearchFunctionality();
    await this.testSnippetCreation();
    await this.testNotesTaking();
    await this.testAccessibility();
    await this.testKeyboardNavigation();
    await this.testTextCustomization();
    await this.testDocumentCreation();
    await this.testErrorHandling();
    
    this.generateReport();
  }

  async waitForNIBSInit() {
    return new Promise((resolve) => {
      const checkInit = () => {
        if (window.nibsSystem && window.nibsSystem.currentDocument) {
          this.nibsSystem = window.nibsSystem;
          resolve();
        } else {
          setTimeout(checkInit, 100);
        }
      };
      checkInit();
    });
  }

  // Test System Initialization
  async testSystemInitialization() {
    this.startTestCategory('System Initialization');
    
    this.test('NIBS system exists', () => {
      return window.nibsSystem !== undefined;
    });
    
    this.test('Default document loaded', () => {
      return this.nibsSystem.currentDocument !== null;
    });
    
    this.test('UI elements present', () => {
      const elements = [
        'browse-btn', 'search-btn', 'snippets-btn', 'notes-btn',
        'text-content', 'structure-panel', 'notes-panel'
      ];
      return elements.every(id => document.getElementById(id) !== null);
    });
    
    this.test('Status announcer configured', () => {
      const announcer = document.getElementById('status-announcer');
      return announcer && announcer.getAttribute('aria-live') === 'assertive';
    });
  }

  // Test Content Loading
  async testContentLoading() {
    this.startTestCategory('Content Loading');
    
    this.test('Load Alice in Wonderland', async () => {
      const originalDoc = this.nibsSystem.currentDocument;
      this.nibsSystem.currentDocument = gutenbergTexts['alice-wonderland'];
      this.nibsSystem.populateStructureBrowser();
      this.nibsSystem.buildSearchIndex();
      
      const sectionSelect = document.getElementById('section-select');
      const hasChapter1 = Array.from(sectionSelect.options)
        .some(option => option.textContent.includes('Chapter 1'));
      
      // Restore original document
      this.nibsSystem.currentDocument = originalDoc;
      this.nibsSystem.populateStructureBrowser();
      
      return hasChapter1;
    });
    
    this.test('Structure browser populated', () => {
      const sectionSelect = document.getElementById('section-select');
      return sectionSelect.options.length > 1; // More than just placeholder
    });
    
    this.test('Search index built', () => {
      return this.nibsSystem.searchIndex.size > 0;
    });
  }

  // Test Navigation
  async testNavigation() {
    this.startTestCategory('Navigation');
    
    this.test('Section selection works', async () => {
      const sectionSelect = document.getElementById('section-select');
      if (sectionSelect.options.length > 1) {
        const firstSection = sectionSelect.options[1].value;
        sectionSelect.value = firstSection;
        sectionSelect.dispatchEvent(new Event('change'));
        
        const subsectionSelect = document.getElementById('subsection-select');
        return subsectionSelect.options.length > 1;
      }
      return false;
    });
    
    this.test('Subsection navigation', async () => {
      const subsectionSelect = document.getElementById('subsection-select');
      if (subsectionSelect.options.length > 1) {
        const originalContent = document.getElementById('text-content').innerHTML;
        
        subsectionSelect.value = subsectionSelect.options[1].value;
        subsectionSelect.dispatchEvent(new Event('change'));
        
        const newContent = document.getElementById('text-content').innerHTML;
        return originalContent !== newContent;
      }
      return false;
    });
    
    this.test('Structure map clickable links', () => {
      const mapLinks = document.querySelectorAll('.map-link');
      return mapLinks.length > 0 && mapLinks[0].onclick !== null;
    });
  }

  // Test Search Functionality
  async testSearchFunctionality() {
    this.startTestCategory('Search Functionality');
    
    this.test('Search panel toggles', () => {
      const searchPanel = document.getElementById('search-panel');
      const wasHidden = searchPanel.classList.contains('hidden');
      
      this.nibsSystem.showSearchMode();
      const nowVisible = !searchPanel.classList.contains('hidden');
      
      this.nibsSystem.showBrowseMode();
      const hiddenAgain = searchPanel.classList.contains('hidden');
      
      return wasHidden && nowVisible && hiddenAgain;
    });
    
    this.test('Search input focus', () => {
      this.nibsSystem.showSearchMode();
      const searchInput = document.getElementById('search-input');
      return document.activeElement === searchInput;
    });
    
    this.test('Search execution', async () => {
      const searchInput = document.getElementById('search-input');
      const searchResults = document.getElementById('search-results');
      
      searchInput.value = 'accessible';
      this.nibsSystem.performSearch();
      
      return searchResults.innerHTML.includes('results for');
    });
    
    this.test('Search with no results', async () => {
      const searchInput = document.getElementById('search-input');
      const searchResults = document.getElementById('search-results');
      
      searchInput.value = 'xyzzzyunlikelyterm';
      this.nibsSystem.performSearch();
      
      return searchResults.innerHTML.includes('No results found');
    });
  }

  // Test Snippet Creation
  async testSnippetCreation() {
    this.startTestCategory('Snippet Creation');
    
    this.test('Highlight mode toggle', () => {
      const originalMode = this.nibsSystem.highlightMode;
      this.nibsSystem.toggleHighlightMode();
      const toggled = this.nibsSystem.highlightMode !== originalMode;
      
      // Reset
      if (toggled) this.nibsSystem.toggleHighlightMode();
      
      return toggled;
    });
    
    this.test('Manual snippet creation', () => {
      const originalCount = this.nibsSystem.snippets.length;
      this.nibsSystem.createSnippet('This is a test snippet for NIBS testing.');
      const newCount = this.nibsSystem.snippets.length;
      
      return newCount === originalCount + 1;
    });
    
    this.test('Snippet display', () => {
      const snippetsList = document.getElementById('snippets-list');
      return snippetsList.innerHTML.includes('test snippet');
    });
    
    this.test('Snippet deletion', () => {
      const originalCount = this.nibsSystem.snippets.length;
      if (originalCount > 0) {
        const firstSnippetId = this.nibsSystem.snippets[0].id;
        this.nibsSystem.deleteSnippet(firstSnippetId);
        return this.nibsSystem.snippets.length === originalCount - 1;
      }
      return true; // No snippets to delete
    });
  }

  // Test Notes Taking
  async testNotesTaking() {
    this.startTestCategory('Notes Taking');
    
    this.test('Notes tab switching', () => {
      this.nibsSystem.switchTab('notes');
      const notesView = document.getElementById('notes-view');
      const snippetsView = document.getElementById('snippets-view');
      
      return !notesView.classList.contains('hidden') && 
             snippetsView.classList.contains('hidden');
    });
    
    this.test('Notes editor focus', () => {
      this.nibsSystem.focusNotes();
      const notesEditor = document.getElementById('notes-editor');
      return document.activeElement === notesEditor;
    });
    
    this.test('Notes saving', () => {
      const notesEditor = document.getElementById('notes-editor');
      const testNote = 'This is a test note for NIBS validation.';
      
      notesEditor.value = testNote;
      this.nibsSystem.saveNotes();
      
      return this.nibsSystem.notes === testNote;
    });
  }

  // Test Accessibility Features
  async testAccessibility() {
    this.startTestCategory('Accessibility');
    
    this.test('ARIA labels present', () => {
      const elementsWithAria = [
        'section-select', 'subsection-select', 'search-input'
      ];
      return elementsWithAria.every(id => {
        const element = document.getElementById(id);
        return element && element.getAttribute('aria-label');
      });
    });
    
    this.test('Status announcements work', async () => {
      const announcer = document.getElementById('status-announcer');
      const originalText = announcer.textContent;
      
      this.nibsSystem.announceToUser('Test announcement');
      const hasAnnouncement = announcer.textContent === 'Test announcement';
      
      // Wait for auto-clear
      await new Promise(resolve => setTimeout(resolve, 1100));
      const cleared = announcer.textContent === '';
      
      return hasAnnouncement && cleared;
    });
    
    this.test('Tab navigation structure', () => {
      const interactiveElements = document.querySelectorAll(
        'button, input, select, textarea, [tabindex="0"]'
      );
      return interactiveElements.length > 0;
    });
    
    this.test('High contrast CSS support', () => {
      const stylesheets = Array.from(document.styleSheets);
      const hasContrastMedia = stylesheets.some(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          return rules.some(rule => 
            rule.media && rule.media.mediaText.includes('prefers-contrast')
          );
        } catch (e) {
          return false;
        }
      });
      return hasContrastMedia;
    });
  }

  // Test Keyboard Navigation
  async testKeyboardNavigation() {
    this.startTestCategory('Keyboard Navigation');
    
    this.test('Escape closes search', () => {
      this.nibsSystem.showSearchMode();
      const searchPanel = document.getElementById('search-panel');
      
      // Simulate escape key
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      
      return searchPanel.classList.contains('hidden');
    });
    
    this.test('Ctrl+F opens search', () => {
      this.nibsSystem.showBrowseMode();
      
      // Simulate Ctrl+F
      const ctrlF = new KeyboardEvent('keydown', { 
        key: 'f', 
        ctrlKey: true 
      });
      document.dispatchEvent(ctrlF);
      
      const searchPanel = document.getElementById('search-panel');
      return !searchPanel.classList.contains('hidden');
    });
    
    this.test('Enter executes search', () => {
      const searchInput = document.getElementById('search-input');
      const searchResults = document.getElementById('search-results');
      
      searchInput.value = 'test';
      const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
      searchInput.dispatchEvent(enterEvent);
      
      return searchResults.innerHTML.length > 0;
    });
  }

  // Test Text Customization
  async testTextCustomization() {
    this.startTestCategory('Text Customization');
    
    this.test('Text size increase', () => {
      const originalSize = this.nibsSystem.currentTextSize;
      this.nibsSystem.adjustTextSize(2);
      return this.nibsSystem.currentTextSize === originalSize + 2;
    });
    
    this.test('Text size decrease', () => {
      const originalSize = this.nibsSystem.currentTextSize;
      this.nibsSystem.adjustTextSize(-2);
      return this.nibsSystem.currentTextSize === originalSize - 2;
    });
    
    this.test('Text size limits', () => {
      // Test minimum
      this.nibsSystem.currentTextSize = 14;
      this.nibsSystem.adjustTextSize(-10);
      const minLimit = this.nibsSystem.currentTextSize >= 12;
      
      // Test maximum
      this.nibsSystem.currentTextSize = 22;
      this.nibsSystem.adjustTextSize(10);
      const maxLimit = this.nibsSystem.currentTextSize <= 24;
      
      return minLimit && maxLimit;
    });
  }

  // Test Document Creation
  async testDocumentCreation() {
    this.startTestCategory('Document Creation');
    
    this.test('Document creation with snippets', () => {
      // Add test snippets
      this.nibsSystem.createSnippet('First test snippet');
      this.nibsSystem.createSnippet('Second test snippet');
      
      const originalContent = document.getElementById('text-content').innerHTML;
      this.nibsSystem.createDocumentFromSnippets();
      const newContent = document.getElementById('text-content').innerHTML;
      
      return newContent !== originalContent && 
             newContent.includes('My Study Document');
    });
    
    this.test('Document creation without snippets', () => {
      // Clear snippets
      this.nibsSystem.snippets = [];
      this.nibsSystem.updateSnippetsList();
      
      // Capture announcements
      let announcement = '';
      const originalAnnounce = this.nibsSystem.announceToUser;
      this.nibsSystem.announceToUser = (msg) => announcement = msg;
      
      this.nibsSystem.createDocumentFromSnippets();
      
      // Restore original function
      this.nibsSystem.announceToUser = originalAnnounce;
      
      return announcement.includes('No snippets available');
    });
  }

  // Test Error Handling
  async testErrorHandling() {
    this.startTestCategory('Error Handling');
    
    this.test('Invalid section navigation', () => {
      try {
        this.nibsSystem.displaySection('nonexistent', 'also-nonexistent');
        return true; // Should not throw
      } catch (e) {
        return false;
      }
    });
    
    this.test('Empty search handling', () => {
      const searchInput = document.getElementById('search-input');
      searchInput.value = '';
      
      try {
        this.nibsSystem.performSearch();
        return true; // Should handle gracefully
      } catch (e) {
        return false;
      }
    });
    
    this.test('Non-existent snippet deletion', () => {
      try {
        this.nibsSystem.deleteSnippet(99999);
        return true; // Should handle gracefully
      } catch (e) {
        return false;
      }
    });
  }

  // Test utility methods
  test(description, testFunction) {
    try {
      const result = testFunction();
      const success = result === true || (result && result.then);
      
      if (result && result.then) {
        // Handle async tests
        return result.then(actualResult => {
          this.recordTest(description, actualResult === true, null);
        }).catch(error => {
          this.recordTest(description, false, error);
        });
      } else {
        this.recordTest(description, success, null);
      }
    } catch (error) {
      this.recordTest(description, false, error);
    }
  }

  recordTest(description, passed, error) {
    const result = {
      description,
      passed,
      error: error ? error.message : null,
      timestamp: new Date().toISOString()
    };
    
    this.testResults.push(result);
    
    if (passed) {
      this.passedTests++;
      console.log(`✅ ${description}`);
    } else {
      this.failedTests++;
      console.log(`❌ ${description}${error ? `: ${error.message}` : ''}`);
    }
  }

  startTestCategory(category) {
    console.log(`\n📋 Testing: ${category}`);
  }

  generateReport() {
    const totalTime = Date.now() - this.testStartTime;
    const totalTests = this.passedTests + this.failedTests;
    const successRate = ((this.passedTests / totalTests) * 100).toFixed(1);
    
    console.log('\n' + '='.repeat(50));
    console.log('🧪 NIBS Test Suite Results');
    console.log('='.repeat(50));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${this.passedTests}`);
    console.log(`Failed: ${this.failedTests}`);
    console.log(`Success Rate: ${successRate}%`);
    console.log(`Execution Time: ${totalTime}ms`);
    console.log('='.repeat(50));
    
    if (this.failedTests > 0) {
      console.log('\n❌ Failed Tests:');
      this.testResults
        .filter(result => !result.passed)
        .forEach(result => {
          console.log(`  • ${result.description}${result.error ? `: ${result.error}` : ''}`);
        });
    }
    
    // Create visual report in the browser
    this.createVisualReport(totalTests, successRate, totalTime);
  }

  createVisualReport(totalTests, successRate, totalTime) {
    const reportHTML = `
      <div id="test-report" style="
        position: fixed; 
        top: 20px; 
        right: 20px; 
        background: white; 
        border: 2px solid #333; 
        padding: 1rem; 
        border-radius: 8px; 
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        max-width: 300px;
        z-index: 9999;
        font-family: monospace;
      ">
        <h3 style="margin-top: 0; color: #2c3e50;">🧪 NIBS Test Results</h3>
        <p><strong>Total Tests:</strong> ${totalTests}</p>
        <p><strong>Passed:</strong> <span style="color: green;">${this.passedTests}</span></p>
        <p><strong>Failed:</strong> <span style="color: red;">${this.failedTests}</span></p>
        <p><strong>Success Rate:</strong> ${successRate}%</p>
        <p><strong>Time:</strong> ${totalTime}ms</p>
        <button onclick="document.getElementById('test-report').remove()" 
                style="background: #e74c3c; color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer;">
          Close Report
        </button>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', reportHTML);
  }
}

// Export for use in browser console or test runner
window.NIBSTestSuite = NIBSTestSuite;

// Auto-run tests if in test mode
if (window.location.search.includes('test=true')) {
  document.addEventListener('DOMContentLoaded', async () => {
    // Wait a bit for NIBS to fully initialize
    setTimeout(async () => {
      const testSuite = new NIBSTestSuite();
      await testSuite.runAllTests();
    }, 1000);
  });
}
