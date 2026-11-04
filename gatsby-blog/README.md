# 류한솔의 Gatsby 블로그

zoomKoding/zoomkoding-gatsby-blog 원본 템플릿(0BSD)을 적용했습니다.
실제 사이트 소스는 **gatsby-blog/** 폴더입니다. 이전 루트 HTML은 보존되어 있지만 새 배포에는 사용하지 않습니다.

## 직접 수정하기
- 자기소개, 이메일, TimeLine, 고정 카테고리: `gatsby-blog/gatsby-meta-config.js`
- 홈: `gatsby-blog/src/pages/index.js`
- 소개: `gatsby-blog/src/pages/about.js`
- 사진/GIF: `gatsby-blog/static/media/`
- 카테고리 개수와 정렬: `gatsby-blog/src/components/post-tabs/`
- 글 목록 화면: `gatsby-blog/src/templates/category-template.js`
- 소개 글씨·배치: `gatsby-blog/src/components/bio/style.scss`

## 새 글 작성
`gatsby-blog/content/my-first-post/index.md`를 만들고 다음 형식으로 작성합니다.

```markdown
---
title: "글 제목"
date: "2026-11-05"
categories: ["개발"]
author: "류한솔"
emoji: "💻"
---

## 오늘 배운 내용
본문을 Markdown으로 작성합니다.
```

여러 카테고리는 `["개발", "CTF/Wargame"]`처럼 작성합니다. 공백이 포함된 `Bug Bounty`, `그 외`도 따옴표와 배열을 유지하세요.
파일을 커밋하면 홈/Posts/검색/카테고리별 개수가 자동으로 생성됩니다. 날짜에 따라 최신순/오래된순으로 정렬됩니다.
공개 사이트에 예시 글은 포함하지 않았습니다.

## 로컬 실행
Node 20 사용:

```sh
cd gatsby-blog
npm ci --legacy-peer-deps
npm start
```

정적 빌드: `npm run build` → `public/`
GitHub Actions의 **Deploy Gatsby blog**가 빌드와 Pages 배포를 담당합니다.

## 기존 버전 복구
`backup/static-before-gatsby-20261105` 브랜치에 전환 직전 버전이 있습니다.
루트의 HTML 파일도 그대로 보존되어 있습니다.

템플릿 원본: https://github.com/zoomKoding/zoomkoding-gatsby-blog
라이선스: gatsby-blog/LICENSE (0BSD)
