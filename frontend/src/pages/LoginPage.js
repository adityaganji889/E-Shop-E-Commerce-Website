import React,{useState,useEffect} from 'react'
import { Link,useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../redux/actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
function LoginPage() {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const location = useLocation();
  const Navigate = useNavigate();
  const userLogin = useSelector(state=>state.userLogin)
  const { error, loading, userInfo } = userLogin;
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
   dispatch(Login(email,password));
  }
  return (
    <FormContainer>
       <h1>Sign In</h1>
       {error && <Message variant='danger'>{error}</Message>}
       {loading && <Loader/>}
       <Form onSubmit={submitHandler}>
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
           <Button type="submit" variant='primary' className='mt-3'>Sign In</Button>
       </Form>
       <Row className='py-3'> 
          <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Sign Up</Link>
          </Col>
       </Row>
    </FormContainer>
  )
}

export default LoginPage