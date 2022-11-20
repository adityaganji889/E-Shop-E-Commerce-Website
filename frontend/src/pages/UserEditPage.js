import React,{useState,useEffect} from 'react'
import { Link,useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser, userUpdateReset } from '../redux/actions/userActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

function UserEditPage(){
  const { id } = useParams();
  const userId = id;
  const Navigate = useNavigate();
  const userDetails = useSelector(state=>state.userDetails)
  const { error, loading, user } = userDetails;
  const userUpdate = useSelector(state=>state.userUpdate)
  const { error:errorUpdate , loading:loadingUpdate, success:successUpdate } = userUpdate;
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [isAdmin,setIsAdmin] = useState();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(successUpdate){
       dispatch(userUpdateReset());
       Navigate('/admin/userList')
    }
    else{
        if(!user.name || user._id !== Number(userId)){
            dispatch(getUserDetails(userId));
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }
  }, [user, userId, successUpdate, Navigate])
  const submitHandler = (e) => {
   e.preventDefault();
   dispatch(updateUser({_id:user._id, name, email, isAdmin}))
  }
  return (
    <div>
      <Link to='/admin/userList' style={{textDecoration: 'none'}} className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
       <h1>Edit User</h1>
       {loadingUpdate && <Loader/>}
       {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
       {loading        
        ?<Loader/> 
        : error 
        ?<Message variant='danger'>{error}</Message> 
        : (
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='mt-2'>
             <Form.Label>Name</Form.Label>
             <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           <Form.Group controlId='email' className='mt-2'>
             <Form.Label>Email Address</Form.Label>
             <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           <Form.Group controlId='isadmin' className='mt-2'>
             <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}>
               
             </Form.Check>
           </Form.Group>
           
           <Button type="submit" variant='primary' className='mt-3'>Update</Button>
       </Form>  
       )}
      </FormContainer>
    </div>
  )
}

export default UserEditPage