import {
    Collapse,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    NavLink,
} from "reactstrap";
import React, {useState} from "react";


function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div style={{background: "#04597c"}}>
            <Navbar expand="md" dark className="fs-5 my-container py-3">
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/">Главная</NavLink>
                    </NavItem>
                </Nav>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/news">Новости</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/people">Люди</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/chat">Чат</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav style={{marginLeft: "auto"}} navbar>
                        <NavItem>
                            <NavLink href="/profile">Профиль</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/game">Играть</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>


            </Navbar>
        </div>
    );
}

export default NavBar;