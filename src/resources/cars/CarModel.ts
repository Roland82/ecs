class Car {

  private readonly _id: number
  private _make: string
  private _model: string
  private _colour: string
  private _year: number
  private readonly _wordsSimilarToMake: string | null

  constructor(id: number, make: string, model: string, colour: string, year: number, wordsSimilarToMake: string | null) {
    this._id = id
    this._make = make
    this._model = model
    this._colour = colour
    this._year = year
    this._wordsSimilarToMake = wordsSimilarToMake
  }

  update(make: string, model: string, colour: string, year: number) {
    this._make = make
    this._colour = colour
    this._year = year
    this._model = model
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

  get wordsSimilarToMake(): string | null {
    return this._wordsSimilarToMake
  }
}

export default Car