// NIBS Content Loader - Enhanced content management system
// Allows easy loading of structured educational content

export class NIBSContentLoader {
  constructor(nibsSystem) {
    this.nibsSystem = nibsSystem;
    this.availableContent = new Map();
    this.initializeContentLibrary();
  }

  initializeContentLibrary() {
    // Register available content sources
    this.registerContent('atmospheric-pressure', {
      title: "Atmospheric Pressure and Barometers",
      author: "Educational Sciences",
      type: "science",
      sections: [
        {
          id: "introduction",
          title: "Introduction to Atmospheric Pressure",
          subsections: [
            {
              id: "what-is-pressure",
              title: "What is Atmospheric Pressure?",
              content: `
                <h3>Understanding Atmospheric Pressure</h3>
                <p>Atmospheric pressure is the force exerted by the weight of the atmosphere above us. At sea level, this pressure equals approximately 14.7 pounds per square inch (psi) or 1013.25 millibars.</p>
                <p>The atmosphere exerts pressure because air has weight. A column of air from sea level to the top of the atmosphere weighs approximately 14.7 pounds for every square inch of Earth's surface.</p>
                <p>This pressure varies with altitude, weather conditions, and geographic location. Understanding atmospheric pressure is crucial for weather prediction, aviation, and many scientific applications.</p>
              `
            },
            {
              id: "pressure-effects",
              title: "Effects of Pressure Changes",
              content: `
                <h3>How Pressure Affects Our World</h3>
                <p>Changes in atmospheric pressure have significant effects on weather patterns, human physiology, and mechanical systems.</p>
                <p><strong>Weather Effects:</strong> Low pressure systems typically bring cloudy, rainy weather, while high pressure systems are associated with clear, sunny conditions.</p>
                <p><strong>Physiological Effects:</strong> Rapid changes in altitude can cause discomfort due to pressure differences between the inner ear and the environment.</p>
                <p><strong>Mechanical Effects:</strong> Many instruments and devices rely on atmospheric pressure for proper operation, including altimeters and some types of pumps.</p>
              `
            }
          ]
        },
        {
          id: "measuring-pressure",
          title: "Measuring Atmospheric Pressure",
          subsections: [
            {
              id: "mercury-barometer",
              title: "Mercury Barometer",
              content: `
                <h3>The Mercury Barometer</h3>
                <p>A mercury barometer consists of a glass tube about 30 inches long, closed at one end and filled with mercury. The open end is inverted into a reservoir of mercury.</p>
                <p>The mercury in the tube falls until the weight of the mercury column exactly balances the atmospheric pressure. Standard atmospheric pressure supports a column of mercury 29.92 inches (760 mm) high.</p>
                <p>When atmospheric pressure increases, it pushes harder on the mercury in the reservoir, forcing more mercury up the column. When pressure decreases, the mercury in the tube falls.</p>
                <p><em>The mercury barometer was invented by Evangelista Torricelli in 1643 and remains one of the most accurate methods for measuring atmospheric pressure.</em></p>
              `
            },
            {
              id: "aneroid-barometer",
              title: "Aneroid Barometer",
              content: `
                <h3>Aneroid Barometer</h3>
                <p>An aneroid (no liquid) barometer consists of a partially evacuated, thin metal box with corrugated sides to increase its strength.</p>
                <p>The box is prevented from collapsing by a strong spring. If the atmospheric pressure increases, the box caves in slightly; if it decreases, the spring pulls it out. A system of levers magnifies this movement and causes a chain to move a pointer over a scale.</p>
                <p>Aneroid barometers are used as weather glasses, high pressure being associated with fine weather. They are also used as altimeters to measure the height of an aircraft above a wooden floor than is an element.</p>
                <p><strong>Advantages:</strong> Portable, no toxic mercury, less fragile than mercury barometers.</p>
                <p><strong>Disadvantages:</strong> Less accurate than mercury barometers, affected by temperature changes.</p>
              `
            },
            {
              id: "pressure-gauges",
              title: "Modern Pressure Gauges",
              content: `
                <h3>Contemporary Pressure Measurement</h3>
                <p>Modern pressure measurement devices include digital barometers, pressure transducers, and electronic weather stations.</p>
                <p><strong>Digital Barometers:</strong> Use electronic sensors to detect pressure changes and display readings on digital screens with high precision.</p>
                <p><strong>Pressure Transducers:</strong> Convert pressure measurements into electrical signals for computer processing and data logging.</p>
                <p><strong>Weather Stations:</strong> Combine multiple atmospheric measurements including pressure, temperature, humidity, and wind speed.</p>
                <p>The vertical height of the column is unchanged if the tube is tilted, provided the bottom remains in the mercury pool.</p>
              `
            }
          ]
        },
        {
          id: "applications",
          title: "Practical Applications",
          subsections: [
            {
              id: "weather-prediction",
              title: "Weather Forecasting",
              content: `
                <h3>Barometric Pressure in Weather Prediction</h3>
                <p>Meteorologists use barometric pressure readings as a key indicator for weather forecasting. Pressure trends often predict weather changes 12-24 hours in advance.</p>
                <p><strong>Rising Pressure:</strong> Generally indicates improving weather conditions, with clearing skies and reduced precipitation likelihood.</p>
                <p><strong>Falling Pressure:</strong> Often signals approaching storms, increased cloud cover, and higher probability of precipitation.</p>
                <p><strong>Rapid Changes:</strong> Sudden pressure drops can indicate severe weather approaching, while rapid increases may signal clearing conditions.</p>
                <p>Modern weather prediction combines barometric pressure with temperature, humidity, wind patterns, and satellite imagery for accurate forecasting.</p>
              `
            },
            {
              id: "aviation-use",
              title: "Aviation Applications",
              content: `
                <h3>Pressure in Aviation</h3>
                <p>Aircraft altimeters rely on atmospheric pressure measurements to determine altitude. As altitude increases, atmospheric pressure decreases in a predictable pattern.</p>
                <p><strong>Altimeter Function:</strong> Measures the pressure difference between the aircraft's current location and sea level to calculate height above sea level.</p>
                <p><strong>Cabin Pressurization:</strong> Commercial aircraft maintain cabin pressure equivalent to 6,000-8,000 feet altitude for passenger comfort and safety.</p>
                <p><strong>Flight Planning:</strong> Pilots must account for pressure variations when planning routes and calculating fuel requirements.</p>
                <p>Understanding pressure relationships is essential for safe flight operations and navigation.</p>
              `
            }
          ]
        }
      ]
    });

    // Add the paper content from your original document
    this.registerContent('nibs-paper', {
      title: "'I can read but I can't turn the pages' - Original NIBS Paper",
      author: "Chris Page",
      year: "1991",
      type: "research",
      sections: [
        {
          id: "abstract",
          title: "Abstract and Introduction",
          subsections: [
            {
              id: "problem-statement",
              title: "The Problem Statement",
              content: `
                <h3>'I can read but I can't turn the pages'</h3>
                <p>The staff at the ACCESS Centre became interested in providing electronic library facilities in 1986. By this time significant progress had been made in the area of writing and communication aids.</p>
                <p>However, the students' new-found independence had highlighted the barrier which paper-based study materials presented to those with motor disabilities. The physical page turning devices were inadequate for study purposes and so students were dependent on a team of nine educational assistants and 35 volunteer readers for support.</p>
                <p>Whilst the social contact that this gave the students was appreciated, this was not an ideal solution. The students wanted to be able to study independently, and this led to a two-year research programme, conducted between 1987 and 1989, into alternative solutions for meeting this need.</p>
              `
            },
            {
              id: "research-approach",
              title: "Research Methodology",
              content: `
                <h3>Research Programme Overview</h3>
                <p>The research examined the authoring and text delivery systems that were available at the time, implemented a prototype system in Smalltalk/V and conducted trials with a range of students.</p>
                <p>The conclusions drawn from the research were that the most desirable solution would be a complete electronic study environment. This was a considerable departure from the initial concept of a collection of 'electronic books'.</p>
                <p>A subset of the proposed system, the Nuffield Interactive Book System (NIBS), was then implemented by Office Workstations Limited (OWL) in Edinburgh.</p>
              `
            }
          ]
        },
        {
          id: "design-strategy",
          title: "Design Strategy",
          subsections: [
            {
              id: "user-needs",
              title: "Understanding User Needs",
              content: `
                <h3>Target User Population</h3>
                <p>The disabled students, for whom the system was designed, included people with motor disabilities which result in poor limb control (e.g. cerebral palsy or muscular dystrophy) and those who have lost all control of their limbs, due to spinal injuries received from road traffic or sports accidents.</p>
                <p>Some of these students access the computer by using one or more switches but many of them are able to use alternative keyboards or standard keyboards that have been modified in some way.</p>
                <p>For example, students with muscular dystrophy often use a miniature keyboard to minimise movement. These students can also use a mouse or tracker-ball.</p>
              `
            },
            {
              id: "system-requirements",
              title: "System Design Requirements",
              content: `
                <h3>Core Design Principles</h3>
                <p>The system needed to accommodate various input methods while maintaining consistent functionality across different access technologies.</p>
                <p><strong>Switch Access:</strong> Support for single or multiple switch scanning interfaces for users with severe motor limitations.</p>
                <p><strong>Alternative Keyboards:</strong> Compatibility with miniature keyboards, expanded keyboards, and other adaptive input devices.</p>
                <p><strong>Mouse Alternatives:</strong> Support for trackballs, head mice, and other pointing devices adapted for motor disabilities.</p>
                <p><strong>Flexibility:</strong> The interface needed to adapt to each student's specific capabilities and preferences.</p>
              `
            }
          ]
        }
      ]
    });
  }

  registerContent(id, contentStructure) {
    this.availableContent.set(id, contentStructure);
  }

  loadContent(contentId) {
    const content = this.availableContent.get(contentId);
    if (!content) {
      console.error(`Content with ID '${contentId}' not found`);
      return false;
    }

    this.nibsSystem.currentDocument = content;
    this.nibsSystem.populateStructureBrowser();
    this.nibsSystem.buildSearchIndex();
    
    // Display the first section by default
    if (content.sections.length > 0) {
      const firstSection = content.sections[0];
      const firstSubsection = firstSection.subsections[0];
      this.nibsSystem.displaySection(firstSection.id, firstSubsection.id);
    }
    
    this.nibsSystem.announceToUser(`Loaded: ${content.title}`);
    return true;
  }

  getAvailableContent() {
    return Array.from(this.availableContent.entries()).map(([id, content]) => ({
      id,
      title: content.title,
      author: content.author,
      type: content.type,
      year: content.year,
      sectionCount: content.sections.length
    }));
  }

  createContentFromStructure(title, sections) {
    // Helper method to create new content programmatically
    const contentId = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const content = {
      title,
      sections,
      author: "User Created",
      type: "custom"
    };
    
    this.registerContent(contentId, content);
    return contentId;
  }
}

// Enhanced NIBS system with content loading
export function enhanceNIBSWithContentLoader(nibsSystem) {
  nibsSystem.contentLoader = new NIBSContentLoader(nibsSystem);
  
  // Add content loading UI
  const controlsContainer = document.querySelector('.text-controls');
  if (controlsContainer) {
    const contentSelector = document.createElement('select');
    contentSelector.id = 'content-selector';
    contentSelector.setAttribute('aria-label', 'Select content to load');
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select content...';
    contentSelector.appendChild(defaultOption);
    
    // Populate with available content
    nibsSystem.contentLoader.getAvailableContent().forEach(content => {
      const option = document.createElement('option');
      option.value = content.id;
      option.textContent = `${content.title} (${content.sectionCount} sections)`;
      contentSelector.appendChild(option);
    });
    
    contentSelector.addEventListener('change', (e) => {
      if (e.target.value) {
        nibsSystem.contentLoader.loadContent(e.target.value);
      }
    });
    
    const label = document.createElement('label');
    label.textContent = 'Content: ';
    label.appendChild(contentSelector);
    
    controlsContainer.appendChild(label);
  }
  
  return nibsSystem;
}
