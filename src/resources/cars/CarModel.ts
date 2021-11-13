class Car {
  private _id: number
  private _make: string
  private _model: string
  private _colour: string
  private _year: number

  constructor(id: number, make: string, model: string, colour: string, year: number) {
    this._id = id
    this._make = make
    this._model = model
    this._colour = colour
    this._year = year
  }

  get id(): number {
    return this._id
  }

  get make(): string {
    return this._make
  }

  get model(): string {
    return this._model
  }

  get colour(): string {
    return this._colour
  }

  get year(): number {
    return this._year
  }
}

export default Car