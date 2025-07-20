# How to Load Content into NIBS

## Quick Start Guide

### Method 1: Using the Content Selector (Easiest)

1. **Open NIBS**: Navigate to `http://localhost:5173`
2. **Find the Content Selector**: Look for the dropdown menu in the text controls area (next to A-, A+, 🖍️ buttons)
3. **Choose Content**: Select from available options:
   - `Atmospheric Pressure and Barometers (3 sections)` - Science content matching Figure 1
   - `'I can read but I can't turn the pages' - Original NIBS Paper (2 sections)` - Your original research
   - Plus any Project Gutenberg texts from the test suite

### Method 2: Loading Content Programmatically

```javascript
// Access the content loader
const loader = window.nibsSystem.contentLoader;

// Load atmospheric pressure content (matches your Figure 1)
loader.loadContent('atmospheric-pressure');

// Load the original NIBS paper
loader.loadContent('nibs-paper');
```

### Method 3: Creating Custom Content Structure

```javascript
// Create new structured content
const sections = [
  {
    id: "chapter1",
    title: "Chapter 1: Introduction",
    subsections: [
      {
        id: "overview",
        title: "Overview",
        content: `<h3>Your Content Here</h3><p>Structured text...</p>`
      }
    ]
  }
];

const contentId = nibsSystem.contentLoader.createContentFromStructure(
  "My Custom Document", 
  sections
);

// Then load it
nibsSystem.contentLoader.loadContent(contentId);
```

## Content Structure Format

All content in NIBS follows this hierarchical structure:

```javascript
{
  title: "Document Title",
  author: "Author Name", 
  year: "Publication Year",
  type: "content-type",
  sections: [
    {
      id: "section-id",
      title: "Section Title",
      subsections: [
        {
          id: "subsection-id", 
          title: "Subsection Title",
          content: `HTML content here`
        }
      ]
    }
  ]
}
```

## Available Content

### 📚 Atmospheric Pressure Content
**Matches Figure 1 from original NIBS**
- **Sections**: Introduction, Measuring Pressure, Practical Applications
- **Subsections**: 8 total covering barometers, pressure effects, weather prediction
- **Features**: Scientific terminology, diagrams references, practical applications

### 📄 Original NIBS Paper  
**Your 1991 research document**
- **Sections**: Abstract/Introduction, Design Strategy
- **Subsections**: Problem statement, research methodology, user needs, system requirements
- **Features**: Historical context, accessibility focus, research findings

### 📖 Project Gutenberg Literature
**Available in test environment**
- Alice's Adventures in Wonderland
- Pride and Prejudice  
- The Metamorphosis

## Navigation Features

Once content is loaded, you can:

### 🧭 **Structure Browser Navigation**
- **Section Dropdown**: Select main topics
- **Subsection Dropdown**: Navigate to specific content
- **Structure Map**: Visual hierarchy with clickable links

### 🔍 **Search Functionality**
- **Full-text Search**: Find any term across all sections
- **Contextual Results**: See surrounding text for search matches
- **Click-through Navigation**: Jump directly to relevant sections

### ✂️ **Snippet Creation**
1. Enable highlight mode (🖍️ button)
2. Select any text in the content area
3. Text automatically becomes a snippet
4. Manage snippets in the right panel

### 📝 **Note-Taking Integration**
- Switch between Snippets and Notes tabs
- Take notes while reading
- Notes persist across sessions

## Recreating the Original NIBS Experience

### From Figure 1 (Search Interface):
1. Load atmospheric pressure content
2. Use search to find "aneroid" or "barometer"
3. Navigate through results using the search panel

### From Figure 2 (Snippet Management):
1. Load any content
2. Enable highlight mode
3. Select multiple text passages
4. View organized snippets in right panel
5. Create document from collected snippets

## Advanced Content Loading

### Loading External Files
```javascript
// Load content from JSON file
fetch('/content/my-document.json')
  .then(response => response.json())
  .then(content => {
    const id = nibsSystem.contentLoader.createContentFromStructure(
      content.title, 
      content.sections
    );
    nibsSystem.contentLoader.loadContent(id);
  });
```

### Content Validation
The system automatically validates:
- ✅ Required structure (title, sections, subsections)
- ✅ Unique IDs for navigation
- ✅ HTML content safety
- ✅ Accessibility markup

## Troubleshooting

### Content Not Loading?
1. Check browser console for errors
2. Verify content structure matches required format
3. Ensure all IDs are unique
4. Confirm HTML content is well-formed

### Navigation Issues?
1. Refresh the page to reset state
2. Check that sections have subsections
3. Verify dropdown menus are populated
4. Use browser developer tools to inspect

### Search Not Working?
1. Wait for content to fully load
2. Check that search index was built
3. Try broader search terms
4. Verify content contains searchable text

## Browser Compatibility

### Recommended Testing
- **Chrome/Edge**: Full feature support
- **Firefox**: Complete compatibility  
- **Safari**: Works with minor styling differences
- **Screen Readers**: NVDA, JAWS, VoiceOver all supported

### Accessibility Testing
- **Keyboard Only**: Tab through all controls
- **Screen Reader**: Verify announcements work
- **High Contrast**: Test with system high contrast mode
- **Zoom**: Verify functionality at 200% zoom

---

*This modern NIBS implementation preserves the core accessibility and educational features of the original 1990s system while leveraging contemporary web technologies for enhanced usability and cross-platform compatibility.*
