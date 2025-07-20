<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# NIBS - Nuffield Interactive Book System

This is a modern web implementation of the historic Nuffield Interactive Book System (NIBS) from the 1990s, designed to provide accessible electronic reading for students with motor disabilities.

## Key Design Principles

1. **Accessibility First**: All functionality must be keyboard accessible and work with assistive technologies
2. **Motor Disability Support**: Minimize required movements, provide switch-accessible interfaces
3. **Text-based Learning**: Focus on reading, note-taking, and snippet extraction workflows
4. **Independence**: Enable students to study without requiring assistance from others

## Core Features

- **Structure Browser**: Hierarchical navigation through document sections
- **Search Functionality**: Fast text search with contextual results
- **Snippet Extraction**: Allow users to extract and organize text snippets
- **Note Taking**: Integrated note-taking capabilities
- **Document Creation**: Build new documents from collected snippets
- **Customizable Display**: Adjustable text size and highlighting

## Technical Guidelines

- Use semantic HTML with proper ARIA labels
- Ensure all interactive elements are keyboard accessible
- Provide screen reader announcements for state changes
- Support high contrast and reduced motion preferences
- Use vanilla JavaScript for maximum compatibility
- Implement progressive enhancement principles

## Historical Context

The original NIBS was developed at Hereward College in the 1990s to address the needs of students with physical disabilities who couldn't easily turn pages in traditional books. This modern implementation honors that legacy while using current web technologies and accessibility standards.

When contributing to this project, always consider the user experience of someone with limited motor control who relies on assistive technologies.
