import React,{useState,useEffect} from 'react'
import { Link,useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../redux/actions/userActions'
function UserListPage() {
   const dispatch = useDispatch();
   const userList = useSelector(state=>state.userList);
   const userLogin = useSelector(state=>state.userLogin)
   const { userInfo } = userLogin;
   const {error, loading, users} = userList;
   const userDelete = useSelector(state=>state.userDelete)
   const { success:successDelete } = userDelete;
   const Navigate = useNavigate();
   useEffect(()=>{
      if(userInfo && userInfo.isAdmin){
        dispatch(listUsers());
      }
      else{
        Navigate('/login');
      }
   },[dispatch, Navigate, successDelete, userInfo])
   const deleteHandler = (id) => {
     if(window.confirm('Are you sure you want to delete this user?')){
        dispatch(deleteUser(id))
     }
   }
   return(
     <div>
       <h1>Users </h1>
       {loading
       ? (<Loader/>) 
       : error
       ? (<Message variant='danger'>{error}</Message>) 
       : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead className='bg-dark text-white'>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Is Admin?</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>{
                    return(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin? (
                                <i className='fas fa-check' style={{color: 'green'}}></i>
                            ):(
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/admin/userEdit/${user._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(user._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
          </Table>
       )}
     </div>
   )
}

export default UserListPage