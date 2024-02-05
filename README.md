# edu-NestJS-Basic

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## nest 폴더 생성

```
//설치
npm i -g @nestjs/cli

//부모 디렉토리에서
nest new project-name

//프로젝트 디렉토리에서
nest new ./

```

## 모듈 생성하기

```
nest g module boards
// boards = 모듈 이름
//이렇게 해주면 app.modul.ts에 자동 등록됨
```

## 컨트롤러 생성하기

```
nest g controller boards --no-spec
// boards = 컨트롤러 이름
// --no-spec = 테스트를 위한 소스 코드 생성 x
```

## 서비스 생성하기

```
nest g service boards --no-spec
// boards = 서비스 이름
// --no-spec = 테스트를 위한 소스 코드 생성 x
```

CLI로 Service 생성시에는 module에도 자동으로 Service가 추가됨

## 종속성 주입하기 (Dependency Injection)

- Board Service를 Board Controller에서 이용할 수 있게 해주는 작업
- private을 쓰면 boardsService 프로퍼티는 BoardsController 클래 스 내부에서만 사용 가능

```
//src/boards/boards.controller.ts

import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
}

```

## GET 데코레이터를 이용해서 핸들러 추가해보기

1. 서비스에 함수 추가

```
import { Injectable } from '@nestjs/common';

// Injectable 데코레이터가 있어서 다른 컴포넌트에서 이 서비스를 사용할 수 있게 만들어줌
@Injectable()
export class BoardsService {
  private boards = []; //다른 컴포넌트에서 board라는 배열 값 수정하는 것 막기 위해서

  getAllBoards() {
    return this.boards;
  }
}
```

2. 서비스에 추가한 함수를 컨트롤러에서 알맞은 데코레이터와 함께 호출

```
import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // 모든 게시물을 가져오는 핸들러
  // http://localhost:3000/boards >> 빈배열 확인 가능
  @Get('/') // 그냥 @Get()만쓴거랑 똑같다
  getAllBoard() {
    return this.boardsService.getAllBoards(); //서비스에서 request를 핸들
  } // 서비스에서 처리한 값을 컨트롤러에서 브라우저에 보냄
}
```

## 모델 정의하기

- 모델은 interface나 class를 이용해서 정의 할 수 있음
- 변수의 타입만을 정의할 때 = interface
- 인스턴스도 생성 = class

```
// src > boards > board.model.ts

export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus; //특정값들 이외에 어떤 것도 들어갈 수 없을때 enum을 정의해서 사용
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

```

- 정해준 모델(타입)을 서비스와 컨트롤러에 등록해주기

```
// src > boards > boards.service.ts

import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

// Injectable 데코레이터가 있어서 다른 컴포넌트에서 이 서비스를 사용할 수 있게 만들어줌
@Injectable()
export class BoardsService {
  private boards: Board[] = []; // 값의 타입 지정

  getAllBoards(): Board[] { // 리턴깂의 타입지정
    return this.boards;
  }
}

```

```

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoard(): Board[] { // 리턴깂의 타입지정
    return this.boardsService.getAllBoards();
  }
}

```
