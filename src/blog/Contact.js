import { useStore,actions } from '../store'
import { useRef,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
function Contact(){
    const [state, dispatch] = useStore()
    const { contactName,contactEmail,contactSubject,contactMessage, } = state
    const ref = useRef()
    const rowRef = useRef()
    useEffect(()=>{
        const message = document.querySelector('.input-message')
        // console.log(inputTitle);
        if(message){
            message.addEventListener('keydown', autosize);
        }
                    
        function autosize(){
            let el = this;
            setTimeout(function(){
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + (el.scrollHeight ) + 'px';
            },0);
        }
       
        return ()=>{
            if(message){
                message.removeEventListener('keydown', autosize);
            }
        }
    },[contactMessage])
    const handleSubmitContact = ()=>{
        dispatch(actions.setContacts({
            name: contactName,
            email: contactEmail,
            subject: contactSubject,
            message: contactMessage,
        }))
        dispatch(actions.setContactName(''))
        dispatch(actions.setContactEmail(''))
        dispatch(actions.setContactSubject(''))
        dispatch(actions.setContactMessage(''))
        ref.current.focus()
    }
    const handleSwitch = ()=>{
        if(rowRef.current.classList.contains('row-r')){
            rowRef.current.classList.remove('row-r')
        }else{
            rowRef.current.classList.add('row-r')
        }
    }
    return (
        <div className = 'row'>
            <div className='col l-12 m-12 c-12'>
                <div className='contact-info p-24'>
                    <h1 className='contact-info-title'>Contact Information</h1>
                    <div className='mb-48 tm-mb-24'>
                        <div className='row '>
                            <div className='col l-3 m-12 c-12 tm-mb-24'>
                                <div className='p-24 bg-light'>
                                    <p className='contact-info-item'>
                                        <span>Address: </span>
                                        198 West 21th Street, Suite 721 New York NY 10016
                                    </p>
                                </div>
                            </div>
                            <div className='col l-3 m-12 c-12 tm-mb-24'>
                                <div className='p-24 bg-light'>
                                    <p className='contact-info-item'>
                                        <span>Phone: </span>
                                        + 1235 2355 98
                                    </p>
                                </div>
                            </div>
                            <div className='col l-3 m-12 c-12 tm-mb-24'>
                                <div className='p-24 bg-light'>
                                    <p className='contact-info-item'>
                                        <span>Email: </span>
                                         info@yoursite.com
                                    </p>
                                </div>
                            </div>
                            <div className='col l-3 m-12 c-12 tm-mb-24'>
                                <div className='p-24 bg-light'>
                                    <p className='contact-info-item'>
                                        <span>Website: </span>
                                        yoursite.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-48 tm-mb-24'>
                        <div className='row dad tm-col-r' ref={rowRef}>
                            <div className='child contact__switch hide-on-m-t'>
                                <div className='bd-light contact__switch-wrap'>
                                    <button className='btn p-btn' onClick={handleSwitch}>
                                        <FontAwesomeIcon className='contact__switch-btn' icon={faArrowRightArrowLeft} />
                                    </button>
                                </div>
                            </div>
                            <div className='col l-6 m-12 c-12'>
                                <div className='contact-form p-48 tm-p-24 bd-light'>
                                    <div className='form-field mb-24'>
                                            <input
                                                    ref={ref}
                                                    value={contactName}
                                                    onChange={e=>dispatch(actions.setContactName(e.target.value))}
                                                    placeholder=' '
                                                    className='contact-form-input form-input'
                                                />
                                            <label
                                                htmlFor='title'
                                                className='form-label'
                                            >
                                                Name
                                            </label>
                                    </div>
                                    
                                    <div className='form-field mb-24'>
                                            <input
                                                    value={contactEmail}
                                                    onChange={e=>dispatch(actions.setContactEmail(e.target.value))}
                                                    placeholder=' '
                                                    className='contact-form-input form-input'
                                                />
                                            <label
                                                htmlFor='title'
                                                className='form-label'
                                            >
                                                Email
                                            </label>
                                    </div>
                                    <div className='form-field mb-24'>
                                            <input
                                                    value={contactSubject}
                                                    onChange={e=>dispatch(actions.setContactSubject(e.target.value))}
                                                    placeholder=' '
                                                    className='contact-form-input form-input'
                                                />
                                            <label
                                                htmlFor='title'
                                                className='form-label'
                                            >
                                                Subject
                                            </label>
                                    </div>
                                    <div className='form-field mb-24'>
                                            <textarea
                                                    value={contactMessage}
                                                    onChange={e=>dispatch(actions.setContactMessage(e.target.value))}
                                                    rows='1'
                                                    placeholder=' '
                                                    className='contact-form-input input-message form-input'
                                                />
                                            <label
                                                htmlFor='title'
                                                className='form-label'
                                            >
                                                Message
                                            </label>
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleSubmitContact}
                                            className='contact-from-submit btn'
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='col l-6 m-12 tm-mb-12 hide-on-mb'>
                                <div className='contact-img sub-bg'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact