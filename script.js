document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const processBtn = document.querySelector('.process-btn');

    let currentTab = 'summarize';
    let recognition = null;

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTab = tab.dataset.tab;
        });
    });

    // Process text
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'system-message'}`;
        messageDiv.textContent = text;
        output.appendChild(messageDiv);
        output.scrollTop = output.scrollHeight;
    }

    function processText(text) {
        switch (currentTab) {
            case 'summarize':
                return `Summary: ${text.split('.')[0]}...`; // shows first sentence
            case 'translate':
                return `Translation: ${text} (Translated to English)`; // translation
        
            default:
                return 'Unknown processing type';
        }
    }

    processBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, true);

        // processing delay
        processBtn.disabled = true;
        processBtn.textContent = 'Processing...';

        setTimeout(() => {
            const result = processText(text);
            addMessage(result);
            
            // Reset input and button
            input.value = '';
            processBtn.disabled = false;
            processBtn.textContent = 'Process';
        }, 1000);
    });

    // Handle enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            processBtn.click();
        }
    });
});