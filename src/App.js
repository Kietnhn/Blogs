import './assets/css/Grid.css';
import './assets/css/App.css';
import './assets/css/Responsive.css';
import { useEffect,useCallback,memo,useRef } from 'react';
import Left from './blog/Left';
import { useStore,actions } from './store'
import About from './blog/About';
import Blogs from './blog/Blogs';
import Contact from './blog/Contact';
import Home from './blog/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons'
const navs = [
  {
    id: 1,
    title: 'Home',
  },
  {
    id: 2,
    title: 'Blogs',
  },
  {
    id: 3,
    title: 'About',
  },
  {
    id: 4,
    title: 'Contact',
  }
]

function App() {

  const [state, dispatch] = useStore()
  const { Type,isFadeBars } = state
  const rowBars = useRef()
  const nav = useRef()
  const content = useRef()
  // First
  useEffect(()=>{
    //Lay nav-item dau tien: home
    const home = document.querySelector('.nav-item')
    home.classList.add('choosen')
  },[])
  useEffect(()=>{
    //Lay nav-item dau tien: home
    window.addEventListener('scroll',handleFadeOutBars)
    return ()=> window.removeEventListener('scroll',handleFadeOutBars)
  },[])
  const handleType = (e)=>{
    const navLinks = document.querySelectorAll('.nav-item')
    
    Array.from(navLinks).forEach(nL=>{
      nL.classList.remove('choosen')
    })
    // console.log(e.target.parentElement)
    e.target.parentElement.classList.add('choosen')

    dispatch(actions.setType(e.target.innerText))
    handleFadeOutBars()
  }

  const handleFadeInBars = ()=>{
    rowBars.current.classList.add('row-m')
    nav.current.classList.add('fade-in-bars')
    content.current.classList.add('m-o-5')
    if(Type === 'Home'){
      const main = document.querySelector('.main')
      main && main.classList.remove('p-48-0')
    }
    dispatch(actions.TBsetFadeBars(true))
  }
  const handleFadeOutBars = ()=>{
    rowBars.current.classList.remove('row-m')
    nav.current.classList.remove('fade-in-bars')
    content.current.classList.remove('m-o-5')
    if(Type === 'Home'){
      const main = document.querySelector('.main')
      main && main.classList.remove('p-48-0')
    }
    dispatch(actions.TBsetFadeBars(false))
  }

  const RenderType = useCallback(()=>{
    if(Type === 'Home')return <Home/>
    else if(Type === 'Blogs')return <Blogs/>
    else if(Type === 'About')return <About/>
    else if(Type === 'Contact')return <Contact/>
  },[Type])
  return (
    <div className="App">
      <div className='grid'>
            {!isFadeBars && <span 
              className='hide-on-pc tm-bars' 
              onClick={handleFadeInBars}
            >
              <FontAwesomeIcon icon={faBars} className='tm-bars__icon'/>
            </span>}
        <div className='row' ref={rowBars}>
            <div className='nav col l-3 m-5 c-12' ref={nav}>
                {isFadeBars && 
                <span 
                  className='hide-on-pc tm-bars tm-bars--close' 
                  onClick={handleFadeOutBars}
                >
                  <FontAwesomeIcon icon={faXmark} className='tm-bars__icon' />
                </span>}
                <ul className='nav-list'>
                    {navs.map(nav=>(
                      <li className='nav-item' key={nav.id}>
                        <button 
                          id={nav.title}
                          className='nav-link btn'
                          onClick={e=>handleType(e)}>
                          {nav.title}
                        </button>
                      </li>
                    ))}
                </ul>
              <Left/>
            </div>
            <div className="Content col l-o-3 l-9 m-12 c-12" ref={content}>
                  {Type && <RenderType/>}
            </div>
        </div>
      </div>
    </div>
  );
}

export default memo(App);
