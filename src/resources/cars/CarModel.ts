class Car {
  private id: number
  private make: string
  private model: string
  private colour: string
  private year: number

  constructor(id: number, make: string, model: string, colour: string, year: number) {
    this.id = id
    this.make = make
    this.model = model
    this.colour = colour
    this.year = year
  }
}

export default Car