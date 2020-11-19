class Cell {
  constructor(i, j) {
    this.i = i
    this.j = j

    this.floor = -1
    this.zone  = -1
    this.speed =  1

    this.weight = 0
    this.candidateRef = null
  }
}

module.exports = Cell