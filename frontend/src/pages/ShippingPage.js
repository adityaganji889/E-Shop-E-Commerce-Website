import React,{useState,useEffect} from 'react'
import { Link,useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../redux/actions/userActions'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../redux/actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingPage() {
  const cart = useSelector(state=>state.cart);
  const {cartItems, shippingAddress} = cart;
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [address,setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [searchParams,setSearchParams] = useSearchParams();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    Navigate('/payment');
  }
  return (
    <FormContainer>
        <CheckoutSteps step1={'step1'} step2={'step2'}/>
        <h1>Shipping </h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address'>
          <Form.Label className='mt-2'>Address</Form.Label>
          <Form.Control required type="text" placeholder='Enter Address' value={address? address: ''} onChange={(e)=>setAddress(e.target.value)}>
            
          </Form.Control>
          </Form.Group>
          <Form.Group controlId='city'>
          <Form.Label className='mt-2'>City</Form.Label>
          <Form.Control required type="text" placeholder='Enter City' value={city? city: ''} onChange={(e)=>setCity(e.target.value)}>
            
          </Form.Control>
          </Form.Group>
          <Form.Group controlId='postal_code'>
          <Form.Label className='mt-2'>Postal Code</Form.Label>
          <Form.Control required type="text" placeholder='Enter Postal Code' value={postalCode? postalCode: ''} onChange={(e)=>setPostalCode(e.target.value)}>
            
          </Form.Control>
          </Form.Group>
          <Form.Group controlId='country'>
          <Form.Label className='mt-2'>Country</Form.Label>
          <Form.Control required type="text" placeholder='Enter Country' value={country? country: ''} onChange={(e)=>setCountry(e.target.value)}>
            
          </Form.Control>
          </Form.Group>
          <Button className='mt-4' type="submit" variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingPage