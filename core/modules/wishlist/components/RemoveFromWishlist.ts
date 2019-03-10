import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { Wishlist as WishlistModule } from '../'
import wishlistMountedMixin from '@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin'

export const RemoveFromWishlist = {
  name: 'RemoveFromWishlist',
  mixins: [wishlistMountedMixin],
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  methods: {
    removeFromWishlist (product: Product) {
      WishlistModule.register()
      product.sku = product.parentSku
      this.$store.dispatch('wishlist/removeItem', product)
    }
  }
}
