module.exports = {
  describe: () => ({
    name: 'Map',
    key: 'map',
    description: 'Manages the map actions'
  }),
  data: () => ({
    
  }),
  subscribers: {
    GameContextCreateMessage(ctx, packet) {},
    CurrentMapMessage(ctx, packet) {},
    MapComplementaryInformationsDataMessage(ctx, packet) {},
    MapComplementaryInformationsDataInHouseMessage(ctx, packet) {},
    MapComplementaryInformationsWithCoordsMessage(ctx, packet) {},
    InteractiveElementUpdatedMessage(ctx, packet) {},
    StatedElementUpdatedMessage(ctx, packet) {},
    InteractiveMapUpdateMessage(ctx, packet) {},
    StatedMapUpdateMessage(ctx, packet) {},
    TextInformationMessage(ctx, packet) {},
    LockableCodeResultMessage(ctx, packet) {},
    ExchangeStartedWithStorageMessage(ctx, packet) {}
  },
  methods: {
    moveToCell(ctx, cellId) {},
    changeMap(direction, cellId = null) {},
    useElement(elementId, skillId) {}
  }
}