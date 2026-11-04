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
// 홈 카테고리별 전체 게시물 수를 표시합니다.
filters.forEach(function (button) {
    const badge = button.querySelector('.category-count');
    if (!badge) return;
    const total = Array.from(cards).filter(function (card) {
        return button.dataset.category === 'all' || card.dataset.category === button.dataset.category;
    }).length;
    badge.textContent = '(' + total + ')';
    const label = button.querySelector('.category-label').textContent;
    button.setAttribute('aria-label', label + ', ' + total + '개의 글');
});

const searchInput = document.getElementById('site-search');
const sortSelect = document.getElementById('post-sort');
// 새 글에 data-date="2026-11-05"처럼 날짜를 지정합니다.
// 기존 글은 time[datetime] 또는 화면의 날짜 표기도 읽습니다.
function getPostDate(card) {
    const time = card.querySelector('time[datetime]');
    const label = card.querySelector('.date, .card-meta');
    const raw = card.dataset.date || (time && time.getAttribute('datetime')) || (label && label.textContent) || '';
    const match = raw.match(/(\d{4})[.\/-](\d{1,2})[.\/-](\d{1,2})/);
    if (!match) return null;
    const year = Number(match[1]), month = Number(match[2]), day = Number(match[3]);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
    return date.getTime();
}
function comparePosts(a, b, order) {
    const first = getPostDate(a), second = getPostDate(b);
    if (first === null) return second === null ? 0 : 1;
    if (second === null) return -1;
    return order === 'oldest' ? first - second : second - first;
}
function sortPosts() {
    const list = document.getElementById('posts');
    const empty = document.querySelector('.filter-empty');
    if (!list || !empty) return;
    Array.from(cards).sort(function (a, b) {
        return comparePosts(a, b, sortSelect ? sortSelect.value : 'newest');
    }).forEach(function (card) { list.insertBefore(card, empty); });
}
if (sortSelect) sortSelect.addEventListener('change', function () { sortPosts(); updatePosts(); });
let selectedCategory = 'all';
function updatePosts() {
    sortPosts();
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
    const heading = document.getElementById('posts-title');
    if (heading) {
        heading.textContent = selectedCategory === 'all' ? 'All' : document.querySelector('.category-filter.selected').textContent;
        document.getElementById('posts-count').textContent = count + ' posts';
    }
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
    updatePosts();
}
