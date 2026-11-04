# Sol의 공부 기록

HTML과 CSS 기반의 GitHub Pages용 개인 블로그입니다. 타이핑 효과와 카테고리 필터에 간단한 JavaScript(blog.js)를 사용합니다. 프레임워크는 필요하지 않습니다.

## 미리보기
index.html을 브라우저에서 열면 됩니다.

## GitHub Pages란?
GitHub 저장소의 HTML, CSS 같은 정적 파일을 웹사이트로 공개하는 기능입니다.
사용자 사이트는 `사용자명.github.io`라는 이름의 저장소를 사용합니다.
공식 설명: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages

## 기존 저장소에 적용하기
기존 저장소에 Jekyll 템플릿이 있으므로, 먼저 기존 Pages 설정을 확인하세요.
기존 파일을 삭제할 필요 없이 이 폴더의 index.html, style.css, posts 폴더, .nojekyll을 배포할 위치에 올립니다.
Settings → Pages → Build and deployment에서 Deploy from a branch를 선택합니다.
Branch는 master, 폴더는 업로드한 위치에 따라 /(root) 또는 /docs를 선택하고 Save를 누릅니다.
.nojekyll은 GitHub Pages에서 Jekyll 변환 없이 HTML을 그대로 제공하기 위한 파일입니다.
기존 GitHub Actions 배포를 사용하는 경우에는 위의 브랜치 배포 방식으로 전환해야 합니다.
배포가 완료되면 https://freshborn-sol.github.io 에서 확인합니다.

## 글 추가하기
posts/html-css.html을 복사해 새 HTML 파일을 만들고 제목과 본문을 수정합니다.
index.html과 categories 폴더의 해당 카테고리 HTML에 article을 추가하고 새 글로 링크합니다.
자기소개는 index.html의 id="about", 색상과 여백은 style.css에서 바꿉니다.

## 수업 내용과 연결
2주차 외부 CSS, 3주차 구조화 태그와 링크·목록, 4주차 선택자,
6주차 색상·글꼴·박스 모델, 8주차 float·미디어 쿼리를 사용했습니다.
예시 글 두 개는 첫 초안이므로 게시 전에 본인의 표현으로 수정할 수 있습니다.

## 디자인 참고
https://github.com/zoomKoding/zoomkoding-gatsby-blog 의 자기소개와 가로 카테고리, 글 목록 구성을 참고했습니다. 코드는 수업 범위의 HTML과 CSS로 직접 작성했습니다.

## 동작 편집
blog.js의 words 배열을 수정하면 첫 화면 타이핑 문구를 바꿀 수 있습니다.
홈과 posts/index.html의 각 글에는 data-category 값으로 development, documents 등의 분류를 지정합니다.
소개와 활동 타임라인은 about/index.html에서 편집합니다.

## 그 외 카테고리와 날짜 정렬
홈과 posts/index.html에서 글 카드를 아래처럼 작성합니다. 날짜는 YYYY-MM-DD 형식입니다.
기본 정렬은 최신순이며 날짜가 없는 글은 마지막에 표시합니다.

```html
<article class="post-preview" data-category="other" data-date="2026-11-05">
  <a class="post-card" href="posts/my-post.html">
    <h3>글 제목</h3>
    <p>글 요약</p>
    <div class="card-meta"><span>2026.11.05</span><span class="card-category">그 외</span></div>
  </a>
</article>
```
posts/index.html에서는 본문 링크 경로를 해당 파일 기준으로 바꾸세요.
