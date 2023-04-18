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


function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div style={{background: "#04597c"}}>
            <Navbar expand="md" dark className="fs-5 my-container py-3">
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
                            <NavLink to="/chat" tag={Li}>Чат</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav style={{marginLeft: "auto"}} navbar>
                        <NavItem>
                            <NavLink to="/profile/1" tag={Li}>Профиль</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/game" tag={Li}>Играть</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;