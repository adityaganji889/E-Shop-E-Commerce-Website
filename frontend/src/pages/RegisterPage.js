import React,{useState,useEffect} from 'react'
import { Link,useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../redux/actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
function RegisterPage() {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const [message,setMessage] = useState();
  const location = useLocation();
  const Navigate = useNavigate();
  const userRegister = useSelector(state=>state.userLogin)
  const { error, loading, userInfo } = userRegister;
  const dispatch = useDispatch();
  const [searchParams,setSearchParams] = useSearchParams();
  const redirect = searchParams.get('redirect')? searchParams.get('redirect') : "/";
  useEffect(()=>{
    if(userInfo){
      if(redirect!="/"){
        Navigate(`/${redirect}`);
      }
      else{
        Navigate('/');
      }
    }
  }, [userInfo, redirect, Navigate])
  const submitHandler = (e) => {
   e.preventDefault();
   if(password!=confirmPassword){
    setMessage('Passwords do not match');
   }
   else{
    dispatch(Register(name,email,password));
   }
  }
  return (
    <FormContainer>
       <h1>Sign Up</h1>
       {message && <Message variant='danger'>{message}</Message> }
       {error && <Message variant='danger'>{error}</Message>}
       {loading && <Loader/>}
       <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='mt-2'>
             <Form.Label>Name</Form.Label>
             <Form.Control required type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           <Form.Group controlId='email' className='mt-2'>
             <Form.Label>Email Address</Form.Label>
             <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           <Form.Group controlId='password' className='mt-2'>
             <Form.Label>Password</Form.Label>
             <Form.Control required type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           <Form.Group controlId='password' className='mt-2'>
             <Form.Label>Confirm Password</Form.Label>
             <Form.Control required type="password" placeholder="Enter Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           <Button type="submit" variant='primary' className='mt-3'>Sign Up</Button>
       </Form>
       <Row className='py-3'> 
          <Col>
            Already a Registered Customer? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
          </Col>
       </Row>
    </FormContainer>
  )
}

export default RegisterPage