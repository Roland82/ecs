class Car {

  private _id: number
  private make: string
  private model: string
  private colour: string
  private year: number

  constructor(id: number, make: string, model: string, colour: string, year: number) {
    this._id = id
    this.make = make
    this.model = model
    this.colour = colour
    this.year = year
  }

  get id(): number {
    return this._id
  }
}

export default Car