import React, {useEffect, useState} from 'react'
import { Button, Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { listProducts } from '../redux/actions/productActions';
function Paginate({pages, page, keyword='', setPage1, isAdmin=false}) {
  const dispatch = useDispatch();
  const currentPage = useSelector(state=>state.productList.page);
  const Navigate = useNavigate();
  
  return ( pages>1 && (
    <Pagination>
       {[...Array(pages).keys()].map((x)=>{
        return(
            <Link key={x+1} to={`/?keyword=${keyword}&page=${page}`} style={{textDecoration: 'none'}}>
              <Pagination.Item active={x+1===page} onClick={()=>{setPage1(x+1);}}>
                {x+1}
              </Pagination.Item>
            </Link>
        )
       })}
    </Pagination>
  )
  )
}

export default Paginate