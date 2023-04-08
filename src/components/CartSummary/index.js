import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const price = cartList.map(item => item.price * item.quantity)
      const totalPrice = price.reduce((a, b) => a + b, 0)
      return (
        <div className="cart-summary-container">
          <h1 className="total-order">
            Order Total:<span className="total-price">Rs {totalPrice}/-</span>
          </h1>
          <p className="total-quantity">{cartList.length}Items in cart</p>
          <button type="button" className="check-out">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
