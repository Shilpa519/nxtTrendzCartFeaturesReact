import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newCartList = cartList.filter(item => item.id !== id)
    this.setState({cartList: newCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newCartList = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })
    this.setState({cartList: newCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const cartItem = cartList.filter(item => item.id === id)
    const {quantity} = cartItem[0]
    if (quantity > 0) {
      const newCartList = cartList.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      })
      this.setState({cartList: newCartList})
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {id, quantity} = product
    const {cartList} = this.state
    const isTrue = cartList.filter(item => item.id === id)
    if (isTrue.length > 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + quantity}
          }
          return item
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
