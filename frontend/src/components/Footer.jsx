import React from "react";
import "../styles/Footer.css"

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer--text">
                <p className="quote">"When Obedience is complete, your dominion is established</p>
                <p className="quoteMaker">- Dr.David Oyedepo</p>
            </div>

            <img
                src="../images/Dashboard/cu_logo.png"
                className="footer--logo" />
        </div>
    )
}