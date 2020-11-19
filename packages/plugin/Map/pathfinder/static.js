const { ELEVATION_TOLERANCE } = require('./constants')

module.exports = class StaticPathFinder {
  static getMapPoint(cellId) {
    const row = cellId % 14 - ~~(cellId / 28)
    const x = row + 19
    const y = row + ~~(cellId / 14)
    return { x, y }
  }

  static areCommunicating(c1, c2, oldMovementSystem) {
    const sameFloor = c1.floor === c2.floor
    const sameZone = c1.zone === c2.zone

    if (sameFloor) return true
    if (!sameZone) return false
    
    return oldMovementSystem || c1.zone !== 0 || (Math.abs(c1.floor - c2.floor) <= ELEVATION_TOLERANCE)
  }
}