---
title: "GitHub Pages와 Gatsby로 공부 블로그 만들기"
date: "2026-11-05"
categories: ["개발"]
author: "류한솔"
emoji: "💻"
---

이 블로그는 공부한 내용과 활동을 꾸준히 남기기 위헤 만들었다. 처음에는 '인터넷활용' 수업에서 배운 HTML과 CSS로 시작했고, 이후 Codex의 도움을 받아 Gatsby 템플릿으로 옮겼다. 이 글은 현재 적용된 블로그의 구성과 수정 방법을 정리한 기록이다.

## 1. GitHub Pages로 시작하기

GitHub Pages는 저장소의 파일로 정적 웹사이트를 공개할 수 있는 서비스다. 내 블로그는 `freshborn-Sol.github.io` 저장소를 사용하며, 접속 주소는 [freshborn-sol.github.io](https://freshborn-sol.github.io/)다.

처음에는 HTML의 제목·문단·목록·링크 태그로 내용을 작성하고, CSS의 글꼴·색상·여백·테두리로 화면을 꾸몄다. 수업에서 배운 `float`와 미디어 쿼리를 이용해 화면 크기에 따라 배치가 바뀌도록 했다.

이 방식은 구조를 이해하기 쉬웠지만, 새 글을 만들 때 홈과 글 목록에도 링크를 각각 추가해야 했다. 앞으로 기록을 계속 쌓으려면 Markdown으로 글을 작성하고 목록은 자동으로 생성하는 편이 편리하겠다고 생각했다.

## 2. Gatsby 템플릿 적용하기

[이우린 님의 블로그](https://urinlee.github.io/)를 화면 구성의 참고로 삼았고, 최종적으로 [zoomKoding의 Gatsby 블로그 템플릿](https://github.com/zoomKoding/zoomkoding-gatsby-blog)을 적용했다. 단순히 비슷한 화면을 만드는 단계에서, 실제 템플릿 소스를 사용하는 구조로 바꾼 것이다.

원본은 Gatsby 4 기반이며, 빌드는 Node 20 환경에서 실행한다. 설치 과정에서 필요한 Emotion과 react-helmet 의존성을 보완했고, 게시글이 하나도 없는 상태에서도 빌드되도록 GraphQL 타입을 명시했다.

## 3. 내 블로그에 맞게 바꾼 부분

홈에는 자기소개와 타이핑 효과를 넣고, 오른쪽에는 직접 고른 영상을 변환한 반복 GIF를 배치했다. About에서는 소개 문구를 ‘성장하는’으로 고정하고, 오른쪽 사진과 GitHub README를 바탕으로 정리한 TimeLine을 넣었다. 이력은 이후 직접 수정한 내용을 유지했다.

글을 분류하는 카테고리는 다음과 같다.

- 개발
- CTF/Wargame
- Bug Bounty
- 블로그/기술문서
- 논문/컨퍼런스
- 공모전/자격증
- 그 외

홈의 각 카테고리에는 게시물 수가 표시된다. 카테고리를 누르면 같은 화면에서 해당 글만 보여주며, 홈과 Post 화면에서 최신순·오래된순을 선택할 수 있다. 상단에는 글 검색을, 소개 아래에는 GitHub와 이메일 링크를 연결했다. 템플릿의 다크모드도 사용할 수 있다.

## 4. 새 글 작성 방법

이제 새 글은 Markdown 파일 하나로 작성한다. 깃 저장소에서 아래와 같은 경로를 만들면 된다.

```text
gatsby-blog/content/원하는-글-주소/index.md
```

예를 들어 `content/my-first-post/index.md`에 글을 쓰면 본문 주소는 `/my-first-post/`가 된다.

파일 맨 위에는 글 정보를 작성한다. 이 부분을 frontmatter라고 한다.

```yaml
---
title: "글 제목"
date: "2026-11-05"
categories: ["개발"]
author: "류한솔"
emoji: "💻"
---
```

그 아래부터 본문을 적는다.

```markdown
## 오늘 배운 내용

직접 공부하거나 실습한 내용을 적는다.

### 진행 과정

1. 무엇을 해보았는지
2. 어떤 문제가 있었는지
3. 어떻게 해결했는지

## 알게 된 점

새롭게 이해한 내용과 다음에 확인할 점을 정리한다.
```

여러 카테고리에 넣으려면 `categories: ["개발", "CTF/Wargame"]`처럼 작성한다. `Bug Bounty`와 `그 외`처럼 공백이 있는 카테고리도 따옴표로 감싸고, 설정에 있는 이름과 동일하게 적는다. 정렬에는 `date`가 사용되므로 날짜는 `YYYY-MM-DD` 형식으로 입력한다.

글에 사진을 넣으려면 Markdown 파일과 같은 폴더에 사진을 올린 뒤 다음과 같이 연결할 수 있다.

```markdown
![실습 화면](./screenshot.png)
```

## 5. 저장한 글이 사이트에 반영되는 과정

GitHub에서 파일을 저장하고 커밋하면 `Deploy Gatsby blog`라는 GitHub Actions 작업이 실행된다.

```text
Markdown 작성·커밋
    → Gatsby 빌드
    → 홈·글 목록·검색 데이터 생성
    → GitHub Pages 배포
```

글을 쓰고 홈과 Post의 HTML을 따로 수정할 필요가 없다. Markdown을 기준으로 글 목록과 카테고리 개수가 함께 만들어진다.

작업이 끝났는지는 저장소의 Actions 탭에서 확인한다. 초록색 체크가 표시되면 배포가 성공한 상태다. 제작 중에는 GitHub Actions와 Pages의 서비스 장애로 반영이 오래 지연되기도 했다. 저장소에 커밋이 올라간 것과 공개 사이트 배포가 끝난 것은 별개라는 점도 알게 됐다.

블로그 이름은 ‘류한솔의 공부로그’로 정했다. 처음부터 많은 글을 채우기보다는, 공부한 내용과 직접 해본 과정을 하나씩 남겨보려고 한다.

## 참고 자료

- [GitHub Pages 소개](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [zoomKoding Gatsby 블로그 템플릿](https://github.com/zoomKoding/zoomkoding-gatsby-blog)
- [화면 구성을 참고한 블로그](https://urinlee.github.io/)
