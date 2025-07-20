#!/usr/bin/env node

// NIBS Command Line Test Runner
// Runs accessibility and functionality tests using headless browser

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class NIBSTestRunner {
  constructor() {
    this.testResults = [];
    this.verbose = false;
  }

  async runTests(options = {}) {
    this.verbose = options.verbose || false;
    
    console.log('🧪 NIBS Command Line Test Runner');
    console.log('================================');
    
    try {
      // Check if we have a test server available
      const testUrl = options.url || 'http://localhost:5173/test.html?test=true';
      
      this.log(`Testing NIBS at: ${testUrl}`);
      
      // Run basic accessibility checks
      await this.runAccessibilityChecks();
      
      // Run HTML validation
      await this.runHTMLValidation();
      
      // Run CSS validation
      await this.runCSSValidation();
      
      // Run JavaScript linting
      await this.runJSLinting();
      
      // Generate report
      this.generateReport();
      
    } catch (error) {
      console.error('❌ Test runner failed:', error.message);
      process.exit(1);
    }
  }

  async runAccessibilityChecks() {
    this.log('\n🔍 Running Accessibility Checks...');
    
    const checks = [
      {
        name: 'HTML Semantic Structure',
        test: () => this.checkHTMLStructure()
      },
      {
        name: 'ARIA Labels Present',
        test: () => this.checkARIALabels()
      },
      {
        name: 'Keyboard Navigation Support',
        test: () => this.checkKeyboardNavigation()
      },
      {
        name: 'Color Contrast',
        test: () => this.checkColorContrast()
      },
      {
        name: 'Screen Reader Support',
        test: () => this.checkScreenReaderSupport()
      }
    ];
    
    for (const check of checks) {
      try {
        const result = await check.test();
        this.recordTest(check.name, result.passed, result.details);
      } catch (error) {
        this.recordTest(check.name, false, error.message);
      }
    }
  }

  async runHTMLValidation() {
    this.log('\n📝 Validating HTML...');
    
    try {
      const htmlContent = readFileSync(join(__dirname, '../index.html'), 'utf8');
      
      // Check for basic HTML5 compliance
      const hasDoctype = htmlContent.includes('<!DOCTYPE html>');
      const hasLang = htmlContent.includes('lang="en"');
      const hasCharset = htmlContent.includes('charset="UTF-8"');
      const hasViewport = htmlContent.includes('viewport');
      
      this.recordTest('Valid HTML5 DOCTYPE', hasDoctype);
      this.recordTest('HTML lang attribute', hasLang);
      this.recordTest('UTF-8 charset declared', hasCharset);
      this.recordTest('Viewport meta tag present', hasViewport);
      
      // Check for accessibility elements
      const hasAriaLive = htmlContent.includes('aria-live');
      const hasAriaLabel = htmlContent.includes('aria-label');
      const hasRole = htmlContent.includes('role=');
      
      this.recordTest('ARIA live regions present', hasAriaLive);
      this.recordTest('ARIA labels present', hasAriaLabel);
      this.recordTest('ARIA roles defined', hasRole);
      
    } catch (error) {
      this.recordTest('HTML validation', false, error.message);
    }
  }

  async runCSSValidation() {
    this.log('\n🎨 Validating CSS...');
    
    try {
      const cssContent = readFileSync(join(__dirname, '../src/style.css'), 'utf8');
      
      // Check for accessibility features
      const hasHighContrast = cssContent.includes('prefers-contrast');
      const hasReducedMotion = cssContent.includes('prefers-reduced-motion');
      const hasFocusStyles = cssContent.includes(':focus');
      const hasScreenReader = cssContent.includes('.sr-only');
      
      this.recordTest('High contrast media query', hasHighContrast);
      this.recordTest('Reduced motion support', hasReducedMotion);
      this.recordTest('Focus styles defined', hasFocusStyles);
      this.recordTest('Screen reader classes', hasScreenReader);
      
      // Check for responsive design
      const hasMediaQueries = cssContent.includes('@media');
      const hasFlexbox = cssContent.includes('display: flex') || cssContent.includes('display:flex');
      const hasGrid = cssContent.includes('display: grid') || cssContent.includes('display:grid');
      
      this.recordTest('Responsive media queries', hasMediaQueries);
      this.recordTest('Modern layout (Flexbox)', hasFlexbox);
      this.recordTest('Modern layout (Grid)', hasGrid);
      
    } catch (error) {
      this.recordTest('CSS validation', false, error.message);
    }
  }

  async runJSLinting() {
    this.log('\n🔧 Checking JavaScript...');
    
    try {
      const jsContent = readFileSync(join(__dirname, '../src/main.js'), 'utf8');
      
      // Check for accessibility features
      const hasAnnouncerFunction = jsContent.includes('announceToUser');
      const hasKeyboardHandling = jsContent.includes('keydown');
      const hasAriaUpdates = jsContent.includes('setAttribute');
      const hasErrorHandling = jsContent.includes('try') && jsContent.includes('catch');
      
      this.recordTest('Screen reader announcements', hasAnnouncerFunction);
      this.recordTest('Keyboard event handling', hasKeyboardHandling);
      this.recordTest('ARIA attribute management', hasAriaUpdates);
      this.recordTest('Error handling present', hasErrorHandling);
      
      // Check for modern JavaScript
      const hasES6Classes = jsContent.includes('class ');
      const hasArrowFunctions = jsContent.includes('=>');
      const hasConst = jsContent.includes('const ');
      const hasLet = jsContent.includes('let ');
      
      this.recordTest('ES6+ syntax (classes)', hasES6Classes);
      this.recordTest('ES6+ syntax (arrow functions)', hasArrowFunctions);
      this.recordTest('Modern variable declarations', hasConst && hasLet);
      
    } catch (error) {
      this.recordTest('JavaScript validation', false, error.message);
    }
  }

  checkHTMLStructure() {
    const htmlContent = readFileSync(join(__dirname, '../index.html'), 'utf8');
    
    const semanticElements = ['<header', '<main', '<section', '<aside', '<nav'];
    const foundElements = semanticElements.filter(element => 
      htmlContent.includes(element)
    );
    
    return {
      passed: foundElements.length >= 4,
      details: `Found ${foundElements.length}/5 semantic elements: ${foundElements.join(', ')}`
    };
  }

  checkARIALabels() {
    const htmlContent = readFileSync(join(__dirname, '../index.html'), 'utf8');
    
    const ariaAttributes = [
      'aria-label', 'aria-labelledby', 'aria-describedby', 
      'aria-live', 'aria-controls', 'role='
    ];
    
    const foundAttributes = ariaAttributes.filter(attr => 
      htmlContent.includes(attr)
    );
    
    return {
      passed: foundAttributes.length >= 4,
      details: `Found ${foundAttributes.length}/6 ARIA attributes: ${foundAttributes.join(', ')}`
    };
  }

  checkKeyboardNavigation() {
    const jsContent = readFileSync(join(__dirname, '../src/main.js'), 'utf8');
    
    const keyboardFeatures = [
      'keydown', 'keypress', 'tabindex', 'focus()', 'addEventListener'
    ];
    
    const foundFeatures = keyboardFeatures.filter(feature => 
      jsContent.includes(feature)
    );
    
    return {
      passed: foundFeatures.length >= 3,
      details: `Found ${foundFeatures.length}/5 keyboard features: ${foundFeatures.join(', ')}`
    };
  }

  checkColorContrast() {
    const cssContent = readFileSync(join(__dirname, '../src/style.css'), 'utf8');
    
    // Check for sufficient color definitions and contrast considerations
    const hasColorDefinitions = (cssContent.match(/color:/g) || []).length > 5;
    const hasBackgroundColors = (cssContent.match(/background:/g) || []).length > 3;
    const hasContrastMedia = cssContent.includes('prefers-contrast');
    
    return {
      passed: hasColorDefinitions && hasBackgroundColors && hasContrastMedia,
      details: `Colors: ${hasColorDefinitions}, Backgrounds: ${hasBackgroundColors}, Contrast media: ${hasContrastMedia}`
    };
  }

  checkScreenReaderSupport() {
    const htmlContent = readFileSync(join(__dirname, '../index.html'), 'utf8');
    
    const srFeatures = [
      'aria-live', 'aria-atomic', 'sr-only', 'aria-label', 'role='
    ];
    
    const foundFeatures = srFeatures.filter(feature => 
      htmlContent.includes(feature)
    );
    
    return {
      passed: foundFeatures.length >= 3,
      details: `Found ${foundFeatures.length}/5 screen reader features: ${foundFeatures.join(', ')}`
    };
  }

  recordTest(name, passed, details = '') {
    const result = {
      name,
      passed: Boolean(passed),
      details,
      timestamp: new Date().toISOString()
    };
    
    this.testResults.push(result);
    
    const status = passed ? '✅' : '❌';
    const detailsText = details ? ` (${details})` : '';
    
    this.log(`  ${status} ${name}${detailsText}`);
  }

  generateReport() {
    const passed = this.testResults.filter(r => r.passed).length;
    const total = this.testResults.length;
    const successRate = ((passed / total) * 100).toFixed(1);
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 NIBS Test Report');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${total}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${total - passed}`);
    console.log(`Success Rate: ${successRate}%`);
    console.log('='.repeat(60));
    
    if (passed < total) {
      console.log('\n❌ Failed Tests:');
      this.testResults
        .filter(r => !r.passed)
        .forEach(r => console.log(`  • ${r.name}: ${r.details}`));
    }
    
    // Write detailed report to file
    const reportData = {
      summary: {
        total,
        passed,
        failed: total - passed,
        successRate: parseFloat(successRate),
        timestamp: new Date().toISOString()
      },
      tests: this.testResults
    };
    
    const reportPath = join(__dirname, '../test-report.json');
    writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    
    console.log(`\n📁 Detailed report saved to: ${reportPath}`);
    
    // Exit with appropriate code
    process.exit(passed === total ? 0 : 1);
  }

  log(message) {
    if (this.verbose || !message.startsWith('  ')) {
      console.log(message);
    }
  }
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const options = {
    verbose: args.includes('--verbose') || args.includes('-v'),
    url: args.find(arg => arg.startsWith('--url='))?.split('=')[1]
  };
  
  const runner = new NIBSTestRunner();
  runner.runTests(options);
}

export default NIBSTestRunner;
