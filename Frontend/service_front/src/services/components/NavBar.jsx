import {
    Collapse,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    NavLink,
} from "reactstrap";
import { NavLink as Li } from 'react-router-dom';
import React, {useState} from "react";
import "./NavBar.css"


function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="header" style={{background: "#0699c2"}}>
            <Navbar expand="lg" dark className="my-container">
                <Nav navbar>
                    <NavItem>
                        <NavLink to="/" tag={Li}>Главная</NavLink>
                    </NavItem>
                </Nav>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink to="/feeds" tag={Li}>Новости</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/people" tag={Li}>Люди</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/friends" tag={Li}>Друзья</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/rating" tag={Li}>Рейтинг</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav style={{marginLeft: "auto"}} navbar>
                        <NavItem>
                            <NavLink to="/profile" tag={Li}>Профиль</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="header__text--play" to="/game" tag={Li}>Играть</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;