// Reusable Strudel pattern generators for both genres
export const PatternLibrary = {
    // Dark Wave Patterns
    darkWave: {
        bass: (note = 'c2') => `note("${note}").slow(4).gain(0.7)`,
        arpeggio: (notes = 'c3 e3 g3') => `seq("${notes}").fast(2).offbeat(0.5)`,
        drum: () => `s("bd sd [~ hh] hh").slow(2)`,
        pad: (chord = 'c4 e4 g4') => `chord("${chord}").slow(8).gain(0.4)`
    },

    // House Patterns
    house: {
        kick: () => `note("c2").slow(4)`,
        bass: (note = 'c1') => `note("${note}").every(2).offbeat(0.5)`,
        chord: (chord = 'c4 e4 g4') => `chord("${chord}").every(4)`,
        hat: () => `note("f#5").fast(4)`,
        clap: () => `note("d2").every(2).offbeat(1)`
    },

    // Fusion Patterns (combining both genres)
    fusion: {
        hybridBass: (darkNote = 'c1', houseNote = 'c2') => 
            `stack(note("${darkNote}").slow(2), note("${houseNote}").fast(2))`,
        
        rhythmicBlend: () => 
            `s("bd [~ sd] hh").slow(1) + s("[~ cp] cp").fast(2)`
    },

    // Utility functions
    utilities: {
        withReverb: (pattern, size = 0.8) => `${pattern}.reverb(${size})`,
        withDelay: (pattern, time = 0.5, feedback = 0.3) => `${pattern}.delay(${time}).delayfb(${feedback})`,
        withFilter: (pattern, freq = 800, q = 1) => `${pattern}.cutoff(${freq}).resonance(${q})`
    }
};

// Example templates for performers
export const ExampleTemplates = {
    darkWaveStarter: `
// Dark Wave Starter Template
stack(
  note("c2").slow(4),                    // Bass
  seq("c3 e3 g3").fast(2).offbeat(0.5), // Arpeggio
  s("bd [~ sd] hh").slow(2)             // Drums
).reverb(0.6)
    `.trim(),

    houseStarter: `
// House Starter Template
stack(
  note("c2").slow(4),                   // Kick
  note("c1").every(2).offbeat(0.5),     // Bass
  note("f#5").fast(4),                  // Hi-hat
  chord("c4 e4 g4").every(4)            // Chord
).delay(0.5)
    `.trim()
};