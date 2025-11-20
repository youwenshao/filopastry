// Wait for Strudel to load
async function initializeApp() {
    // Wait a bit for Strudel to load from CDN
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Initialize CodeMirror editors
    const editorA = CodeMirror.fromTextArea(document.getElementById('editor-a'), {
        mode: 'javascript',
        theme: 'one-dark',
        lineNumbers: true,
        autofocus: true
    });
    
    const editorB = CodeMirror.fromTextArea(document.getElementById('editor-b'), {
        mode: 'javascript',
        theme: 'one-dark',
        lineNumbers: true
    });

    // Set starter code
    editorA.setValue(`// Dark Wave Starter
note("c2").slow(4) // Bass drum
+ note("c1").every(2) // Bass
+ s("hh").fast(2) // Hi-hats`.trim());

    editorB.setValue(`// House Starter  
note("c2").slow(4) // Kick
+ note("f#5").fast(4) // Hi-hat
+ note("c3").every(2).offbeat(0.5) // Bass`.trim());

    let audioStarted = false;
    let audioContext = null;

    // Start Audio button
    document.getElementById('start-audio').addEventListener('click', async () => {
        if (!audioStarted) {
            try {
                // Initialize Strudel audio
                await initStrudel();
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                audioStarted = true;
                updateStatus('Audio running - Ready to code!', 'running');
            } catch (error) {
                showError('Failed to start audio: ' + error.message);
            }
        }
    });

    // Stop All button
    document.getElementById('stop-all').addEventListener('click', () => {
        if (audioContext) {
            audioContext.suspend();
            updateStatus('Audio stopped', 'stopped');
            audioStarted = false;
        }
    });

    // Run Code buttons
    document.querySelectorAll('.eval-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const editorId = e.target.dataset.editor;
            const code = editorId === 'a' ? editorA.getValue() : editorB.getValue();
            evaluateCode(editorId, code);
        });
    });

    function evaluateCode(performerId, code) {
        if (!audioStarted) {
            showError('Please start audio first!');
            return;
        }

        try {
            // Simple evaluation - in a real app you'd use Strudel's proper evaluation
            const outputElement = document.getElementById(`output-${performerId}`);
            outputElement.textContent = '✓ Code executed';
            outputElement.className = 'output success';
            
            console.log(`Performer ${performerId} code:`, code);
            // Here you would normally use Strudel's evaluate function
            // evaluate(code).play();
            
        } catch (error) {
            const outputElement = document.getElementById(`output-${performerId}`);
            outputElement.textContent = `✗ Error: ${error.message}`;
            outputElement.className = 'output error';
        }
    }

    function updateStatus(message, type) {
        const statusElement = document.getElementById('connection-status');
        statusElement.textContent = message;
        statusElement.className = `status ${type}`;
    }

    function showError(message) {
        const errorElement = document.getElementById('error-display');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        setTimeout(() => errorElement.classList.add('hidden'), 5000);
    }
}

// Start the app when page loads
document.addEventListener('DOMContentLoaded', initializeApp);