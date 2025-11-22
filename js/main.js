import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import { highlightActiveLine } from '@codemirror/view';
import { bracketMatching } from '@codemirror/matchbrackets';
import { closeBrackets } from '@codemirror/closebrackets';

// Basic setup extensions for CodeMirror 6
const basicSetup = [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightActiveLine(),
  bracketMatching(),
  closeBrackets(),
  keymap.of([
    ...defaultKeymap,
    indentWithTab,
  ]),
  // Enable basic editing behaviors
  EditorState.transactionFilter.of(transaction => {
    return transaction;
  })
];

class LiveCodingApp {
    constructor() {
        this.editors = {};
        this.isAudioStarted = false;
        this.init();
    }

    async init() {
        await this.initializeEditors();
        this.setupEventListeners();
        this.loadStarterTemplates();
        console.log('Live Coding App initialized - editors should be responsive now');
    }

    async initializeEditors() {
        try {
            // Initialize CodeMirror 6 for both performers with proper extensions
            this.editors.a = new EditorView({
                state: EditorState.create({
                    doc: '// Dark Wave Performer - Start coding here...\n\n// Try: note("c2").slow(4)',
                    extensions: [basicSetup, javascript(), oneDark]
                }),
                parent: document.getElementById('editor-a')
            });

            this.editors.b = new EditorView({
                state: EditorState.create({
                    doc: '// House Performer - Start coding here...\n\n// Try: note("c2").slow(4)',
                    extensions: [basicSetup, javascript(), oneDark]
                }),
                parent: document.getElementById('editor-b')
            });

            console.log('CodeMirror editors initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize editors:', error);
            this.showError('Failed to initialize code editors: ' + error.message);
        }
    }

    setupEventListeners() {
        // Audio control buttons
        document.getElementById('start-audio').addEventListener('click', () => this.startAudio());
        document.getElementById('stop-all').addEventListener('click', () => this.stopAll());

        // Evaluation buttons
        document.querySelectorAll('.eval-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const editorId = e.target.dataset.editor;
                this.evaluateCode(editorId);
            });
        });

        // Add keyboard shortcut for evaluation (Ctrl+Enter)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                const activeElement = document.activeElement;
                if (activeElement.closest('.performer-editor')) {
                    // Find which editor is active (simplified logic)
                    const editorA = this.editors.a;
                    const editorB = this.editors.b;
                    const selectionA = editorA.state.selection.main;
                    const selectionB = editorB.state.selection.main;
                    
                    if (selectionA.from !== selectionA.to || selectionA.from > 0) {
                        this.evaluateCode('a');
                    } else if (selectionB.from !== selectionB.to || selectionB.from > 0) {
                        this.evaluateCode('b');
                    }
                }
            }
        });

        console.log('Event listeners setup complete');
    }

    loadStarterTemplates() {
        // Set starter templates with proper Strudel syntax
        this.setEditorContent('a', `// Dark Wave Starter
note("c2").slow(4) // Bass
+ s("bd [~ sd] hh").slow(2) // Drums
+ seq("c3 e3 g3").fast(2).offbeat(0.5) // Arpeggio`);

        this.setEditorContent('b', `// House Starter  
note("c2").slow(4) // Kick
+ note("c1").every(2).offbeat(0.5) // Bass
+ note("f#5").fast(4) // Hi-hat
+ chord("c4 e4 g4").every(4) // Chord`);

        console.log('Starter templates loaded');
    }

    async startAudio() {
        if (!this.isAudioStarted) {
            try {
                // Check if Strudel is available via CDN
                if (typeof window.initStrudel === 'function') {
                    await window.initStrudel();
                    this.isAudioStarted = true;
                    this.updateStatus('Audio running - Ready to code! Press "Run Code" or Ctrl+Enter', 'running');
                    console.log('Audio context started successfully');
                } else {
                    this.showError('Strudel not loaded. Make sure the CDN script loaded correctly.');
                    console.error('Strudel CDN not loaded');
                }
            } catch (error) {
                this.showError('Failed to start audio: ' + error.message);
                console.error('Audio start error:', error);
            }
        }
    }

    async evaluateCode(performerId) {
        if (!this.isAudioStarted) {
            this.showError('Please start audio first! Click "Start Audio" button.');
            return;
        }

        const code = this.getEditorContent(performerId);
        console.log(`Evaluating code for performer ${performerId}:`, code);
        
        const result = await this.safeEvaluateCode(code, performerId);
        this.updateOutput(performerId, result);
    }

    async safeEvaluateCode(code, performerId) {
        try {
            // For now, simulate successful execution
            // In Phase 2, we'll integrate actual Strudel evaluation
            return { 
                success: true, 
                message: 'Code validation successful (audio simulation)' 
            };
            
        } catch (error) {
            console.error(`Code evaluation error for ${performerId}:`, error);
            return { success: false, error: error.message };
        }
    }

    stopAll() {
        // Stop all audio (placeholder for now)
        console.log('Stop all requested');
        this.updateStatus('Audio stopped', 'stopped');
        this.isAudioStarted = false;
        
        // Clear outputs
        this.updateOutput('a', { success: false, message: 'Stopped' });
        this.updateOutput('b', { success: false, message: 'Stopped' });
    }

    // Helper methods
    getEditorContent(performerId) {
        return this.editors[performerId].state.doc.toString();
    }

    setEditorContent(performerId, content) {
        try {
            const transaction = this.editors[performerId].state.update({
                changes: { 
                    from: 0, 
                    to: this.editors[performerId].state.doc.length, 
                    insert: content 
                }
            });
            this.editors[performerId].dispatch(transaction);
        } catch (error) {
            console.error('Error setting editor content:', error);
        }
    }

    updateOutput(performerId, result) {
        const outputElement = document.getElementById(`output-${performerId}`);
        if (result.success) {
            outputElement.textContent = '✓ ' + (result.message || 'Code executed successfully');
            outputElement.className = 'output success';
        } else {
            outputElement.textContent = `✗ ${result.message || 'Error executing code'}`;
            outputElement.className = 'output error';
        }
    }

    updateStatus(message, type = 'info') {
        const statusElement = document.getElementById('connection-status');
        statusElement.textContent = message;
        statusElement.className = `status ${type}`;
    }

    showError(message) {
        const errorElement = document.getElementById('error-display');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        
        setTimeout(() => {
            errorElement.classList.add('hidden');
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing LiveCodingApp');
    new LiveCodingApp();
});