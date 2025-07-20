# Contributing to NIBS

Thank you for considering contributing to the Nuffield Interactive Book System (NIBS)! This project is dedicated to accessibility and educational technology, continuing the legacy of the original 1990s system.

## Code of Conduct

This project is committed to providing a welcoming and inclusive environment for all contributors, especially those with disabilities or who work in accessibility. We prioritize accessibility in all contributions.

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- Basic understanding of web accessibility principles
- Familiarity with WCAG 2.1 guidelines (helpful but not required)

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/NIBS.git`
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Run tests: `npm test`

## Types of Contributions

### 🔧 Code Contributions
- **Accessibility Improvements**: Enhanced keyboard navigation, screen reader support
- **Feature Enhancements**: New content types, improved search, snippet management
- **Bug Fixes**: Resolving accessibility or functionality issues
- **Performance Optimizations**: Faster loading, better memory usage

### 📚 Content Contributions
- **Educational Content**: Structured documents for testing and demonstration
- **Accessibility Testing**: Manual testing with assistive technologies
- **Documentation**: Improving guides, adding examples

### 🧪 Testing Contributions
- **Test Cases**: Additional automated test scenarios
- **Accessibility Testing**: Manual testing with screen readers, switch devices
- **Browser Compatibility**: Testing across different browsers and devices

## Accessibility Guidelines

All contributions must maintain or improve accessibility:

### ✅ Required Standards
- **WCAG 2.1 AA Compliance**: All features must meet these standards
- **Keyboard Navigation**: Every interactive element must be keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and announcements
- **Focus Management**: Clear focus indicators and logical tab order
- **Motor Disability Support**: Large click targets, minimal movement required

### 🧪 Testing Requirements
Before submitting:
- [ ] Test with keyboard-only navigation
- [ ] Verify screen reader compatibility (NVDA, JAWS, or VoiceOver)
- [ ] Check high contrast mode compatibility
- [ ] Test with browser zoom at 200%
- [ ] Run automated test suite: `npm test`

## Development Process

### 1. Issue Creation
- Check existing issues first
- Use provided issue templates
- Include accessibility impact assessment
- Provide steps to reproduce for bugs

### 2. Branch Naming
- `feature/description` - New features
- `fix/issue-number` - Bug fixes
- `accessibility/description` - Accessibility improvements
- `test/description` - Test additions

### 3. Commit Messages
Follow conventional commits:
```
type(scope): description

feat(search): add voice search capability
fix(navigation): resolve keyboard trap in modal
a11y(snippets): improve screen reader announcements
test(content): add Project Gutenberg test content
```

### 4. Pull Request Process
1. **Create PR** with descriptive title and detailed description
2. **Fill out PR template** including accessibility checklist
3. **Include tests** for new functionality
4. **Update documentation** if needed
5. **Request review** from maintainers

## Code Style Guidelines

### JavaScript
- Use ES6+ features for modern browser support
- Follow semantic variable naming
- Include JSDoc comments for public functions
- Prioritize readability and accessibility

### CSS
- Use semantic class names
- Include focus styles for all interactive elements
- Support high contrast and reduced motion preferences
- Mobile-first responsive design

### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels and roles
- Maintain logical heading hierarchy
- Provide alternative text for images

## Testing Guidelines

### Automated Tests
```bash
npm test              # Run all tests
npm run test:verbose  # Detailed output
npm run test:browser  # Interactive testing
```

### Manual Testing Checklist
- [ ] **Keyboard Navigation**: Tab through all controls
- [ ] **Screen Reader**: Test with assistive technology
- [ ] **High Contrast**: Verify visibility in high contrast mode
- [ ] **Zoom**: Test functionality at 200% zoom
- [ ] **Mobile**: Test touch accessibility

### Writing Tests
- Focus on user-visible functionality
- Include accessibility-specific test cases
- Test error conditions and edge cases
- Document test purposes clearly

## Documentation Standards

### Code Documentation
- Include JSDoc comments for all public functions
- Document accessibility features and requirements
- Explain complex accessibility implementations

### User Documentation
- Provide clear, step-by-step instructions
- Include accessibility features in all guides
- Use inclusive language throughout

## Content Guidelines

### Adding Educational Content
Content should follow this structure:
```javascript
{
  title: "Document Title",
  author: "Author Name",
  sections: [
    {
      id: "section-id",
      title: "Section Title", 
      subsections: [
        {
          id: "subsection-id",
          title: "Subsection Title",
          content: "HTML content with semantic markup"
        }
      ]
    }
  ]
}
```

### Content Accessibility
- Use proper heading hierarchy (h1, h2, h3)
- Include alt text for any images
- Use semantic markup (lists, tables, etc.)
- Ensure good color contrast for any colored text

## Review Process

### For Maintainers
1. **Accessibility Review**: Verify WCAG compliance
2. **Code Review**: Check code quality and standards
3. **Testing**: Run automated and manual tests
4. **Documentation**: Ensure adequate documentation

### Review Criteria
- ✅ Maintains or improves accessibility
- ✅ Includes appropriate tests
- ✅ Follows code style guidelines
- ✅ Updates documentation if needed
- ✅ Doesn't break existing functionality

## Community

### Getting Help
- **GitHub Discussions**: For questions and community support
- **Issues**: For bug reports and feature requests
- **Wiki**: For detailed documentation and guides

### Recognition
Contributors will be recognized in:
- README acknowledgments
- CHANGELOG entries
- Release notes

## Historical Context

Remember that NIBS continues the legacy of the original 1990s system that empowered students with motor disabilities to study independently. Every contribution should honor this mission by prioritizing accessibility and educational value.

---

*"The students wanted to be able to study independently, and this led to a two-year research programme, conducted between 1987 and 1989, into alternative solutions for meeting this need."* - Original NIBS paper

Thank you for helping to continue this important work!
