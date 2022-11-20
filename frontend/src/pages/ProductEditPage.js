import React,{useState,useEffect} from 'react'
import { Link,useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import { listProducts, detailProducts, updateProduct, updateProductReset } from '../redux/actions/productActions'

function ProductEditPage(){
  const { id } = useParams();
  const productId = id;
  const Navigate = useNavigate();
  const productDetails = useSelector(state=>state.productDetails)
  const { error, loading, product } = productDetails;
  const productUpdate = useSelector(state=>state.productUpdate)
  const { error:errorUpdate , loading:loadingUpdate, success:successUpdate } = productUpdate;
  const [name,setName] = useState();
  const [price,setPrice] = useState(0);
  const [image,setImage] = useState();
  const [brand,setBrand] = useState();
  const [category,setCategory] = useState();
  const [countInStock,setCountInStock] = useState(0);
  const [description,setDescription] = useState();
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(successUpdate){
       dispatch(updateProductReset());
       Navigate('/admin/productList')
    }
    else{
        if(!product.name || product._id !== Number(productId)){
            dispatch(detailProducts(productId));
        }
        else{
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }
  }, [product, productId, successUpdate, Navigate, dispatch])

  const uploadFileHandler = async(e) => {
       const file = e.target.files[0];
       const formData = new FormData()

       formData.append('image',file);
       formData.append('product_id',productId);
       setUploading(true);
       try{
         const config = {
           headers: {
            'Content-Type': 'multipart/form-data'
           }
         }
         const {data} = await axios.post('/api/products/upload/',formData,config);
         setImage(data);
         setUploading(false);
       }
       catch(error){
         setUploading(false);
       }
  }
  const submitHandler = (e) => {
   e.preventDefault();
   dispatch(updateProduct({_id:product._id, name, price, image, brand, category, countInStock, description}))
  }
  return (
    <div>
      <Link to='/admin/productList' style={{textDecoration: 'none'}} className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
       <h1>Edit Product</h1>
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
             <Form.Control type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>setName(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           <Form.Group controlId='price' className='mt-2'>
             <Form.Label>Price</Form.Label>
             <Form.Control type="number" placeholder="Enter Product Price" value={price} onChange={(e)=>setPrice(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           <Form.Group controlId='image' className='mt-2'>
             <Form.Label>Image</Form.Label>
             <Form.Control type="text" placeholder="Enter Product Image" value={image} onChange={(e)=>setImage(e.target.value)}>
               
             </Form.Control>
             <Form.Label>File</Form.Label>
             <Form.Control
              type="file"
              name="image"
              onChange={uploadFileHandler}

            />
             {/* {uploading && <Loader/>} */}
           </Form.Group>
           <Form.Group controlId='brand' className='mt-2'>
             <Form.Label>Brand</Form.Label>
             <Form.Control type="text" placeholder="Enter Product Price" value={brand} onChange={(e)=>setBrand(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           <Form.Group controlId='category' className='mt-2'>
             <Form.Label>Category</Form.Label>
             <Form.Control type="text" placeholder="Enter Product Category" value={category} onChange={(e)=>setCategory(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           <Form.Group controlId='description' className='mt-2'>
             <Form.Label>Description</Form.Label>
             <Form.Control type="text" placeholder="Enter Product Description" value={description} onChange={(e)=>setDescription(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           <Form.Group controlId='countInStock' className='mt-2'>
             <Form.Label>Count In Stock</Form.Label>
             <Form.Control type="number" placeholder="Enter Count In Stock" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}>
               
             </Form.Control>
           </Form.Group>
           {/* <Form.Group controlId='isadmin' className='mt-2'>
             <Form.Check type="number" label="Is Admin" checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)}>
               
             </Form.Check>
           </Form.Group> */}
           
           <Button type="submit" variant='primary' className='mt-3'>Update</Button>
       </Form>  
       )}
      </FormContainer>
    </div>
  )
}

export default ProductEditPage