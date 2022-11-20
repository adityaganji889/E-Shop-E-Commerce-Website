import React,{useState,useEffect} from 'react'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
export const HomePage = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const productList = useSelector((state)=>{
    return state.productList;
  });
  const {error,loading,products, page, pages } = productList; 
  const [searchParams,setSearchParams] = useSearchParams();
  let keyword1 = searchParams.get('keyword')? searchParams.get('keyword') : " ";
  const page2 = searchParams.get('page')? searchParams.get('page') : '';
  const[page1,setPage1] = useState(page2);
  useEffect(()=>{
    dispatch(listProducts({keyword: keyword1, page: page1}))
  },[dispatch, keyword1, page1])
  return (
    <div>
        {keyword1===" " && <ProductCarousel/>}
        <h1>Latest Products</h1>
        {loading ? <Loader/>
            : error ? <Message variant={'danger'}>{error}</Message>
              :
              <div>
              <Row>
              {products.map((product)=>{
                return (
                  <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                    <Product product={product}/>
                  </Col>
                 )
               })}
             </Row>
             <Paginate page={page1} pages={pages} keyword={keyword1} setPage1={setPage1} />
              </div>
        }
    </div>
  )
}