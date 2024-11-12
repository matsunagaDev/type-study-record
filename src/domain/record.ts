export class Record {
  constructor(
    public id: string,
    public learn_title: string,
    public learn_time: number,
    public created_at: string
  ) {}

  public static newRecord(
    id: string,
    learn_title: string,
    learn_time: number,
    created_at: string
  ): Record {
    return new Record(id, learn_title, learn_time, created_at);
  }
}
