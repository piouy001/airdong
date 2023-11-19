# ✈️Airdong

> 숙박시설을 공유/예약 할 수 있는 개인 프로젝트입니다.
<img width="946" alt="20231117_063612" src="https://github.com/piouy001/airdong/assets/60591071/1a27c28c-8401-4244-93a4-f914ffe23387">

## 🤔배경

경력기술서만으로는 제가 어떤식으로 코드를 작성하는지를 보여줄 수 없다고 생각합니다. 

그렇기에 만약 Next.js@13 + Typescript로 프로젝트를 진행하게 된다면 어떻게 구성하고 어떻게 개발하는지 보여드리고자 개발하게 되었습니다.

## 👀기술 스택

Next.js13, React, Typescript, NextAuth, MUI, Emotion, Formik, Yup, SWR, i18n, react-i18next, Prisma, (huskey,  eslint, prettier)

## 🧱개발 환경구성

### 개발 환경구성

[개발 환경구성](https://github.com/piouy001/airdong/issues/4)

### 폴더 구조

[폴더 구조](https://github.com/piouy001/airdong/issues/3)

### 레이아웃

[로그인, 회원가입 구현](https://github.com/piouy001/airdong/issues/5)

[다국어 처리 구현](https://github.com/piouy001/airdong/issues/6)

[숙소 렌트 구현](https://github.com/piouy001/airdong/issues/7)

[숙소 필터 구현](https://github.com/piouy001/airdong/issues/8)


## 📹유저 시나리오

### 메인 페이지(`/`)
[메인 페이지 구현](https://github.com/piouy001/airdong/issues/9)

### 숙소 상세페이지(`/listings/[listingId]`)
[숙소 상세페이지 구현](https://github.com/piouy001/airdong/issues/10)

### 여행 예정목록 페이지 구현(`/trips`)
[여행 예정목록 페이지 구현](https://github.com/piouy001/airdong/issues/11)

### 관심 목록 페이지 구현(`/favorites`)
[관심 목록 페이지 구현](https://github.com/piouy001/airdong/issues/12)

### 내 숙소 예약자목록 페이지 구현(`/reservations`)
[내 숙소 예약자목록 페이지 구현](https://github.com/piouy001/airdong/issues/13)

### 내 숙소 목록 페이지 구현(`/properties`)
[내 숙소 목록 페이지 구현](https://github.com/piouy001/airdong/issues/14)


## ⚙️실행방법

### package 설치

```
yarn dev
```

### .env 세팅

```
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```

### DB 세팅

```
npx prisma db push
```

### App 실행

`yarn dev`

## 🕛회고
1. 이전에는 사용자가 data를 변경했을 때 HTTP요청을 보내고 해당 data의 state상태를 변경해줌으로 바로 변경되는 듯한 UI를 보여주었는데 Server Component를 사용해서 DB정보를 바로 가져오니 요청만 보내면 바로 반영이 되어 좋았다.
2. app폴더에 page.tsx가 있으면 해당 경로를 토대로 page generate를 하기 때문에 app폴더 하위에 페이지 관련 폴더를 넣을 수 밖에 없는데 이로 인해서 폴더구조가 난잡해진 것 같다.
