# Sol's Lab 적용 방법

이 편집본은 기존 Minimal Mistakes 저장소 위에 독립적인 연구실 레이아웃을 추가합니다. 기존 글과 테마 파일은 보존했습니다. 과거 비공개 글의 공개 상태도 변경하지 않았습니다.

## 업로드

이 폴더를 원래 GitHub 저장소에 반영할 때 다음 파일을 추가하거나 교체하세요.

- `_config.yml`, `index.html`
- `_data/lab.yml`, `_data/navigation.yml`
- `_layouts/lab.html`, `lab-home.html`, `lab-category.html`, `lab-post.html`
- `_includes/lab-entries.html`
- `_pages/` 안의 여섯 카테고리 파일
- `assets/css/lab.css`, `assets/js/lab.js`, `assets/images/kururu-avatar.png`, `assets/images/lab-hex.svg`

GitHub Pages의 기존 master 브랜치, 루트 폴더 배포 설정을 그대로 사용합니다.

## 새 글 쓰기

`_posts/YYYY-MM-DD-title.md`를 만들고 다음 형식으로 작성하세요. `layout`은 생략하면 새 연구실 글 레이아웃이 자동 적용됩니다. 기존 글에 `layout: single` 또는 `layout: post`가 명시되어 있다면 그 글을 이 디자인으로 바꿀 때 `layout: lab-post`로 수정하세요.

```markdown
---
title: "글 제목"
categories:
  - development
---

## 오늘의 기록

글 내용을 작성합니다.
```

카테고리 키는 `development`, `ctf`, `bug-bounty`, `docs`, `research`, `activities`입니다. 글을 두 카테고리에 함께 넣으려면 categories 배열에 두 키를 작성하면 됩니다.

현재 공개 글이 없으면 첫 기록을 준비한다는 안내가 표시됩니다. 기존 두 글은 `published: false`라 자동 공개되지 않습니다.

## 디자인

육각형 벽과 청록색 모니터, 노랑·주황 포인트로 쿠루루의 컴퓨터실 분위기를 표현했습니다. 홈의 콘솔은 장식이며 실시간 보안 분석 화면이 아닙니다. 프로필 이미지는 현재 GitHub 프로필에서 가져왔으며 공식 제휴를 나타내지 않습니다.

Google Fonts가 연결되지 않으면 기기에 설치된 기본 글꼴로 표시됩니다. 로컬 프리뷰는 LiquidJS로 렌더링하였으며 GitHub의 실제 Jekyll 배포는 업로드 후 확인해야 합니다.
