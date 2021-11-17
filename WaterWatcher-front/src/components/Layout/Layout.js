import React from 'react'
import Navbar from '../Navbar/Navbar'

export default function Layout(props) {
    return (
        <div>
            <Navbar/>
            <div>{props.children}</div>
        </div>
    )
}
