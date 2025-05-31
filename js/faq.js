document.addEventListener('DOMContentLoaded', function () {
    // FAQアイテムの質問部分をすべて取得
    const faqQuestions = document.querySelectorAll('.faq-item__question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            // クリックされた質問にis-openクラスをトグル
            this.classList.toggle('is-open');

            // 直後の回答コンテンツを取得
            const answer = this.nextElementSibling;

            // 回答コンテンツの表示/非表示を切り替える
            if (this.classList.contains('is-open')) {
                // 開く場合
                answer.style.display = 'block';
                // スムーズな開閉アニメーションを追加することも可能（CSS transitionとmax-heightの組み合わせなど）
            } else {
                // 閉じる場合
                answer.style.display = 'none';
            }
        });
    });
});