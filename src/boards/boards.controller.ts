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
