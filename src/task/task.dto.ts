export class TaskDto {
  id: string;
  title: string;
  desciption: string;
  status: string;
  expirationDate: Date;
}

export class FindAllParameters {
  title: string;
  status: string;
}
