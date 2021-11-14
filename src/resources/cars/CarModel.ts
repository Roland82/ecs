class Car {

  private readonly _id: number
  private readonly _make: string
  private readonly _model: string
  private readonly _colour: string
  private readonly _year: number
  private readonly _wordsSimilarToMake: string | null

  constructor(id: number, make: string, model: string, colour: string, year: number, wordsSimilarToMake: string | null) {
    this._id = id
    this._make = make
    this._model = model
    this._colour = colour
    this._year = year
    this._wordsSimilarToMake = wordsSimilarToMake
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