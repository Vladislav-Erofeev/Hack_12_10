import React from "react";

function Footer() {
    return (
        <div style={{background: "#5696ab"}}>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-4 my-container">
                <div className="col-md-4 d-flex align-items-center">
                    <a href="/" className="mx-2 my-0 mb-md-0 text-muted text-decoration-none lh-1">12/10</a>
                </div>
                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3">
                        <a className="text-muted" href="#"><img src="github.svg" width="30px" alt=""/></a>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted" href="#"></a>
                    </li>
                    <li className="ms-3">
                        <a className="text-muted" href="#"></a>
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer;