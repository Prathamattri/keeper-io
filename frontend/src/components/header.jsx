import React from "react";
import "../assets/styles/Header.css"

function Header(){
    return (
        <div className="header">
            <nav>
                <div className="nav--logo">
                    <h1>KEEPER.io</h1>
                </div>
                <div className="validation">
                    <a href='#' className="btn btn-login">LOGIN</a>
                    <a href='#' className="btn btn-signup">SIGNUP</a>
                </div>
            </nav>
        </div>
    );
}

export default Header;