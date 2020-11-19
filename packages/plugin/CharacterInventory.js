module.exports = {
  describe: () => ({
    name: 'CharacterInventory',
    key: 'characterInventory',
    description: 'Manages the character inventory'
  }),
  data: () => ({
    kamas: 0,
    items: [],
    weight: 0,
    weightMax: 0
  }),
  subscribers: {
    InventoryContentMessage(ctx, packet) {
      this.kamas = packet.kamas
      this.items = packet.objects
    },
    InventoryWeightMessage(ctx, packet) {
      this.weight = packet.weight
      this.weightMax = packet.weightMax
    },
    ObjectDeletedMessage(ctx, { objectUID }) {
      for (const itemIndex in this.items) {
        const item = this.items[itemIndex]
        if (item.objectUID !== objectUID) continue
        this.items.slice(itemIndex, 1)
        break
      }
    },
    ObjectQuantityMessage(ctx, { objectUID, quantity }) {
      for (const item of this.items) {
        if (item.objectUID !== objectUID) continue
        item.quantity = quantity
        break
      }
    }
  },
  methods: {
    deleteItem(ctx, objectUID, quantity) {
      ctx.socket.sendMessage('ObjectDeleteMessage', { objectUID, quantity })
      return this._wrapper.once('BasicNoOperationMessage')
    },
    dropItem(ctx, objectUID, quantity) {
      ctx.socket.sendMessage('ObjectDropMessage', { objectUID, quantity })
      return this._wrapper.once('BasicNoOperationMessage')
    },
    useItem(ctx, objectUID, quantity = 1) {
      if (quantity === 1) {
        ctx.socket.sendMessage('ObjectUseMessage', { objectUID })
      } else if (quantity > 1) {
        ctx.socket.sendMessage('ObjectUseMultipleMessage', {
          objectUID,
          quantity
        })
      }
      return this._wrapper.once('BasicNoOperationMessage')
    },
    equipItem(ctx) {},
    unequipItem(ctx) {}
  },
  mounted() {},
  unmounted() {}
}
