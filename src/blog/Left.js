
import { useStore,actions } from '../store'
import { useRef,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
// import { Link } from 'react-router-dom'
function Left(){
    const [state, dispatch] = useStore()
    const { mail,confirm,Type } = state
    const email = useRef()

    const SubmitMail = ()=>{
        const corect = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if(corect.test(mail)){
            dispatch(actions.setMails(mail))
            dispatch(actions.setConfirmMail(false))
            email.current.focus()
        }else{
            dispatch(actions.setConfirmMail(true))
            console.log("Error: Invalid Email");
        }
    }
    const handleMoveHome = (e)=>{
        e.preventDefault();
        const navItems = document.querySelectorAll('.nav-item')
        const Home = document.getElementById('Home')
        Array.from(navItems).forEach(item=>{
          item.classList.remove('choosen')
        })
        Home.parentElement.classList.add('choosen')
        if(Type === 'Home'){
            document.querySelector('.main').scrollIntoView()
        }else{
            dispatch(actions.setType('Home'))
        }
    }
    return (
        <div className='nav-wrap'>
            <div className='move-home mb-24'>
                <a href='index.js' className='home' onClick={e=>handleMoveHome(e)}>
                    Andrea 
                    <span>
                        Moore
                    </span>
                </a>
            </div>
            <div className="contact">
                <h2 className='left__contact'>Subscribe for newsletter</h2>
                <div className='contact__mail'>
                    <input
                        ref={email}
                        value={mail}
                        onChange={e=>dispatch(actions.setMail(e.target.value))}
                        placeholder='Enter Email Address'
                        className='contact__mail--input'
                    />
                    <button
                        onClick={SubmitMail}
                        className='contact__mail--button btn'
                    >
                        <FontAwesomeIcon className='contact__mail--button-icon' icon={faPaperPlane}/>
                    </button>
                    {confirm && <span>Invalid Email</span>}
                </div>
            </div>
            <p className='copy-right'>{`Copyright ©2022 All rights reserved | This template is made with <3 by KRUB`}</p>
        </div>

    )
}
export default Left