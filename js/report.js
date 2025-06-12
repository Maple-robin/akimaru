document.addEventListener('DOMContentLoaded', function() {

    // --- 通報フォームのロジック (既存のロジックを統合) ---
    const reportForm = document.getElementById('report-form');
    const categoryRadios = document.querySelectorAll('input[name="report_category"]');
    const categoryOtherRadio = document.getElementById('category-other-radio');
    const reportContentTextarea = document.getElementById('report-content');
    const otherRequiredBadge = document.getElementById('other-required-badge');
    const optionalBadge = document.getElementById('optional-badge');
    const contentError = document.getElementById('content-error');
    const successMessage = document.getElementById('success-message');
    const postIdInput = document.getElementById('post-id');

    // Function to update the required status for the content textarea
    function updateContentRequirement() {
        if (categoryOtherRadio.checked) {
            reportContentTextarea.setAttribute('required', 'required');
            otherRequiredBadge.classList.remove('hidden');
            optionalBadge.classList.add('hidden');
            reportContentTextarea.focus(); // Focus on textarea when 'その他' is selected
        } else {
            reportContentTextarea.removeAttribute('required');
            otherRequiredBadge.classList.add('hidden');
            optionalBadge.classList.remove('hidden');
            // Clear error state if not required
            reportContentTextarea.classList.remove('error');
            contentError.style.display = 'none';
            contentError.textContent = '';
        }
    }

    // Initial check on page load
    updateContentRequirement();

    // Event listener for category radio buttons
    categoryRadios.forEach(radio => {
        radio.addEventListener('change', updateContentRequirement);
    });

    // Event listener for form submission
    reportForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        let isValid = true;
        successMessage.style.display = 'none'; // Hide previous success message
        contentError.style.display = 'none'; // Hide previous error messages
        reportContentTextarea.classList.remove('error');

        const selectedCategory = document.querySelector('input[name="report_category"]:checked').value;
        const reportContent = reportContentTextarea.value.trim();
        const postId = postIdInput.value; // Get the postId from hidden input

        // Validate report content if "その他" is selected
        if (selectedCategory === 'その他' && reportContent === '') {
            contentError.textContent = '「その他」を選択した場合、通報内容は必須です。';
            contentError.style.display = 'block';
            reportContentTextarea.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            // Simulate sending data (in a real application, you'd use fetch() or XMLHttpRequest)
            console.log('--- 通報内容 ---');
            console.log(`対象投稿ID: ${postId}`);
            console.log(`カテゴリ: ${selectedCategory}`);
            console.log(`通報内容: ${reportContent}`);
            console.log('----------------');

            // Simulate successful submission
            reportForm.reset(); // Clear the form
            updateContentRequirement(); // Reset requirement display
            successMessage.textContent = '通報を受け付けました。ご協力ありがとうございます。';
            successMessage.style.display = 'block';

            // Optionally, disable the form or redirect after a short delay
            // setTimeout(() => { window.location.href = '/some-confirmation-page'; }, 2000);
        } else {
            // If not valid, scroll to the first error if it's not visible
            if (contentError.style.display === 'block') {
                reportContentTextarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // --- bodyのno-scrollクラスを制御（ハンバーガーメニューの状態に基づき） ---
    // ここで直接イベントリスナーを追加する必要は通常ありません。
    // ハンバーガーメニューのクリックイベントでtoggleされるため。
});
