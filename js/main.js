import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { strudelEngine } from './strudel-engine.js';
import { synthesizer } from './synthesizer.js';
import { PatternLibrary, ExampleTemplates } from './pattern-library.js';

class LiveCodingApp {
    constructor() {
        this.editors = {};
        this.isAudioStarted = false;
        this.init();
    }

    async init() {
        await this.initializeEditors();
        await this.initializeAudio();
        this.setupEventListeners();
        this.loadStarterTemplates();
    }

    async initializeEditors() {
        // Initialize CodeMirror for both performers
        this.editors.a = new EditorView({
            doc: '// Dark Wave Performer - Start coding here...',
            extensions: [
                basicSetup,
                javascript(),
                oneDark,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        this.onCodeChange('a');
                    }
                })
            ],
            parent: document.getElementById('editor-a')
        });

        this.editors.b = new EditorView({
            doc: '// House Performer - Start coding here...',
            extensions: [
                basicSetup,
                javascript(),
                oneDark,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        this.onCodeChange('b');
                    }
                })
            ],
            parent: document.getElementById('editor-b')
        });
    }

    async initializeAudio() {
        try {
            await strudelEngine.initialize();
            await synthesizer.initialize();
            this.updateStatus('Audio system ready - click Start Audio', 'ready');
        } catch (error) {
            this.showError(`Audio initialization failed: ${error.message}`);
        }
    }

    setupEventListeners() {
        // Audio control buttons
        document.getElementById('start-audio').addEventListener('click', () => this.startAudio());
        document.getElementById('stop-all').addEventListener('click', () => this.stopAll());

        // BPM control
        document.getElementById('bpm').addEventListener('change', (e) => {
            strudelEngine.setBPM(parseInt(e.target.value));
        });

        // Evaluation buttons
        document.querySelectorAll('.eval-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const editorId = e.target.dataset.editor;
                this.evaluateCode(editorId);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                const activeEditor = this.getActiveEditor();
                if (activeEditor) {
                    this.evaluateCode(activeEditor);
                }
            }
        });
    }

    loadStarterTemplates() {
        // Set starter templates
        this.setEditorContent('a', ExampleTemplates.darkWaveStarter);
        this.setEditorContent('b', ExampleTemplates.houseStarter);
    }

    async startAudio() {
        if (!this.isAudioStarted) {
            // Resume audio context on user gesture
            await strudelEngine.initialize();
            this.isAudioStarted = true;
            this.updateStatus('Audio running', 'running');
        }
    }

    async evaluateCode(performerId) {
        if (!this.isAudioStarted) {
            this.showError('Please start audio first');
            return;
        }

        const code = this.getEditorContent(performerId);
        const result = await strudelEngine.evaluateCode(code, performerId);

        this.updateOutput(performerId, result);
    }

    stopAll() {
        strudelEngine.stopAll();
        this.updateOutput('a', { success: true, message: 'Stopped' });
        this.updateOutput('b', { success: true, message: 'Stopped' });
    }

    // Helper methods
    getEditorContent(performerId) {
        return this.editors[performerId].state.doc.toString();
    }

    setEditorContent(performerId, content) {
        const transaction = this.editors[performerId].state.update({
            changes: {
                from: 0,
                to: this.editors[performerId].state.doc.length,
                insert: content
            }
        });
        this.editors[performerId].dispatch(transaction);
    }

    updateOutput(performerId, result) {
        const outputElement = document.getElementById(`output-${performerId}`);
        if (result.success) {
            outputElement.textContent = '✓ Code executed successfully';
            outputElement.className = 'output success';
        } else {
            outputElement.textContent = `✗ Error: ${result.error}`;
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

    onCodeChange(performerId) {
        // Clear output when code changes
        const outputElement = document.getElementById(`output-${performerId}`);
        outputElement.textContent = '';
        outputElement.className = 'output';
    }

    getActiveEditor() {
        // Simple implementation - in a real app, track focus
        return 'a'; // For now, return default
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LiveCodingApp();
});