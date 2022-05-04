import { useStore,actions } from '../store'
import { useEffect,useRef,useCallback,memo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder,faHeart, } from '@fortawesome/free-regular-svg-icons'
import { faChevronRight,faPen,faTrash,faEye, faFloppyDisk,faHeart as faHearted} from '@fortawesome/free-solid-svg-icons'
import { faCircleUser,faUserAstronaut, faUserNinja,faRobot,faUserDoctor,faUserTie,faUserNurse,faDog,faCat,faBurger,faCarrot,faAppleWhole} from '@fortawesome/free-solid-svg-icons'

import { compareValues } from '../store/hooks'
import { initBlogs } from '../store/reducer'

function InfinitySroll(){
    const [state, dispatch] = useStore()
    const { 
        blogs,
        infinityBlogs,
        editMode,
        editIndex,
        deleteMode,
        searched,
        title,
        content,
        editImgLink,
        toggleEditTitle,
        // users,
        } = state
    const titleRef = useRef();

    const [users,setUsers] = useState(()=>{
        const userArr = [faCircleUser,faUserAstronaut,faUserNinja,faRobot,faUserDoctor,faUserTie,faUserNurse,faDog,faCat,faBurger,faCarrot,faAppleWhole].sort(() => Math.random() - 0.5)
        return userArr
    })
    useEffect(()=>{
        const inputTitle = document.querySelector('.input-title');
        const inputContent = document.querySelector('.input-content');
        // console.log(inputTitle);
        if(inputTitle){
            inputTitle.addEventListener('keydown', autosize);
            inputContent.addEventListener('keydown', autosize);
        }
                    
        function autosize(){
            let el = this;
            setTimeout(function(){
                el.style.cssText = 'height:auto; padding:0';
                el.style.cssText = 'height:' + (el.scrollHeight ) + 'px';
            },0);
        }
 
        return ()=>{
            if(inputTitle){
                inputTitle.removeEventListener('keydown', autosize);
                inputContent.removeEventListener('keydown', autosize);
            }
        }
    },[])
        // console.log(Math.floor(Math.random()*(users.length)));
    // useEffect(() => {
    //     const list = document.getElementById('blogs')
    //         // list has auto height  
    //     window.addEventListener('scroll', () => {
    //         if (window.scrollY + window.innerHeight === list.clientHeight + 2*list.offsetTop) {
    //             if(!searched){
    //                 dispatch(actions.setBlogs(blogs[Math.floor(Math.random() * blogs.length)]))
    //             }
    //             //  console.log(blogs[Math.floor(Math.random() * blogs.length)]);
    //         }
    //     });
    //     return  window.removeEventListener('scroll', () => {
    //         if (window.scrollY + window.innerHeight === list.clientHeight + 2*list.offsetTop) {
    //             if(!searched){
    //                 dispatch(actions.setBlogs(blogs[Math.floor(Math.random() * blogs.length)]))
    //             }
    //             // console.log(blogs[Math.floor(Math.random() * blogs.length)]);

    //         }
    //     });
    // }, []);
    
    // useEffect(() => {
    //     const list = document.getElementById('blogs');
    //     if(list.clientHeight <= window.innerHeight && list.clientHeight) {
    //         if(!searched)
    //                 dispatch(actions.setBlogs(blogs[Math.floor(Math.random() * blogs.length)]))

    //     }
    // }, [infinityBlogs]);
    const handleDeleteBlog = (index)=>{
        dispatch(actions.setDeleteBlog(index))
        dispatch(actions.setDeleteMode(undefined))

    }
    const handleLike = (index)=>{
        dispatch(actions.setLike(index))
        const preBlogs = JSON.parse(localStorage.getItem('blogs')) ?? initBlogs
        const populars = preBlogs.sort(compareValues('like','desc'))
        dispatch(actions.setPopularBlogs(populars))
    }
    const handleDisLike = (index)=>{
        dispatch(actions.setDisLike(index))
        const preBlogs = JSON.parse(localStorage.getItem('blogs')) ?? initBlogs
        const populars = preBlogs.sort(compareValues('like','desc'))
        dispatch(actions.setPopularBlogs(populars))
    }
    //EDIT
    const handleEditImg=(e)=>{
        const file = e.target.files[0]
        file.blogImg = URL.createObjectURL(file)
        dispatch(actions.setEditImg(file.blogImg))
    }
    // const handleEditImgLink = () => {
    //     dispatch(actions.setEditImg(file.blogImg))
    // }
    const handleEdit = (index)=>{
        dispatch(actions.setEditIndex(index));
        const titleChange = blogs[index].title
        const contentChange = blogs[index].content
        dispatch(actions.setTitle(titleChange))
        dispatch(actions.setContent(contentChange))
    }

    // const handleEditTitle = ()=>{
    //     // dispatch(actions.setTitle(blogs[editIndex].title))
    //     // dispatch(actions.toggleEditTitle(true))
    // }

    const handleEdited=()=>{
        dispatch(actions.setEditTitle(title.trim()))
        dispatch(actions.setEditContent(content.trim()))
        dispatch(actions.setEditIndex(undefined));

    }
    return (
        <>
            {blogs.map((blog,index)=>(
                <div className='blog-item Blog-item' key={`${blog.title} ${index}`}>
                    {editMode && <div className='blog-item__tool'>
                        {deleteMode === undefined && <button
                            className='blog-item__tool-btn tool-icon'
                            onClick={(()=>dispatch(actions.setDeleteMode(index)))}
                        >
                            <FontAwesomeIcon 
                                    className='blog-item__tool-icon'
                                    icon={faTrash} />
                                <span className="sub-tag">Delete blog</span>
                        </button>}
                        <button
                            className={`blog-item__tool-btn tool-icon ${editIndex === index && 'dn'}`}
                            onClick={()=>handleEdit(index)}
                        >
                            <FontAwesomeIcon 
                                className='blog-item__tool-icon'
                                icon={faPen} />
                                <span className="sub-tag">Edit blog</span>
                        </button>
                        <button
                            className={`blog-item__tool-btn btn tool-icon ${editIndex !== index && 'dn'}`}
                            onClick={handleEdited}
                        >
                            <FontAwesomeIcon 
                                className='blog-item__tool-icon'
                                icon={faFloppyDisk} />
                            <span className="sub-tag">Save edit</span>
                        </button>
                    </div>}
                    {deleteMode === index && editMode && <div className='confirm-delete'>
                        <p>Do you want to delete this blog ?</p>
                        <div>
                            <button
                                className='confirm-delete-btn btn'
                                onClick={()=>handleDeleteBlog(index)}
                            >Yes</button>
                            <button
                                className='confirm-delete-btn btn'
                                onClick={()=>dispatch(actions.setDeleteMode(undefined))}
                            >No</button>
                        </div>
                    </div>}
                    <div className='row'>
                        <div className='author mb-12 hide-on-pc'>
                            <span className="center">Written by: 
                                <FontAwesomeIcon className='author--icon' 
                                    icon={index < users.length ? users[index] : users[index - users.length*(Math.floor(index/users.length))]}
                                />
                            </span>
                        </div>
                        <div  className='blog-item__avatar col l-5 center'>
                            <div
                                className='blog-item__avatar-img sub-bg'
                                style={{ 
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${blog.img})` ,
                                    position: 'relative',
                                }}
                            >
                                {editIndex === index && <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '4px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                    }}
                                >
                                    <input
                                        className='input-file'
                                        type='file'
                                        id='edit-img'
                                        style={{display: 'none'}}
                                        onChange={handleEditImg}
                                    />
                                    {/* <input
                                        value={editImgLink}
                                        id='edit-img-link'
                                        // style={{display: 'none'}}
                                        onChange={(e)=>dispatch.actions(e.target.value)}
                                    /> */}
                                    {/* <div>Edit Image</div> */}
                                    <label htmlFor='edit-img'>
                                        Edit Image
                                    </label>
                                    {/* <label htmlFor='edit-img-link'>
                                        <button>
                                            Link
                                        </button>
                                    </label> */}
                                </div>}
                            </div>
                        </div>
                        <div className='col l-7'>
                            <div className='Blog-item__info '>
                                    <div className='author mb-12 hide-on-tablet'>
                                        <span className="center">Written by: 
                                            <FontAwesomeIcon className='author--icon' 
                                                icon={index < users.length ? users[index] : users[index - users.length*(Math.floor(index/users.length))]}
                                            />
                                        </span>
                                    </div>
                                    <div 
                                        className='create-blog__content mb-12' 
                                        style={{
                                            height: '225px',
                                        }}
                                    >
                                        {editIndex === index && 
                                                <div className='input-title-wrap'>
                                                    <textarea
                                                        rows = "1" 
                                                        cols = "50" 
                                                        className='input-title hidden'
                                                        id='input-title'
                                                        value={title}
                                                        onChange={e=>dispatch(actions.setTitle(e.target.value))}
                                                        />
                                                </div>
                                                || 
                                                <h2 
                                                    // onClick={handleEditTitle}
                                                    className='blog-item__title Blog-item__title'>{blog.title}</h2>
                                            }
                                        
                                        <div className='blog-item__sub--title Blog-item__sub--title'>
                                            <span className={`line ${blog.kind}`}
                                            >
                                            </span>
                                            <span className='blog-item_sub--kind'>
                                                {blog.kind}
                                            </span>
                                        </div>
                                        {editIndex === index &&  <div>
                                                <textarea
                                                    className='input-content hidden'
                                                    rows = "4" 
                                                    cols = "60" 
                                                    value={content}
                                                    onChange={(e)=>dispatch(actions.setContent(e.target.value))}
                                                    />
                                            </div> ||
                                            <p className='blog-item__dct mb-24'>{blog.content}</p>
                                        }
                                    </div>
                                    <div className='blog-item__contact space-between mb-12'>
                                        <div>
                                            <span 
                                                className='blog-item__tym btn blog-item__contact-item'
                                                onClick={()=>handleLike(index)}
                                            >
                                                <FontAwesomeIcon className='blog-item__tym--icon blog-item__contact-icon' icon={blog.like < 1 ? faHeart : faHearted} />
                                                {blog.like}
                                            </span>
                                            {/* <span
                                                className='blog-item__dis-tym'
                                                onDoubleClick={()=>handleDisLike(index)}                                
                                            >
                                            </span> */}
                                            <span
                                                className='blog-item__contact-item'
                                            >
                                                <FontAwesomeIcon className='blog-item__contact-icon' icon={faEye} /> 100
                                            </span>
                                            <span
                                                className='blog-item__contact-item'
                                            >
                                                10 min read
                                            </span>
                                        </div>
                                        <button className='blog-item__read-more--btn'>Read more
                                            <FontAwesomeIcon className='blog-item__read-more--btn--icon' icon={faChevronRight} />
                                            <span className="sub-tag">Comming soon</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            ))}
        </>
    )
}
export default memo(InfinitySroll)