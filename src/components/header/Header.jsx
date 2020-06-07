import React from 'react'
import './Header.css'

export default function Header() {
    return (
        <div>
            <header>
                <div className='name'>
                    <span className='p'>P</span>athFinde<span className='r'>r</span>
                </div>
                <div className='author'>
                    <span>Dan Dalgatov 2020</span>
                    <div className='header-icons'>
                        <a href="https://www.linkedin.com/in/dandalgatov" target="_blank">
                            <img src={process.env.PUBLIC_URL + "/linkedin_logo_wk.png"} alt="LinkedIn Logo" />
                        </a>
                        <a href="https://github.com/dandalgatov" target="_blank">
                            <img src={process.env.PUBLIC_URL + "/github_logo_wk.png"} alt="GitHub Logo" />
                        </a>
                    </div>
                </div>
            </header>
        </div>
    )
}
