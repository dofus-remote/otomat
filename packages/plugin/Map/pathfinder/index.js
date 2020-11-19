const Static = require('./static')
const Constants = require('./constants')
const Cell = require('./CellPath')

class PathFinder {
  constructor() {
    this.mapPoints = {}
    this.grid = []
    this.useOldMovementSystem = false

    this._generateMapPoints()
    this._generateGrid()
  }

  _generateMapPoints() {
    this.mapPoints = {}
    for (let cellId = 0; cellId < Constants.CELL_NUMBER; cellId++) {
      const { x, y } = Static.getMapPoint(cellId)
      this.mapPoints[x + '_' + y] = cellId
    }
  }

  _generateGrid() {
    this.grid = []
    for (let i = 0; i < Constants.WIDTH; i += 1) {
      const row = []
      for (let j = 0; j < Constants.HEIGHT; j += 1) {
        row[j] = new CellPath(i, j)
      }
      this.grid[i] = row
    }
  }

  getCellId(x, y) {
    return this.mapPoints[x + '_' + y]
  }

  getAccessibleCells(i, j) {
    i += 1
    j += 1
    const c = this.grid[i][j]

    // Adjacent cells
    const c01 = this.grid[i - 1][j]
    const c10 = this.grid[i][j - 1]
    const c12 = this.grid[i][j + 1]
    const c21 = this.grid[i + 1][j]

    const accessibleCells = []
    if (Static.areCommunicating(c, c01, this.useOldMovementSystem)) accessibleCells.push({ i: c01.i - 1, j: c01.j - 1 })
    if (Static.areCommunicating(c, c21, this.useOldMovementSystem)) accessibleCells.push({ i: c21.i - 1, j: c21.j - 1 })
    if (Static.areCommunicating(c, c10, this.useOldMovementSystem)) accessibleCells.push({ i: c10.i - 1, j: c10.j - 1 })
    if (Static.areCommunicating(c, c12, this.useOldMovementSystem)) accessibleCells.push({ i: c12.i - 1, j: c12.j - 1 })

    return accessibleCells
  }

  fillPathGrid(map) {
    const firstCellZone = map.cells[0].z || 0
    this.useOldMovementSystem = true

    for (let i = 0; i < Constants.WIDTH; i += 1) {
      const row = grid[i]
      for (let j = 0; j < HEIGHT; j += 1) {
        const cellId = getCellId(i - 1, j - 1)
        const cellPath = row[j]
        const cell = map.cells[cellId]
        this.updateCellPath(cell, cellPath, firstCellZone)
      }
    }
  }

  getPath(userCellId, targetCellId, occupiedCells, bool, bool2) {

  }

  getMovementDuration() {

  }

  compressPath() {

  }
}

module.exports = PathFinder