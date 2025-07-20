# NIBS Testing Guide

This document describes the comprehensive testing strategy for the Nuffield Interactive Book System (NIBS), focusing on accessibility, functionality, and user experience validation.

## Test Suite Overview

The NIBS test suite includes multiple layers of testing to ensure the system meets its accessibility-first design goals:

### 1. **Automated Test Suite** (`test-suite.js`)
- **System Initialization Tests**: Verify core system components load correctly
- **Content Loading Tests**: Validate document parsing and structure building
- **Navigation Tests**: Test hierarchical navigation and structure browser
- **Search Functionality Tests**: Validate search indexing and result generation
- **Snippet Creation Tests**: Test text selection and snippet management
- **Notes Taking Tests**: Verify note-taking functionality and persistence
- **Accessibility Tests**: Comprehensive ARIA, keyboard navigation, and screen reader support
- **Error Handling Tests**: Validate graceful failure and error recovery

### 2. **Interactive Test Environment** (`test.html`)
- Visual test runner with real-time feedback
- Multiple test content sources from Project Gutenberg
- Performance monitoring and logging
- Accessibility indicator and status reporting
- Manual testing controls and export capabilities

### 3. **Command Line Test Runner** (`test-runner.js`)
- Static code analysis for accessibility compliance
- HTML/CSS validation for web standards
- JavaScript linting for code quality
- Automated CI/CD integration support

## Running Tests

### Quick Start
```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests with detailed output
npm run test:verbose

# Start development server and run tests
npm run test:dev

# Open interactive test environment
npm run test:browser
```

### Manual Testing in Browser
1. Start the development server: `npm run dev`
2. Open `http://localhost:5173/test.html`
3. Use the test control panel to:
   - Load different content sources
   - Run specific test categories
   - Monitor performance metrics
   - Export test results

## Test Content

The test suite includes carefully selected content from Project Gutenberg to provide comprehensive testing scenarios:

### **Alice's Adventures in Wonderland** by Lewis Carroll
- **Purpose**: Tests narrative text processing and chapter-based navigation
- **Features Tested**: 
  - Hierarchical document structure
  - Search across fictional content
  - Character dialogue and description handling
  - Victorian English language patterns

### **Pride and Prejudice** by Jane Austen
- **Purpose**: Tests complex dialogue and social commentary text
- **Features Tested**:
  - Conversational text snippet extraction
  - Period-appropriate language search
  - Character name and relationship tracking
  - Long-form narrative navigation

### **The Metamorphosis** by Franz Kafka
- **Purpose**: Tests dense, philosophical text and translation quality
- **Features Tested**:
  - Complex sentence structures
  - Abstract concept searching
  - Philosophical text snippet organization
  - Stream-of-consciousness passages

## Accessibility Testing Focus Areas

### Motor Disability Support
- **Switch Navigation**: All functionality accessible via single-switch scanning
- **Minimal Movement**: Large click targets, keyboard shortcuts
- **Fatigue Management**: Auto-save features, session persistence
- **Customizable Interface**: Text sizing, contrast adjustment

### Keyboard Navigation
- **Tab Order**: Logical tab sequence through all interactive elements
- **Keyboard Shortcuts**: 
  - `Ctrl+F`: Open search
  - `Escape`: Close dialogs
  - `Ctrl+S`: Save notes
  - `Ctrl+Shift+T`: Run tests
- **Focus Management**: Clear focus indicators, proper focus trapping

### Screen Reader Support
- **ARIA Labels**: Comprehensive labeling for all interactive elements
- **Live Regions**: Status announcements for dynamic content changes
- **Semantic Structure**: Proper heading hierarchy and landmark roles
- **Alternative Text**: Descriptive text for all non-text content

### Visual Accessibility
- **High Contrast**: Support for `prefers-contrast: high`
- **Reduced Motion**: Respect for `prefers-reduced-motion: reduce`
- **Scalable Text**: Support for 200%+ zoom levels
- **Color Independence**: No information conveyed by color alone

## Test Categories

### Functional Tests
```javascript
// Example: Testing snippet creation
await testSuite.test('Manual snippet creation', () => {
  const originalCount = nibsSystem.snippets.length;
  nibsSystem.createSnippet('Test snippet text');
  return nibsSystem.snippets.length === originalCount + 1;
});
```

### Accessibility Tests
```javascript
// Example: Testing ARIA labels
await testSuite.test('ARIA labels present', () => {
  const elementsWithAria = ['section-select', 'search-input'];
  return elementsWithAria.every(id => {
    const element = document.getElementById(id);
    return element && element.getAttribute('aria-label');
  });
});
```

### Performance Tests
```javascript
// Example: Search performance validation
const searchStart = performance.now();
nibsSystem.performSearch();
const searchTime = performance.now() - searchStart;
// Validate search completes within acceptable time
```

## Test Data Management

### Content Loading
The test suite dynamically loads different document types to validate:
- Various text lengths and complexities
- Different structural organizations
- Multiple literary styles and periods
- Unicode and special character handling

### State Management
Tests verify proper handling of:
- User preferences persistence
- Session state recovery
- Error state management
- Progressive enhancement degradation

## Continuous Integration

### Automated Testing Pipeline
```bash
# CI/CD script example
npm install
npm run build
npm test
npm run test:accessibility
```

### Test Reports
- **JSON Output**: Machine-readable test results for CI integration
- **Console Output**: Human-readable summary for developers
- **HTML Reports**: Visual test reports for stakeholders
- **Coverage Reports**: Code coverage analysis for quality assurance

## Manual Testing Checklist

### 🔍 **Pre-Test Setup**
- [ ] Clear browser cache and localStorage
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Test with keyboard-only navigation
- [ ] Test with high contrast mode enabled
- [ ] Test with browser zoom at 200%

### ⌨️ **Keyboard Navigation**
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators are visible
- [ ] Test keyboard shortcuts work correctly
- [ ] Verify escape key exits dialogs
- [ ] Test arrow key navigation in structure browser

### 🔊 **Screen Reader Testing**
- [ ] All headings announced correctly
- [ ] ARIA labels read appropriately
- [ ] Status changes announced via live regions
- [ ] Form labels associated correctly
- [ ] Button purposes clear from context

### 📱 **Responsive Design**
- [ ] Test on tablet-sized screens
- [ ] Test on mobile devices
- [ ] Verify touch targets are adequate size
- [ ] Test landscape and portrait orientations

### 🎯 **User Workflow Testing**
- [ ] Complete text browsing workflow
- [ ] Perform comprehensive search tasks
- [ ] Create and organize multiple snippets
- [ ] Take notes while reading
- [ ] Generate document from snippets
- [ ] Save and restore session state

## Error Scenarios

### Network Issues
- Test offline functionality
- Validate graceful degradation
- Test with slow network connections

### Browser Compatibility
- Test in multiple browsers
- Validate with older browser versions
- Test with assistive technology combinations

### Edge Cases
- Test with very long documents
- Test with documents containing special characters
- Test with empty or minimal content
- Test rapid user interactions

## Performance Benchmarks

### Target Performance Metrics
- **Initial Load**: < 2 seconds for main interface
- **Search Response**: < 500ms for typical queries
- **Navigation**: < 200ms between sections
- **Snippet Creation**: < 100ms response time

### Memory Usage
- Monitor memory consumption during extended use
- Test for memory leaks in long sessions
- Validate performance with large documents

## Reporting Issues

When reporting test failures or accessibility issues:

1. **Environment**: Browser, OS, assistive technology used
2. **Steps to Reproduce**: Exact sequence of actions
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happened
5. **Test Data**: Which content was being used
6. **Severity**: Impact on user experience

## Contributing to Tests

### Adding New Tests
1. Identify the functionality to test
2. Write test cases in `test-suite.js`
3. Add any necessary test content to `test-content.js`
4. Update this documentation
5. Verify tests pass in CI environment

### Test Writing Guidelines
- Focus on user-visible functionality
- Test accessibility features comprehensively
- Include both positive and negative test cases
- Write clear, descriptive test names
- Document complex test scenarios

---

*The NIBS test suite ensures that the system maintains its commitment to accessibility and independence for users with motor disabilities, while providing robust functionality for educational use.*
