import React, {useState,useEffect} from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/actions/cartActions';

function PaymentPage() {
    const cart = useSelector(state=>state.cart);
    const {cartItems, shippingAddress} = cart;
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    if(!shippingAddress.address){
       Navigate('/shipping');
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        Navigate('/placeorder');
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>
                <Col>
                    <Form.Check type="radio" label="PayPal or Credit Card" id="paypal" name="paymentMethod" checked onChange={(e)=>setPaymentMethod(e.target.value)}>
              
                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-4'>
                   Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentPage