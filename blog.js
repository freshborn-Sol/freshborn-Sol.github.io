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

// 같은 화면에서 검색과 카테고리 필터 적용
const filters = document.querySelectorAll('.category-filter');
const cards = document.querySelectorAll('.post-preview[data-category]');
const searchInput = document.getElementById('site-search');
let selectedCategory = 'all';
function updatePosts() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let count = 0;
    cards.forEach(function (card) {
        card.hidden = !((selectedCategory === 'all' || card.dataset.category === selectedCategory) && card.textContent.toLocaleLowerCase().includes(query));
        if (!card.hidden) count++;
    });
    const empty = document.querySelector('.filter-empty');
    empty.hidden = count !== 0;
    empty.textContent = query ? '검색 결과가 없습니다.' : '아직 작성한 글이 없습니다.';
    document.querySelector('.filter-status').textContent = count + '개의 글';
}
filters.forEach(function (button) {
    button.addEventListener('click', function () {
        selectedCategory = button.dataset.category;
        filters.forEach(function (item) {
            item.classList.toggle('selected', item === button);
            item.setAttribute('aria-pressed', String(item === button));
        });
        updatePosts();
    });
});
if (searchInput && document.querySelector('.filter-empty')) {
    searchInput.value = new URLSearchParams(window.location.search).get('q') || '';
    searchInput.addEventListener('input', updatePosts);
    document.querySelector('.search-form').addEventListener('submit', function (event) { event.preventDefault(); updatePosts(); });
    if (searchInput.value) updatePosts();
}
