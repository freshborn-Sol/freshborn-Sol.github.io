// 첫 화면의 타이핑 효과
const typingWord = document.getElementById('typing-word');
if (typingWord && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const words = ['공부하는', '기록하는', '성장하는'];
    let wordIndex = 0;
    let length = words[0].length;
    let deleting = true;
    function typeNext() {
        const word = words[wordIndex];
        length += deleting ? -1 : 1;
        typingWord.textContent = word.slice(0, length);
        let delay = deleting ? 110 : 180;
        if (!deleting && length === word.length) {
            deleting = true;
            delay = 1800;
        } else if (deleting && length === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }
        window.setTimeout(typeNext, delay);
    }
    window.setTimeout(typeNext, 1800);
}

// 카테고리를 눌러도 페이지를 이동하지 않고 글 목록만 변경
const filters = document.querySelectorAll('.category-filter');
const cards = document.querySelectorAll('.post-preview[data-category]');
filters.forEach(function (button) {
    button.addEventListener('click', function () {
        const category = button.dataset.category;
        let count = 0;
        filters.forEach(function (item) {
            const selected = item === button;
            item.classList.toggle('selected', selected);
            item.setAttribute('aria-pressed', String(selected));
        });
        cards.forEach(function (card) {
            card.hidden = category !== 'all' && card.dataset.category !== category;
            if (!card.hidden) count++;
        });
        document.querySelector('.filter-empty').hidden = count !== 0;
        document.querySelector('.filter-status').textContent = button.textContent + ': ' + count + '개의 글';
    });
});
