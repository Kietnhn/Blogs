
import { useStore,actions } from '../store'
import { useRef,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faCircleUser, } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass,faPlus,faXmark,faMinus,faExpand,faImages,faVideo,faFilter,faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { initBlogs } from '../store/reducer'
import InfinitySroll from './InfinityScroll'


function Blogs(){
    const [state, dispatch] = useStore()
    
    const { 
        blogs,
        title,
        content,
        img,
        kind,
        create,
        admin,
        search,
        editMode,
        isSmall,
        isScroll,
        kinds,
    } = state
    let {like} = state
    const submit = useRef()
    const divImg = useRef()
    const createBlogToolBtn = useRef()
    // kind
    const kindBtn = useRef()
    const kindSubTag = useRef()
    // useEffect(() => {
    //     window.addEventListener('scroll', ()=>{
    //         if(window.scrollY >= 350){
    //             dispatch(actions.setSroll(true))
    //         }else{
    //             dispatch(actions.setSroll(false))
    //         }
    //     });
    //     return  window.removeEventListener('scroll', ()=>{
    //         if(window.scrollY >= 350){
    //             dispatch(actions.setSroll(true))

    //         }else{
    //             dispatch(actions.setSroll(false))
    //         }
    //     });
    // }, []);


    //Auto growing textarea
    useEffect(()=>{
        const inputTitle = document.querySelector('.input-title');
        const inputContent = document.querySelector('.input-content');
        // console.log(inputTitle);
        if(inputTitle || inputContent){
            inputTitle.addEventListener('keydown', autosize);
            inputContent.addEventListener('keydown', autosizeContent);
        }
                    
        function autosize(){
            let el = this;
            setTimeout(function(){
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + (el.scrollHeight ) + 'px';
            },0);
        }
        function autosizeContent(){
            let el = this;
            // console.log(el.scrollHeight);
            setTimeout(function(){
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + (76 + el.scrollHeight ) + 'px';
            },0);
        }
        return ()=>{
            if(inputTitle || inputContent){
                inputTitle.removeEventListener('keydown', autosize);
                inputContent.removeEventListener('keydown', autosizeContent);
            }
        }
    },[title,content])
    // Check create valid blog
    useEffect(()=>{
        // console.log(submit);
        if(title.trim() && content.trim() ){
            if(submit.current){
                submit.current.classList.add('validBlog')
            }
        }else{
            if(submit.current){
                submit.current.classList.contains('validBlog') && submit.current.classList.remove('validBlog')
            }
        }
    },[title,content])

    const handleBlogImg=(e)=>{
        const file = e.target.files[0]
        file.blogImg = URL.createObjectURL(file)
        dispatch(actions.setImg(file.blogImg))
    }

    // const handleSelect = ()=>{
    //     dispatch(actions.setKind(selected.current.options[selected.current.selectedIndex].value))
    // }
    const handleSetKind=(index)=>{
        const toolBtnKind = document.querySelector('.create-blog__tool-btn--kind')
        // if seted kind 
        if(kind === kinds[index]){
            dispatch(actions.setKind(''))
            toolBtnKind.classList.remove('isHas')
        }else{
            dispatch(actions.setKind(kinds[index]))
            toolBtnKind.classList.add('isHas')
        }
        handleFadeInKinds()
    }
    const handleFadeInKinds =()=>{
        if(kindBtn.current.classList.contains('dn')){
            kindBtn.current.classList.remove('dn')
        }else{
            kindBtn.current.classList.add('dn')
        }
    }
    const handleUserDontSetKind = ()=>{
        let t =0,f = 0,l =0;

        if(title.includes('travel') 
            || title.includes('airport') 
            || title.includes('check') 
            || title.includes('fly') 
            || title.includes('hotel') 
            || title.includes('journey') 
            || title.includes('Travel') 
            || title.includes('tourist') 
            || title.includes('trip') 
            || title.includes('camp')){
                t++
        }
        if(title.includes('food') 
            || title.includes('eat') 
            || title.includes('drink') 
            || title.includes('fruit') 
            || title.includes('vegetable') 
            || title.includes('meet') 
            || title.includes('Food') 
            || title.includes('fish') 
            || title.includes('healthy') 
            || title.includes('milk')){
                f++
        }
        if(title.includes('life') 
            || title.includes('hi') 
            || title.includes('hello') 
            || title.includes('name') 
            || title.includes('age') 
            || title.includes('old') 
            || title.includes('Life') 
            || title.includes('young') 
            || title.includes('child') 
            || title.includes('I')){
                l++
        }
        console.log('travel ',t,' food ',f,' life ',l);
        if(t === f && t=== l){
            t = 0
            f = 0
            l = 0
        }else if(t === f && t > l){
            t++
        }else if(t === l && t > f){
            f++
        }else if(l === f && l > t){
            l++
        }
        const max = Math.max(t, f, l);
        if(t === max){
            dispatch(actions.setKind('Travel'))
        }else if(f === max){
            dispatch(actions.setKind('Food'))
        }else if(l === max){
            dispatch(actions.setKind('Life'))
        }else if(max === 0){
            dispatch(actions.setKind('Another'))
        }
    }
    const handleSubmit = ()=>{
        //if don have kind
        if(!kind){
            handleUserDontSetKind()
        }
        if(title.trim() && content.trim() ){
            dispatch(actions.setBlogs({
                img,
                title,
                content,
                like,
                kind,
            }))
            dispatch(actions.setTitle(''))
            dispatch(actions.setContent(''))
            dispatch(actions.setImg('https://suamacbook.com/sites/images/default_images/image-default.jpg'))
            dispatch(actions.setKind(''))
            dispatch(actions.setCrateBlog(false))
        }
        
    }

    const handleSearch =()=>{
        const preBlogs = JSON.parse(localStorage.getItem('blogs')) ?? initBlogs
        if(isScroll){
            dispatch(actions.setSroll(false))

        }else{
            if(search){
                const find = preBlogs.filter(blog=>blog.title.includes(search)||blog.kind.includes(search))
                dispatch(actions.getSearch(find)) 
                dispatch(actions.setSearched(true)) 
            }else{
                handleOutSearch()
            }
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
    const handleEditMode = ()=>{
        dispatch(actions.setEditMode(!editMode))
        dispatch(actions.setDeleteMode(undefined))
        dispatch(actions.setEditIndex(undefined))
    }
  
    const handleType = ()=>{
        const navItems = document.querySelectorAll('.nav-item')
        const About = document.getElementById('About')
        Array.from(navItems).forEach(item=>{
          item.classList.remove('choosen')
        })
        About.parentElement.classList.add('choosen')
        dispatch(actions.setType('About'))
      }
    const handleStopPropagation = (e)=>{
        e.stopPropagation()
    }
    const handleCloseCreateBlog = ()=>{
        if(title)dispatch(actions.setTitle(''))
        if(content)dispatch(actions.setContent(''))
        if(kind)dispatch(actions.setKind(''))
        dispatch(actions.setCrateBlog(false))
        dispatch(actions.setSmallCreateBlog(false))
    }
    // khi chon vao 'them hinh anh vao blog
    const handleCreateBLogImg = ()=>{
        const createBlog = document.querySelector('.create-blog')
        const createBlogContent = document.querySelector('.create-blog__content')
        if(divImg.current.classList.contains('dn')){
            createBlog.style.height = '550px'
            createBlogContent.style.height = '300px'
            divImg.current.classList.remove('dn')
            createBlogToolBtn.current.classList.add('isHas')
        }else{
            createBlog.style.height = 'unset'
            createBlogContent.style.height = 'unset'
            divImg.current.classList.add('dn')
            createBlogToolBtn.current.classList.remove('isHas')

        }
    }
    return(
        <div className='row '>
            <div className="col l-12">
                {create && 
                <div 
                    onClick={()=>dispatch(actions.setCrateBlog(false))}
                    className={isSmall && 'create-blog-modal small-modal' || 'create-blog-modal' }
                >
                    <div    
                        onClick={e=>handleStopPropagation(e)}
                        className= {isSmall && 'create-blog small' || 'create-blog'}
                    >
                        
                        <div className='create-blog__title'>
                            <h2>New Blog</h2>
                        </div>
                        <div className='create-blog__btns'>
                            <button
                                onClick={()=>dispatch(actions.setSmallCreateBlog(!isSmall))}
                                className='create-blog__btn create-blog__btn--minus'>
                                <FontAwesomeIcon className='create-blog__icon' icon={isSmall && faExpand || faMinus} />
                            </button>
                            <button 
                                className='create-blog__btn'
                                onClick={handleCloseCreateBlog}>
                                <FontAwesomeIcon className='create-blog__icon' icon={faXmark} />
                            </button>
                        </div>
                        <div 
                            className='create-blog__content mb-24'
                            style={isSmall && {height: '100px !important',} || {}}
                            >
                            
                            <div className='input-wrap  mt-24'>
                                <div className='form-field'>
                                    <textarea
                                        rows = "1" 
                                        // cols = "50" 
                                        className='input-title form-input'
                                        value={title}
                                        placeholder=' '
                                        onChange={e=>dispatch(actions.setTitle(e.target.value))}
                                        />
                                        <label
                                            htmlFor='title'
                                            className='form-label'
                                        >
                                            Title
                                        </label>
                                </div>
                                    
                                {/* {!isSmall && <div>
                                    <label htmlFor="kind">Choose a kind:</label>
                                    <select 
                                        onBlur={handleSelect}
                                        ref={selected}
                                        name="kind" id="kind"
                                        className='input-kind'
                                        >
                                        <option value="">--Choose a kind--</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Food">Food</option>
                                        <option value="Life">Life</option>
                                        <option value="Another">Another</option>
                                    </select>
                                    
                                </div>} */}
                            </div>
                            <div>
                                <div className=' mt-24 mb-24'>
                                    <div className='form-field form-field--content'>
                                        <textarea
                                            className='input-content '
                                            rows = "3" 
                                            value={content}
                                            placeholder='Content'
                                            onChange={(e)=>dispatch(actions.setContent(e.target.value))}
                                        />
                                         {/* <label
                                            htmlFor='content'
                                            className='form-label'
                                        >
                                            Content
                                        </label> */}
                                    </div>
                                </div>
                            </div>
                            {!isSmall && <div className='dn' ref={divImg}>
                                <input
                                    className='input-file'
                                    type='file'
                                    id='img'
                                    style={{display: 'none'}}
                                    onChange={handleBlogImg}
                                />
                                <label htmlFor='img'>
                                    <div  className='create-blog__avatar'>
                                        <div
                                            style={{backgroundImage: `url(${img})`}}
                                            className='create-blog__img sub-bg'
                                        >
                                        </div>

                                        <div
                                            className='create-blog__img--hover'
                                            >
                                            <FontAwesomeIcon
                                                className='create-blog__img--hover-icon'
                                                icon={faPlus} />
                                        </div>
                                    </div>
                                </label>
                            </div>}
                        </div>
                        <div className='create-blog__tools mb-12'>
                            <div className='space-between create-blog__tools-wrap'>
                                <h3>Add to blog</h3>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}>
                                    <div className=' center tool-icon'>
                                        <button  
                                            className='create-blog__tool-btn'
                                            onClick={handleCreateBLogImg}
                                            ref={createBlogToolBtn}
                                            >
                                            <FontAwesomeIcon className='create-blog__tool-icon' icon={faImages} />
                                        <span className="sub-tag">Add image</span>
                                        </button>
                                    </div>
                                    <div className=' center tool-icon' >
                                        <button  className='create-blog__tool-btn not-allowed'>
                                            <FontAwesomeIcon className='create-blog__tool-icon' icon={faVideo} />
                                        <span className="sub-tag">Comming soon</span>
                                        </button>
                                    </div>
                                    <div className=' center tool-icon'>
                                        <button  
                                            className='create-blog__tool-btn create-blog__tool-btn--kind'
                                            onClick={handleFadeInKinds}
                                        >
                                            <FontAwesomeIcon className='create-blog__tool-icon' icon={faFilter} />
                                        </button>
                                        <span className="sub-tag" ref={kindSubTag}>Set kind</span>
                                        <div className='create-blog__kind dn' ref={kindBtn}>
                                            <ul>
                                                {kinds.map((k,index)=>(
                                                    <li key={k} 
                                                        className={`space-between ${k+'--sub'} btn`}
                                                        onClick={()=>handleSetKind(index)}
                                                    >
                                                        <h5 className={`create-blog__Name ${kind === kinds[index] && `${k.toLowerCase()}`}`}>{k}
                                                            <span className={`create-blog__Name--foot ${k}`}></span>
                                                        </h5>
                                                        <div className={`circle--c ${k} op-8`}>

                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className=' center'>
                                        <button  className='create-blog__tool-btn'>
                                            <FontAwesomeIcon className='create-blog__tool-icon' icon={faEllipsis} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!isSmall && 
                        <div className=''>
                            <button
                                ref={submit}
                                className='create-blog__submit-btn'
                                onClick={handleSubmit}
                            >Submit
                            </button>
                        </div>}
                    </div>
                </div>}
                {blogs && 
                <div className='main bg-light'>   
                    <div className={`tools mb-24 ${isScroll && 'isScroll' || ''}`}>
                        <div className=' tool__search'>
                            <div className='search-wrap tool_search-wrap'>
                                <input
                                    value={search}
                                    placeholder='Type a keyword and hit enter'
                                    onChange={e=>dispatch(actions.setSearch(e.target.value))}
                                    onKeyPress={e=>handleSearching(e)}
                                    className='search--input tool_search--input'
                                />
                                <button 
                                    className='search--btn tool_search--btn'
                                    onClick={handleSearch}
                                ><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                            </div>
                        </div>
                        {admin && 
                        <div className='ad-tools'>
                            <div className='ad-tools--wrap'>
                                <div className='tool__create-blog tool-icon'>
                                    <button
                                        className={`tool__create-blog--btn tool-icon--btn ${create && 'used'}`}
                                        onClick={()=>dispatch(actions.setCrateBlog(!create))}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                    <span className="sub-tag">New Blogs</span>
                                </div>
                                <div className='tool__edit-blog tool-icon'>
                                    <button 
                                        onClick={handleEditMode}
                                        className={`tool__edit-blog--btn tool-icon--btn btn ${editMode && 'used'}`}>    
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <span className="sub-tag">Edit Mode</span>
                                </div>
                                <div className='tool__ad-avatar tool-icon'>
                                    <button 
                                        className='tool__ad-avata--img tool-icon--btn' 
                                        onClick={handleType}
                                    >
                                        <FontAwesomeIcon icon={faCircleUser} />
                                    </button>
                                    <span className="sub-tag">About</span>
                                </div>
                            </div>
                        </div>}
                    </div> 
                    <div className='blogs' id='blogs'>
                        <InfinitySroll/>
                    </div>
                </div>}
            </div>
        
    </div>
    )
}
export default Blogs