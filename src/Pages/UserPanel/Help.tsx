import React from 'react'
import help from "../../assets/help.png"
import ChatBot from '../../components/Chatbot'
const Help = () => {
    return (
        <div className='profile-card'>
            <div className='d-flex justify-content-center mt-4'>
                <h1 className='fresh'>Help and Support</h1>

            </div>
            <div className='d-flex justify-content-center mt-4'>

                <img
                    style={{
                        background: "#FFCB46",
                        // boxShadow: "1px 2px 3px black",
                        height: "320px",
                        textAlign: "center",
                    }}
                    src={help} />
            </div>
            <div className='d-flex justify-content-between'>
                <p className='mt-5 m-4 fs-3 fresh'>
                    Contact Us:-9999999999
                </p>
                <p className='mt-5 m-4 fs-3 fresh'>
                    Email Us:-demo@demo.com
                </p>
            </div>
            <ChatBot/>
        </div>
    )
}

export default Help
