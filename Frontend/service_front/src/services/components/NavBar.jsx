import {
    Collapse, DropdownItem, DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import React, {useState} from "react";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar>
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Главная</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">Новости</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">Люди</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">Чат</NavLink>
                        </NavItem>
                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    );
}