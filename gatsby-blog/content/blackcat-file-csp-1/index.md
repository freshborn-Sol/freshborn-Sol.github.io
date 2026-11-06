---
title: "BlackCat 웹해킹 기초 스터디 — Dreamhack file-csp-1"
date: "2026-05-07"
categories: ["CTF/Wargame"]
author: "류한솔"
emoji: "🌐"
---

2026년 1학기 BlackCat 웹해킹 기초 스터디에서 Dreamhack의 `file-csp-1`을 풀었다. 페이지에서 `a()`와 `b()`가 들어 있는 블록을 차단하고 `c()`가 들어 있는 블록과 외부 jQuery만 실행하도록 CSP를 구성하는 문제였다.

## 같은 nonce가 붙어 있으면 어떻게 구분할까

템플릿을 열어 보니 `b()`와 `c()`가 들어 있는 두 블록에 같은 nonce가 붙어 있었다. 그 값을 `script-src`에 허용하면 두 블록이 모두 실행된다. 두 블록은 본문이 서로 달랐다. 이 차이를 이용해 `c()`가 들어 있는 블록의 해시만 허용했다.

SHA-256을 계산할 때는 `<script>` 태그 사이의 본문 전체가 필요하다. 함수 선언뿐 아니라 그 뒤의 실행 코드와 공백, 줄바꿈까지 그대로 포함한다. 그 내용을 `script-body.js`에 저장했다면 아래처럼 CSP에 쓸 Base64 값을 구할 수 있다.

```bash
openssl dgst -sha256 -binary script-body.js | openssl base64 -A
```

## 인라인 스크립트와 jQuery 허용하기

`script-src`에 `c()` 블록의 해시와 템플릿이 불러오는 jQuery URL을 함께 넣었다. 외부 jQuery가 로드되어야 `c()` 블록 안에서 호출하는 `$(document)`도 실행된다.

```http
Content-Security-Policy: script-src 'sha256-<계산한 Base64 값>' https://code.jquery.com/jquery-3.4.1.slim.min.js
```

정책이 의도대로 적용되면 브라우저 화면에 `c: allow me!`와 `jquery: allow me!` 두 줄이 표시된다. 개발자 도구 콘솔을 열면 CSP가 나머지 인라인 스크립트를 차단했는지 확인할 수 있다.

## 스터디에서 배운 점

스크립트가 예상대로 실행되지 않을 때 콘솔의 CSP 위반 메시지를 보면 어느 지시어가 스크립트를 차단했는지 파악할 수 있다. 실제 서비스에서 XSS를 줄이려면 사용자 입력이 HTML이나 JavaScript로 해석되는 지점부터 고치고 CSP로 브라우저가 실행할 수 있는 스크립트의 범위를 제한해야 한다. [W3C Content Security Policy Level 3](https://www.w3.org/TR/CSP3/)
