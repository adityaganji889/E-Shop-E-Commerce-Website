import React,{useState,useEffect} from 'react'
import { Link,useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../redux/actions/userActions'
import { listOrders } from '../redux/actions/orderActions'
function OrderListPage() {
   const dispatch = useDispatch();
   const orderList = useSelector(state=>state.orderList);
   const userLogin = useSelector(state=>state.userLogin)
   const { userInfo } = userLogin;
   const {error, loading, orders} = orderList;
   const Navigate = useNavigate();
   useEffect(()=>{
      if(userInfo && userInfo.isAdmin){
        dispatch(listOrders());
      }
      else{
        Navigate('/login');
      }
   },[dispatch, Navigate,  userInfo])
   return(
     <div>
       <h1>Orders </h1>
       {loading
       ? (<Loader/>) 
       : error
       ? (<Message variant='danger'>{error}</Message>) 
       : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead className='bg-dark text-white'>
                <tr>
                <th>ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Is Paid?</th>
                <th>Is Delivered?</th>
                <th>Edit Order</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order)=>{
                    return(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.username}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>$ {order.totalPrice}</td>
                            <td>{order.isPaid? (
                                order.paidAt.substring(0,10)
                            ):(
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>{order.isDelivered? (
                                order.deliveredAt.substring(0,10)
                            ):(
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                    {/* <i className='fas fa-edit'></i> */}
                                    Details
                                    </Button>
                                </LinkContainer>
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

export default OrderListPage