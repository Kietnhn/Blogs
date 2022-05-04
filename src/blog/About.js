import { useStore,actions } from '../store'
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
function About(){
    const [state, dispatch] = useStore()
    const { password, admin, signIn,signOut,checkPassWord,isSeePassWord } = state
    const pass = useRef()
    const inputPass = useRef()
    const eye = useRef()
    
    const handleSignIn= ()=>{
        if(admin){
            //sign-out
            if(password === pass.current.innerText){
                dispatch(actions.setSignOut(true))
            }else{
                dispatch(actions.setCheckPassWord(true))
            }
        }else{
            //sign-in
            if(password === pass.current.innerText){
                dispatch(actions.admin(true))
                dispatch(actions.setPassWord(''))
                dispatch(actions.setSignIn(false))
                dispatch(actions.setCheckPassWord(false))
            }else{
                dispatch(actions.setCheckPassWord(true))
            }
        }
    }
    const handleSignOut = ()=>{
        dispatch(actions.admin(false))
        dispatch(actions.setPassWord(''))
        dispatch(actions.setSignIn(false))
        dispatch(actions.setCheckPassWord(false))
        dispatch(actions.setSignOut(false))
        localStorage.removeItem('blogs')
        localStorage.removeItem('mails')
        localStorage.removeItem('categories')
        localStorage.removeItem('uniquekinds')
        localStorage.removeItem('popularBlogs')
        localStorage.removeItem('contacts')
    }
    const handleNoSignOut =()=>{
        dispatch(actions.admin(false))
        dispatch(actions.setPassWord(''))
        dispatch(actions.setSignIn(false))
        dispatch(actions.setCheckPassWord(false))
        dispatch(actions.setSignOut(false))

    }
    const handlePassWord=(e)=>{
        dispatch(actions.setPassWord(e.target.value))
        dispatch(actions.setCheckPassWord(false))
    }
    const handleSubmitPassWord = (e)=>{
        if(e.charCode === 13){
            handleSignIn()
        }
    }
    const ToggleSeePassWord = ()=>{
        dispatch(actions.toggleSeePassWord(!isSeePassWord))
        if(!isSeePassWord){
            inputPass.current.setAttribute('type','text')
        }else{
            inputPass.current.setAttribute('type','password')
        }
    }
    const handleOutSign = ()=>{
        dispatch(actions.setSignIn(false))
        dispatch(actions.setPassWord(''))
        dispatch(actions.toggleSeePassWord(false))

    }
    return (
        <div className='row'>
            <div className='col l-6 m-6 c-12'>
                <div
                    className='about--img'
                >
                </div>
            </div>
            <div className='col l-6 m-6 c-12'>
                <div className='about--info'>
                    <h2 className='about--name mb-24'>I'm  
                        <span 
                            className={admin ? 'about--admin btn' : 'btn'}
                            onClick={()=>dispatch(actions.setSignIn(!signIn))}> Andrea Moore</span>
                        {` a Scotish Blogger & Explorer`}
                    </h2>
                    <p className='about--dct'>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                    {signIn && 
                    <div className='modal dad'
                        style={{
                            border: '1px solid #1eafed',
                            boxShadow: '1px 1px 5px #7cd1f5'
                        }}
                    >
                        <div className='sign-in p-8'>
                            <button 
                                className='child btn btn--out-sign'
                                onClick={handleOutSign}
                                >
                                    &times;
                            </button>
                            <h2 className='mb-24'
                                style={{
                                    color: '#1eafed',
                                    textTransform: 'uppercase'
                                }}
                            >{admin ? 'Sign-out Admin' : 'Welcome to Admin mode'}</h2>

                            <div className='df'
                                style={{
                                    flexDirection: 'column-reverse',
                                }}
                            >
                                <label htmlFor='signin'
                                    className={`mt-12 mb-12 ${checkPassWord ? 'errol shake' : ''}`}
                                >
                                    PassWord is <span ref={pass} >Kietnhn</span>
                                </label>
                                <div className='dad'>
                                    <input
                                        ref={inputPass}
                                        value={password}
                                        placeholder='Enter password....'
                                        onChange={e=>handlePassWord(e)}
                                        onKeyPress={e=>handleSubmitPassWord(e)}
                                        className=''
                                        type='password'
                                        style={{
                                            width: '100%',
                                            padding: '12px 20px 10px',
                                        }}
                                        />
                                        <div className='child sign-password' >
                                            <button 
                                                ref={eye}
                                                className='btn'
                                                onClick={ToggleSeePassWord}    
                                            >
                                                
                                                {isSeePassWord && <FontAwesomeIcon className='password--see' icon={faEyeSlash} /> ||
                                                    <FontAwesomeIcon className='password--see' icon={faEye} />
                                                }
                                            </button>
                                        </div>
                                </div>
                            </div>
                            {signOut && 
                            <div className='p-8'>
                                <h2 className='mb-12'
                                    style={{textAlign: 'center'}}
                                >Do you want to clean your localStorage </h2>
                                <div className='center'>
                                    <button
                                        className='btn sign-btn btn--clear'
                                        onClick={handleSignOut}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className='btn sign-btn btn--clear'
                                        onClick={handleNoSignOut}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>}
                            <div className='center'>
                                <button
                                    className={`btn sign-btn ${password ? 'signing' :  ''}`}
                                    onClick={handleSignIn}
                                    >
                                    {admin ? 'Sign Out' : 'Sign In'}
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            
        </div>
    )
}
export default About