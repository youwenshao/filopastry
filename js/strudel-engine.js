import { initAudioOnFirstClick, getAudioContext } from '@strudel.cycles/core';
import { evaluate, setOutput } from '@strudel.cycles/core';
import { reinit, webaudioOutput } from '@strudel.cycles/webaudio';

export class StrudelEngine {
    constructor() {
        this.isInitialized = false;
        this.currentPatterns = {
            a: null,
            b: null
        };
        this.output = null;
    }

    async initialize() {
        try {
            // Initialize audio on first user interaction
            initAudioOnFirstClick();
            
            // Set up Web Audio output
            this.output = webaudioOutput();
            setOutput(this.output);
            
            this.isInitialized = true;
            console.log('Strudel engine initialized');
            return true;
        } catch (error) {
            console.error('Failed to initialize Strudel:', error);
            return false;
        }
    }

    async evaluateCode(code, performerId) {
        if (!this.isInitialized) {
            throw new Error('Strudel engine not initialized');
        }

        try {
            // Stop previous pattern for this performer
            if (this.currentPatterns[performerId]) {
                this.currentPatterns[performerId].stop();
            }

            // Evaluate new pattern
            const pattern = evaluate(code);
            
            // Store and play the pattern
            this.currentPatterns[performerId] = pattern;
            pattern.play();
            
            return { success: true, pattern };
        } catch (error) {
            console.error(`Evaluation error for performer ${performerId}:`, error);
            return { success: false, error: error.message };
        }
    }

    stopAll() {
        Object.values(this.currentPatterns).forEach(pattern => {
            if (pattern) pattern.stop();
        });
        this.currentPatterns = { a: null, b: null };
    }

    setBPM(bpm) {
        if (this.output) {
            this.output.setBPM(bpm);
        }
    }

    getPatternInfo(performerId) {
        const pattern = this.currentPatterns[performerId];
        if (!pattern) return null;
        
        return {
            isPlaying: pattern.isPlaying?.() || false,
            // Add more pattern metadata as needed
        };
    }
}

// Export a singleton instance
export const strudelEngine = new StrudelEngine();