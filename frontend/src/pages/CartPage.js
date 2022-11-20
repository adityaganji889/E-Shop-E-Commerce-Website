import React, {useEffect} from 'react'
import { Link, useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, Nav } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import Message from '../components/Message';
import { CART_REMOVE_ITEM } from '../redux/constants/cartConstants';

function CartPage() {
  const [searchParams,setSearchParams] = useSearchParams();
  const searchQty = searchParams.get('qty');
  console.log('qty:', searchQty)
  const { id } = useParams();
  const qty = parseInt(searchQty);
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart)
  const { cartItems } = cart;
  const login = useSelector(state=>state.userLogin);
  const {userInfo} = login;
  const Navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
     if(id){
        dispatch(addToCart(id,qty))
     }
  }, [dispatch, id, qty])  

  const removeFromCartHandler = (id) => {
     dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    Navigate(userInfo? '/shipping' : '/login?redirect=shipping');
  }

  return (
    <Row>
        <Col md={8}>
           <h1>Shopping Cart</h1>
           {cartItems.length === 0 ? (
             <Message variant={'info'}>
                Your Cart is empty <Link to="/">Go Back</Link>
             </Message>            
           ) : (
             <ListGroup variant='flush'>
               {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`} style={{textDecoration: 'none'}}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      $ {item.price}
                    </Col>
                    <Col md={3}>
                    <Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,parseInt(e.target.value)))}>
                              {
                                [...Array(item.countInStock).keys()].map((x)=>{
                                  return (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                })
                              }
                    </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
               ))}
             </ListGroup>
           )}
        </Col>
        <Col md={4}>
         <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc, item)=>acc+item.qty,0)}) Items</h2>
                $ {cartItems.reduce((acc, item)=>acc+item.qty*parseFloat(item.price),0).toFixed(2)}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                <Row>
               <Button type='button' className='btn-block' disabled={cartItems.length===0? true : false} onClick={checkoutHandler}>
                 Proceed To Checkout
               </Button>
               </Row>
            </ListGroup.Item>
            </ListGroup>
         </Card>
        </Col>
    </Row>
  )
}

export default CartPage