import { Injectable } from '@nestjs/common';

// Injectable 데코레이터가 있어서 다른 컴포넌트에서 이 서비스를 사용할 수 있게 만들어줌
@Injectable()
export class BoardsService {
  private boards = []; //다른 컴포넌트에서 board라는 배열 값 수정하는 것 막기 위해서

  getAllBoards() {
    return this.boards;
  }
}
