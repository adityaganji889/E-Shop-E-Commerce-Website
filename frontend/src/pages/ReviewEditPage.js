import React,{useState,useEffect} from 'react'
import { Link,useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductReview, updateProductReviewReset } from '../redux/actions/productActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ReviewEditPage(){
    const { id }= useParams();
    const [qty,setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const productDetail = useSelector(state=>state.productDetails);
    const {loading, error, product} = productDetail;
    const userLogin = useSelector(state=>state.userLogin);
    const {userInfo} = userLogin;
    const productReviewUpdate = useSelector(state=>state.productReviewUpdate);
    const {loading:loadingProductReview, error:errorProductReview, success:successProductReview} = productReviewUpdate;
    const Navigate = useNavigate();
  useEffect(()=>{
    if(successProductReview){
       dispatch(updateProductReviewReset());
       Navigate(`/product/${product._id}`)
    }
    else{
        const review = product.reviews.filter((review1)=>review1._id=id)
        console.log(review);
        setRating(review[0].rating);
        setComment(review[0].comment);
    }
  }, [successProductReview, Navigate, dispatch, productReviewUpdate])
  const submitHandler = (e) => {
   e.preventDefault();
   dispatch(updateProductReview(product._id,{rating,comment}))
  }
  return (
    <div>
      <Link to={`/product/${product._id}`} style={{textDecoration: 'none'}} className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
       <h1>Edit Review</h1>
       {loadingProductReview && <Loader/>}
       {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
       {loading        
        ?<Loader/> 
        : error 
        ?<Message variant='danger'>{error}</Message> 
        : (
            <>
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
            </>
       )}
      </FormContainer>
    </div>
  )
}

export default ReviewEditPage