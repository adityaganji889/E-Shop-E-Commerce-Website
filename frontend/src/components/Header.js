import React from 'react'
import { Container,Row, Col, Nav, Navbar, NavDropdown, Form, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../redux/actions/userActions';
import SearchBox from './SearchBox';
export const Header = () => {
  const userLogin = useSelector(state=>state.userLogin);
  const {error,loading,userInfo} = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(Logout())
  }
  return (
        <header>
           <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
           <Navbar.Brand>E-Shop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <SearchBox/>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to="/cart">
            <Nav.Link>
            <i className='fas fa-shopping-cart'></i> Cart
            </Nav.Link>
            </LinkContainer>
            {userInfo? (
              <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
            <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
            </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userList'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productList'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderList'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </header>
  )
}
