import React, {useEffect, useState} from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

function SearchBox() {
   const [keyword,setKeyword] = useState('');
   const Navigate = useNavigate();
   const submitHandler = (e) => {
        e.preventDefault();
        if(keyword){
           Navigate(`/?keyword=${keyword}&page=1`)
        }
        else{
           Navigate('/');
        }
   }
   return (
    <Form onSubmit={submitHandler}>
       <Row>
         <Col>
         <Form.Control type='text' name='q' value={keyword} onChange={(e)=>setKeyword(e.target.value)} className='' placeholder='Search Product Here'>
       </Form.Control>
         </Col>
         <Col>
         <Button type='submit' variant='outline-success' className='p-2' >Search</Button>
         </Col>
       </Row>
    </Form>
  )
}

export default SearchBox