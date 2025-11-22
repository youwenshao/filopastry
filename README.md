# Live-Coding Performance System

## Abstract

The Live-Coding Performance System is an innovative web-based platform that enables real-time algorithmic music composition through code. This project reimagines electronic music performance by replacing traditional DJ equipment with code editors, allowing performers to compose, manipulate, and fuse musical genres through live programming. The system features a dual-performer interface where musicians can write code in real-time using the Strudel pattern language, with built-in software synthesizers and an AI-powered "Style Bridge" that suggests complementary musical patterns. By treating code as the primary musical instrument, this project explores new frontiers in human-computer interaction, algorithmic composition, and live electronic music performance.

## Features

- **Dual Performer Interface**: Simultaneous code editors for two performers with independent execution
- **Real-time Audio Synthesis**: Web Audio API integration with customizable sound palettes
- **Strudel Pattern Language**: Powerful algorithmic composition capabilities
- **Genre Fusion Capabilities**: Structural code-level mixing between musical styles
- **AI Style Bridge**: Machine learning-assisted pattern suggestions (in development)
- **Cross-platform Compatibility**: Runs in any modern web browser
- **Low-latency Performance**: Optimized for real-time audio processing

## Quick Start

### Method 1: CDN Approach (Simplest)

1. **Download the project files** and ensure this structure:
   ```
   live-coding-system/
   ├── index.html
   ├── css/
   │   └── style.css
   ├── js/
   │   └── simplified-setup.js
   └── README.md
   ```

2. **Serve the files** using any local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open your browser** to `http://localhost:8000`

### Method 2: Development Build (Recommended for Developers)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** to the displayed localhost URL (typically `http://localhost:5173`)

## User Guide

### Getting Started

1. **Initialize Audio**: Click the "Start Audio" button to enable Web Audio API
2. **Choose Your Role**: 
   - **Performer A (Dark Wave)**: Creates atmospheric, slower-tempo patterns
   - **Performer B (House)**: Creates rhythmic, four-on-the-floor patterns
3. **Write Code**: Use the Strudel pattern language in the code editor
4. **Execute Patterns**: Click "Run Code" or use Ctrl+Enter to execute your patterns

### Basic Strudel Syntax

```javascript
// Basic patterns
note("c2 e2 g2").slow(2)          // Play notes slowly
s("bd sd hh hh").fast(2)          // Drum pattern
chord("c4 e4 g4").every(4)        // Chord every 4 cycles

// Combining patterns
stack(
  note("c2").slow(4),             // Bass
  s("hh").fast(2)                 // Hi-hats
)

// Effects and transformations
note("c3").delay(0.5).reverb(0.8) // Add effects
pattern.faster(2).transpose(7)    // Transform patterns
```

### Performance Workflow

1. **Establish Genres**: Each performer creates distinctive patterns for their genre
2. **Begin Fusion**: Reference and transform each other's patterns using shared functions
3. **AI Collaboration**: Use the Style Bridge suggestions to create complementary patterns
4. **Structural Development**: Build from separate sections to fully integrated composition

### Sound Palette

The system includes curated sound presets:

**Dark Wave**
- `darkBass`: Deep, filtered bass sounds
- `arpeggio`: Atmospheric arpeggiated patterns  
- `pad`: Sustained atmospheric pads
- `percussion`: Industrial-inspired drums

**House**
- `kick`: Four-on-the-floor kick drums
- `bass`: Punchy basslines
- `chords`: Stab and chord patterns
- `hats`: Crisp hi-hat patterns

## Project Structure

```
live-coding-system/
├── index.html                 # Main HTML file
├── package.json              # Node.js dependencies
├── vite.config.js           # Build configuration
├── css/
│   └── style.css            # Application styling
└── js/
    ├── main.js              # Main application logic
    ├── strudel-engine.js    # Strudel audio engine
    ├── synthesizer.js       # Software synthesizer
    ├── pattern-library.js   # Reusable pattern templates
    └── ai-style-bridge.js   # AI suggestion engine (in development)
```

## Development Guide

### Prerequisites

- Node.js 16+ and npm
- Modern web browser with Web Audio API support
- Basic knowledge of JavaScript and algorithmic composition

### Building from Source

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

### Key Dependencies

- **@strudel.cycles/core**: Pattern language for algorithmic composition
- **@strudel.cycles/webaudio**: Web Audio integration for Strudel
- **CodeMirror**: Code editor component
- **Vite**: Build tool and development server

## Performance Tips

- **Start Simple**: Begin with basic patterns and gradually add complexity
- **Use Templates**: Leverage the pattern library for quick starts
- **Monitor CPU**: Complex patterns can be processor-intensive
- **Practice Transitions**: Smooth genre fusion requires rehearsal
- **Save Sessions**: Export successful pattern combinations

## Troubleshooting

### Common Issues

**Audio Not Starting**
- Ensure you click "Start Audio" before executing code
- Check browser permissions for audio
- Verify Web Audio API support

**Code Execution Errors**
- Check Strudel syntax and bracket matching
- Verify pattern function names and parameters
- Look for error messages in the output panel

**Performance Issues**
- Reduce pattern complexity if experiencing latency
- Close other browser tabs and applications
- Use fewer simultaneous effects

### Browser Compatibility

- **Chrome 90+**: Full support
- **Firefox 85+**: Full support  
- **Safari 14+**: Full support
- **Edge 90+**: Full support

## Future Development

- [ ] AI Style Bridge integration
- [ ] Advanced pattern visualization
- [ ] Multi-track recording
- [ ] Social features for collaborative performances
- [ ] Mobile device support
- [ ] Plugin system for custom synthesizers

## Contributing

This project is developed as part of the AIST2010 Introduction to Computer Music course. For contributions, please contact the development team.

## License

Educational Use - CUHK AIST2010 Course Project

## Acknowledgments

- Strudel pattern language by Tidal Cycles community
- Web Audio API by W3C and browser developers
- CodeMirror editor component
- CUHK Department of Computer Science and Engineering

---

*For technical support or questions about this project, please refer to the course documentation or contact the teaching team.*