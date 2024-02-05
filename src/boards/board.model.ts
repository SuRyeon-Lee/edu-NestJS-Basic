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
