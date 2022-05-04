
import { useStore,actions } from '../store'
import React, { useEffect,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder,faHeart } from '@fortawesome/free-regular-svg-icons'
import { faChevronRight,faMagnifyingGlass,faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { initBlogs } from '../store/reducer'
import { compareValues } from '../store/hooks'
import { BrowserRouter, Route, Link } from 'react-router-dom'
function Home(){
    const [state, dispatch] = useStore()
    const { 
        blogs,
        homeMail,
        confirmHomeMail,
        search,
        category,
        uniquekinds,
        popularBlogs,
        searched,
        isFadeBars,
    } = state
    const email = useRef()
    const headPage = useRef()
    const pages = blogs.length / 2; 

    useEffect(() => {
        const backTop = document.querySelector('.back-to-top')
        // console.log(backTop);
        const setBackToTop = ()=>{
            if (window.scrollY >= 450 ) {
                // console.log(window.scrollY);
                backTop.classList.add('is-fade')
            }else{
                if(backTop.classList.contains('is-fade')){
                    backTop.classList.remove('is-fade')
                }
            }
        }
        window.addEventListener('scroll',setBackToTop );
        return ()=>window.removeEventListener('scroll',setBackToTop)
    }, []);
    useEffect(()=>{
        const preBlogs = JSON.parse(localStorage.getItem('blogs')) ?? initBlogs
        dispatch(actions.uniqueKinds([...new Set(preBlogs.map(blog=>blog.kind))].filter((u => u!== undefined))))
        dispatch(actions.setCategory(([...new Set(preBlogs.map(blog=>blog.kind))].filter((u => u!== undefined))).map((u)=>{
            const length =  preBlogs.filter(blog => {
                return  u === blog.kind
            });
            return length.length
        })))
    },[blogs])
    useEffect(()=>{
        const preBlogs = JSON.parse(localStorage.getItem('blogs')) ?? initBlogs
        const populars = preBlogs.sort(compareValues('like','desc'))
        dispatch(actions.setPopularBlogs(populars))
    },[])
    const handleSearch =()=>{
        const preBlogs = JSON.parse(localStorage.getItem('blogs')) ?? initBlogs
        if(search){
            const find = preBlogs.filter(blog=>blog.title.includes(search)||blog.kind.includes(search))
            dispatch(actions.getSearch(find)) 
            dispatch(actions.setSearched(true)) 
        }else{
            handleOutSearch()
        }
    }
    const handleSearching = (e)=>{
        if(e.charCode === 13){
            handleSearch()
        }
    }
    const handleOutSearch = ()=>{
        const oldBlogs = JSON.parse(localStorage.getItem('blogs')) ?? initBlogs
        dispatch(actions.getSearch(oldBlogs)) 
        dispatch(actions.setSearch(''))
        dispatch(actions.setSearched(false)) 
    }
    const handleCategary = (e)=>{
        const preBlogs = JSON.parse(localStorage.getItem('blogs')) ?? initBlogs
        dispatch(actions.setSearch(e.target.innerText.split('\n')[0])) 
        let find = preBlogs.filter(blog=>blog.kind.includes(e.target.innerText.split('\n')[0]))
        if(find.length === 0){
            // console.log(e.target.parentElement.innerText.split('\n')[0]);
            dispatch(actions.setSearch(e.target.parentElement.innerText.split('\n')[0])) 
            find = preBlogs.filter(blog=>blog.kind.includes(e.target.parentElement.innerText.split('\n')[0]))

        }
        dispatch(actions.getSearch(find)) 
        dispatch(actions.setSearched(true)) 

    }
    const handleHomeMail = (e)=>{
        dispatch(actions.setHomeMail(e.target.value))
        dispatch(actions.setConfirmHomeMail(false))
    }
    const SubmitMail = ()=>{
        const corect = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if(corect.test(homeMail)){
            dispatch(actions.setMails(homeMail))
            dispatch(actions.setConfirmHomeMail(false))
            email.current.focus()
        }else{
            dispatch(actions.setConfirmHomeMail(true))
            console.log("Error: Invalid Email");
        }
    }
    const handleBackToTop = ()=>{
        headPage.current.scrollIntoView()
    }


    
    // List Page
    useEffect(()=>{
        const firstPage = document.querySelector('.page-number')
        if(firstPage)
            firstPage.classList.add('active')
    },[])
    const handlePage=(index)=>{
        const pageNumbers = document.querySelectorAll('.page-number')
        Array.from(pageNumbers).forEach((pageNumber)=>{
                if(pageNumber.classList.contains('active')){
                        pageNumber.classList.remove('active')
                    }
                })
        pageNumbers[index].classList.add('active')

    }
    const handlePrevPage=()=>{
        const isActive = document.querySelector('.page-number.active')
        if(isActive.innerText == 1){
            handlePage(pages-1)
        }else{
            handlePage(isActive.innerText-2)
        }

        // 1 is active so -2 to prev
        // console.log(isActive.innerText-2);
    }
    const handleNextPage=()=>{
        const isActive = document.querySelector('.page-number.active')
        if(isActive.innerText == pages){
            handlePage(0)
        }else{
            handlePage(isActive.innerText)
        }
    }

    return (
        <div className='row'>
            <div className="col l-8 m-12 c-12">
                {blogs && 
                <div className={`main`} ref={headPage}>   
                    {searched && <div>
                        <h2
                            className='out-search btn'
                            onClick={handleOutSearch}
                        >
                            &lt; {search}
                        </h2>
                    </div>}
                    <div className='blogs' >
                        {blogs.map((blog,index)=>(
                            index < 10 &&
                            (<div 
                                className='blog-item' 
                                key={`${blog.title} ${index}`}
                                >
                                <div  className='blog-item__avatar m-mb-24'>
                                    <img
                                        src={blog.img}
                                        alt={blog.title}
                                        className='blog-item__img'
                                    />
                                </div>
                                <div className='blog-item__info'>
                                    <h2 className='blog-item__title'>{blog.title}</h2>
                                    <div className='blog-item__sub--title'>
                                        <span className='blog-item__kind'>
                                            <FontAwesomeIcon className='blog-item__kind--icon' icon={faFolder} />
                                            {blog.kind}
                                            </span>
                                    </div>
                                    <p className='blog-item__dct mb-24'>{blog.content}</p>
                                    <p>
                                        <button className='blog-item__read-more--btn'>Read more
                                            <FontAwesomeIcon className='blog-item__read-more--btn--icon' icon={faChevronRight} />
                                            <span className="sub-tag">Comming soon</span>   
                                        </button>

                                    </p>
                                </div>
                            </div>)
                        ))}
                    </div>
                    <ul className='page-numbers'>
                        <button 
                            onClick={handlePrevPage}
                            className='page-btn'>
                            &lt;
                        </button>
                        {blogs.map((blog,index)=>(
                            index < pages &&  <li key={index+1}>
                                <button 
                                    className='page-btn page-number'
                                    onClick={()=>handlePage(index)}
                                    >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <button 
                            onClick={handleNextPage}
                            className='page-btn btn'>
                            &gt;
                        </button>
                    </ul>
                </div>}
            </div>
            
            <div className="col l-4 m-12 c-12">
                <div className='sub'>
                    <div className='search sub-item' >
                        <div className='search-wrap'>
                            <input
                                value={search}
                                placeholder='Type a keyword and hit enter'
                                onChange={e=>dispatch(actions.setSearch(e.target.value))}
                                onKeyPress={e=>handleSearching(e)}
                                className='search--input'
                            />
                            <button 
                                className='search--btn btn'
                                onClick={handleSearch}
                            ><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                        </div>
                    </div> 
                    <div className='categaries sub-item'>
                        <h2 className='sub--title'>Categaries</h2>
                        <ul>
                           {uniquekinds.map((uniquekind,index)=>
                            <li 
                                key={index}
                                className='categary-item btn black'
                                onClick={(e)=>handleCategary(e)}
                            >
                                <span
                                    className='categary'
                                >
                                    {uniquekind}
                                </span>
                                <span className='categary--length'>
                                    {`(${category[index]})`}
                                </span>
                            </li>)} 
                        </ul>
                    </div>
                    <div className='popular sub-item'>
                        <h2 className='sub--title'>Popular Articles</h2>
                        <div className='populars'>
                            {popularBlogs.map((popularBlog,index)=>(
                                index < 4 && 
                                <div className='popularBlog-item mb-24' key={`${index} ${popularBlog.title}`}>
                                    <div  className='popularBlog-item__avatar'>
                                        <img
                                            src={popularBlog.img}
                                            alt={popularBlog.title}
                                            className='popularBlog-item__img'
                                        />
                                    </div>
                                    <div className='popularBlog-item__info'>
                                        <h2 className='popularBlog-item__title'>{popularBlog.title}</h2>
                                        <div className='popularBlog-item__sub--title'>
                                            <span className='popularBlog-item--icons'>
                                                <FontAwesomeIcon className='popularBlog-item__kind--icon popularBlog-item--icon' icon={faFolder} />
                                                {popularBlog.kind}
                                            </span>
                                            <span 
                                                className='popularBlog-item--icons'
                                            >
                                                <FontAwesomeIcon className='popularBlog-item__tym--icon popularBlog-item--icon' icon={faHeart} />
                                                {popularBlog.like}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="contact-home-mail sub-item">
                        <div className='overlay'></div>
                        <div className='contact-wrap'>
                            <h2 className='sub--title contact-title mb-24'>Newsletter</h2>
                            <p className='contact-dct mb-24'>Far far away, behind the word mountains, far from the countries Vokalia</p>
                            <div className='contact__home-mail'>
                                <input
                                    ref={email}
                                    value={homeMail}
                                    onChange={(e)=>handleHomeMail(e)}
                                    placeholder='Email Address'
                                    className='contact__home-mail--input'
                                />
                                <button
                                    className='contact__home-mail--btn btn'
                                    onClick={SubmitMail}
                                >
                                    Subscribe
                                </button>
                                {confirmHomeMail && <span>Invalid Email</span>}
                            </div>
                        </div>
                    </div>
                    <div className="paragrap sub-item">
                        <div className='paragrap-wrap'>
                            <h2 className='sub--title'>Paragraph</h2>
                            <p className='paragrap-dct'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='back-to-top'>
                {/* <Link
                    to='../index.js'
                > */}
                    <button 
                        onClick={handleBackToTop}
                        className='back-to-top__btn btn'>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                {/* </Link> */}
            </div>

        </div>
    )
}
export default Home