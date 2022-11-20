import React,{useState,useEffect} from 'react'
import { Link,useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import { detailProducts, createProductReview, createProductReviewReset, deleteProductReview, deleteProductReviewReset } from '../redux/actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
function ProductPage() {
  const { id }= useParams();
  const [qty,setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const productDetail = useSelector(state=>state.productDetails);
  const {loading, error, product} = productDetail;
  const userLogin = useSelector(state=>state.userLogin);
  const {userInfo} = userLogin;
  const [userId,setUserID] = useState(0);
  const productReviewCreate = useSelector(state=>state.productReviewCreate);
  const {loading:loadingProductReview, error:errorProductReview, success:successProductReview} = productReviewCreate;
  const productReviewDelete = useSelector(state=>state.productReviewDelete);
  const {loading:loadingProductReviewDelete, error:errorProductReviewDelete, success:successProductReviewDelete} = productReviewDelete;
  const Navigate = useNavigate();
  useEffect(()=>{
    if(userInfo){
      setUserID(userInfo._id);
    }
    if(successProductReview){
      setRating(0);
      setComment('');
      dispatch(createProductReviewReset());
    }
    if(successProductReviewDelete){
      dispatch(deleteProductReviewReset());
    }
    if(!userInfo){
      setUserID(0);
    }
    dispatch(detailProducts(id));
  },[dispatch,id, successProductReview, successProductReviewDelete, userInfo, userId])
  const addToCartHandler = () => {
      Navigate(`/cart/${id}?qty=${qty}`);
  }
  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(createProductReview(id,{rating,comment}))
  }
  const deleteHandler = (id) => {
    if(window.confirm('Are you sure you want to delete your review on this product?')){
      dispatch(deleteProductReview(id))
   }
  }
  return (
    <div>
        <Link to="/" className='btn btn-light my-3'>Go Back</Link>
        {loading ? <Loader/>
            : error ? <Message variant={'danger'}>{error}</Message> 
               : <> <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
               <ListGroup.Item>
                 <h3>{product.name}</h3>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
               </ListGroup.Item>
               <ListGroup.Item>
                 Price: $ {product.price}
               </ListGroup.Item>
               <ListGroup.Item>
                 Description: {product.description}
               </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price: </Col>
                            <Col>
                                <strong>$ {product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status: </Col>
                            <Col>
                                {product.countInStock>0?'In Stock':'Out Of Stock'}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    {product.countInStock>0 && (
                       <ListGroup.Item>
                        <Row>
                          <Col>Qty:</Col>
                          <Col xs='auto' className='my-1'>
                            <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                              {
                                [...Array(product.countInStock).keys()].map((x)=>{
                                  return (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                })
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                       </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Row>
                        <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0 ? true : false}>Add to Cart</Button>
                      </Row>
                    </ListGroup.Item>
                </ListGroup>
              </Card>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col md={6}>
            <h4>Reviews</h4>  
            {product.reviews.length===0 && <Message variant='info'>No Reviews</Message>}
            <ListGroup variant='flush'>
               {product.reviews.map((review)=>{
                return(
                  <ListGroup.Item key={review._id}>
                     <strong>{review.name}</strong>
                     <Rating value={review.rating} color='#f8e825'/>
                     <p>{review.createdAt.substring(0,10)}</p>
                     <p>{review.comment}</p>
                     {review.user===userId &&
                      <>
                      <LinkContainer to={`/reviewEdit/${review._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                    </Button>
                      </LinkContainer>
                      <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                      </Button>
                      </>
                     }
                  </ListGroup.Item>
                )
               })}
               <ListGroup.Item>
                   <h4>Write a Review</h4>
                   {loadingProductReview && <Loader/>}
                   {successProductReview && <Message variant='success'>Review Submitted</Message>}
                   {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                   {userInfo? (
                    <Form onSubmit={submitHandler} className='mt-2'>
                      <Form.Group controlId='rating' className='mt-2'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment' className='mt-2'>
                        <Form.Label>Review</Form.Label>
                        <Form.Control as='textarea' row='5' value={comment} onChange={(e)=>setComment(e.target.value)}>

                        </Form.Control>
                      </Form.Group>
                      <Button disabled={loadingProductReview} type='submit' variant='primary' className='mt-3'>
                        Submit
                      </Button>
                    </Form>
                   ):(
                    <Message variant='info'>Please <Link to='/login' style={{textDecoration: 'none'}}>Login</Link> to write a review</Message>
                   )}
               </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        </> 
        }
    </div>
  )
}

export default ProductPage