export class RepositoryMock<T> {
  public one: T
  public list: T[]
  public findMock = jest.fn()
  public findOneOrFailMock = jest.fn()
  public saveMock = jest.fn()
  public deleteMock = jest.fn()

  public find(...args: any[]): Promise<T[]> {
    this.findMock(args)
    return Promise.resolve(this.list)
  }

  public findOneOrFail(...args: any[]): Promise<T> {
    this.findOneOrFailMock(args)
    return Promise.resolve(this.one)
  }

  public save(value: T, ...args: any[]): Promise<T> {
    this.saveMock(value, args)
    return Promise.resolve(value)
  }

  public delete(value: T, ...args: any[]): Promise<T> {
    this.deleteMock(value, args)
    return Promise.resolve(value)
  }
}
