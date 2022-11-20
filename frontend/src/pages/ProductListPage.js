import React,{useState,useEffect} from 'react'
import { Link,useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct, createProduct, createProductReset } from '../redux/actions/productActions'

function ProductListPage() {
   const dispatch = useDispatch();
   const productList = useSelector(state=>state.productList);
   const productDelete = useSelector(state=>state.productDelete);
   const productCreate = useSelector(state=>state.productCreate);
   const userLogin = useSelector(state=>state.userLogin)
   const { userInfo } = userLogin;
   const {error, loading, products} = productList;
   const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete;
   const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate;
   const Navigate = useNavigate();
   useEffect(()=>{
      dispatch(createProductReset())
      if(!userInfo.isAdmin){
        Navigate('/login');
      }
      if(successCreate){
        Navigate(`/admin/productEdit/${createdProduct._id}`);
      }
      else{
        dispatch(listProducts());
      }
   },[dispatch, Navigate, userInfo, successDelete, successCreate, createdProduct])
   const deleteHandler = (id) => {
     if(window.confirm('Are you sure you want to delete this user?')){
        dispatch(deleteProduct(id));
     }
   }
   const createProductHandler = () => {
     dispatch(createProduct())
   }
   return(
     <div>
       <Row className='align-items-center'>
         <Col md={9}>
            <h1>Products</h1>
         </Col>
         <Col className='text-right'>
           <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
           </Button>
         </Col>
       </Row>
       {loadingDelete && <Loader/>}
       {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
       {loadingCreate && <Loader/>}
       {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product)=>{
                    return(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>$ {product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/productEdit/${product._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(product._id)}>
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

export default ProductListPage