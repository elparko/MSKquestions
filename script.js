document.addEventListener('DOMContentLoaded', () => {
    const optionsContainer = document.getElementById('options-container');
    const optionButtons = document.querySelectorAll('.option-btn');
    const feedbackPanel = document.getElementById('feedback-panel');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');

    let answered = false;

    const explanation = "The supraspinatus muscle is responsible for the initial 15 degrees of arm abduction. A tear in the supraspinatus tendon often presents with weakness in overhead activities and a positive 'drop arm sign', where the patient cannot smoothly lower their fully abducted arm.";

    optionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (answered) return;

            answered = true;
            const selectedBtn = e.currentTarget;
            const isCorrect = selectedBtn.getAttribute('data-correct') === 'true';

            // Disable all buttons
            optionButtons.forEach(btn => {
                btn.disabled = true;
                // Highlight the correct one regardless
                if (btn.getAttribute('data-correct') === 'true') {
                    btn.classList.add('correct');
                }
            });

            // Handle the selected button
            if (isCorrect) {
                feedbackTitle.textContent = "Correct! ✨";
                feedbackPanel.classList.add('success');
            } else {
                selectedBtn.classList.add('wrong');
                feedbackTitle.textContent = "Incorrect";
                feedbackPanel.classList.add('error');
            }

            feedbackText.textContent = explanation;

            // Show feedback with a slight delay for better UX
            setTimeout(() => {
                feedbackPanel.classList.remove('hidden');
                // Scroll specifically to feedback if needed on mobile
                feedbackPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        });
    });
});
