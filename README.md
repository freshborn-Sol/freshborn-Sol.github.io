# 류한솔의 공부로그

[블로그 바로가기](https://freshborn-sol.github.io/)

Gatsby와 GitHub Pages로 운영하는 개인 공부 기록입니다.

## 저장소 구조

- `gatsby-blog/`: 현재 블로그의 소스, 설정, 게시글, 사진/GIF
- `.github/workflows/gatsby-pages.yml`: 빌드·자동 배포
- `BLOG-GUIDE.md`: 직접 수정하고 새 글을 작성하는 방법
- `archive/legacy-notes/`: 예전 Python 공부 기록과 글 원본 (사이트에 게시되지 않음)

## 자주 수정하는 파일

| 내용 | 경로 |
| --- | --- |
| 소개·설명·TimeLine·카테고리 | `gatsby-blog/gatsby-meta-config.js` |
| 새 글 | `gatsby-blog/content/글-주소/index.md` |
| 홈 | `gatsby-blog/src/pages/index.js` |
| About | `gatsby-blog/src/pages/about.js` |
| Post | `gatsby-blog/src/templates/category-template.js` |
| 사진·GIF | `gatsby-blog/static/media/` |

글은 Markdown 파일 하나를 추가하면 홈·Post·검색·카테고리 개수가 자동으로 갱신됩니다.
자세한 방법은 [수정 가이드](BLOG-GUIDE.md)를 참고하세요.

## 로컬 실행

Node 20 환경에서:

```sh
cd gatsby-blog
npm ci --legacy-peer-deps
npm start
```

`master`에 변경을 저장하면 `Deploy Gatsby blog`가 자동 배포합니다.

## 백업과 라이선스

정리 전 전체 파일: `backup/before-repository-cleanup-20261105` 브랜치.
HTML → Gatsby 전환 전 버전: `backup/static-before-gatsby-20261105` 브랜치.

테마: [zoomKoding/zoomkoding-gatsby-blog](https://github.com/zoomKoding/zoomkoding-gatsby-blog), [0BSD 라이선스](gatsby-blog/LICENSE).
