import { actions } from "."

import { 
    SET_TODO_INPUT, 
    SET_TYPE,
    SET_MAIL,
    SET_HOME_MAIL,
    SET_MAILS,
    SET_CONFIRM_MAIL,
    SET_CONFIRM_HOME_MAIL,
    SET_CREATE_BLOG,
    SET_BLOGS,
    SET_LENGTH_BLOGS,
    SET_TITLE,
    SET_CONTENT,
    SET_KIND,
    SET_IMG,
    SET_INFINITY_BLOGS,
    SET_LOAD_MORE,
    SET_CONTACT,
    SET_SIGN_IN,
    SET_SIGN_OUT,
    SET_PASSWORD,
    SET_CHECK_PASSWORD,
    SET_SEARCH,
    GET_SEARCH,
    SET_SEARCHED,
    SET_CATEGORY,
    ADMIN,
    UNIQUEKINDS,
    SET_EDIT_MODE,
    SET_EDIT_INDEX,
    SET_EDIT_IMG,
    SET_EDIT_IMG_LINK,
    SET_EDIT_INFO,
    SET_EDIT_TITLE,
    TOGGLE_EDIT_TITLE,
    SET_EDIT_KIND,
    SET_EDIT_CONTENT,
    SET_EDITED,
    SET_EDIT_CONFIRM,
    SET_DELETE_MODE,
    SET_DELETE_BLOG,
    SET_LIKE,
    SET_DIS_LIKE,
    SET_POPULAR_BLOGS,
    SET_SMALL_CREATE_BLOG,
    SET_SCROLL,
    SET_CONTACT_NAME,
    SET_CONTACT_EMAIL,
    // SET_CONFIRM_CONTACT_EMAIL,
    SET_CONTACT_SUBJECT,
    SET_CONTACT_MESSAGE,
    SET_CONTACTS,
    SET_USERS,
    TB_SET_FADE_BARS,
    TOGGLE_SEE_PASSWORD,
} from "./const"

const initBlogs = [
    {
        id: 1,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'A Loving Heart is the Truest Wisdom',
        content: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        like: 9,
        kind: 'Travel',
    },
    {
        id: 2,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'Great Things Never Came from Comfort Zone',
        content: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
        like: 0,
        kind: 'Travel',
    },
    {
        id: 3,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'Paths Are Made by Walking',
        content: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
        like: 0,
        kind: 'Food',
    },
    {
        id: 4,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'The Secret of Getting Ahead is Getting Started',
        content: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        like: 12,
        kind: 'Another',
    },
    {
        id: 5,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'You Can\'t Blame Gravity for Falling in Love',
        content: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        like: 0,
        kind: 'Life',
    },
    {
        id: 6,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'A Healthy Heart with Clear and Clean',
        content: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
        like: 6,
        kind: 'Food',
    },
    {
        id: 7,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'Paths Are Made by Walking',
        content: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
        like: 0,
        kind: 'Food',
    },
    {
        id: 8,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'The Secret of Getting Ahead is Getting Started',
        content: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        like: 0,
        kind: 'Travel',
    },
    {
        id: 9,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'A Healthy Heart with Clear and Clean',
        content: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
        like: 0,
        kind: 'Food',
    },
    {
        id: 10,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'A Loving Heart is the Truest Wisdom',
        content: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        like: 0,
        kind: 'Travel',
    },
    {
        id: 11,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'The Secret of Getting Ahead is Getting Started',
        content: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        like: 0,
        kind: 'Travel',
    },
    {
        id: 12,
        img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
        title: 'You Can\'t Blame Gravity for Falling in Love',
        content: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
        like: 4,
        kind: 'Life',
    },
]
const initState ={
    create: false,
    blogs: JSON.parse(localStorage.getItem('blogs')) ?? initBlogs,
    infinityBlogs: JSON.parse(localStorage.getItem('blogs')) ?? initBlogs,
    isLoadMore: false,
    title: '',
    content: '',
    img: 'https://suamacbook.com/sites/images/default_images/image-default.jpg',
    kind: '',
    kinds: ['Travel','Food','Life','Another'],
    Type: 'Home',
    mails: JSON.parse(localStorage.getItem('mails')) ?? [],
    mail: '',
    homeMail: '',
    confirm: false,
    confirmHomeMail: false,
    contact: '',
    password: '',
    checkPassWord: false,
    admin: true,
    signIn: false,
    signOut: false,
    category: JSON.parse(localStorage.getItem('categories')) ?? [],
    uniquekinds: JSON.parse(localStorage.getItem('uniquekinds')) ?? [],
    search: '',
    searched: false,
    editMode: false,
    editIndex: undefined,
    deleteMode: undefined,
    like: 0,
    popularBlogs: JSON.parse(localStorage.getItem('popularBlogs')) ?? [],
    isSmall: false,
    isScroll: false,
    contactName: '',
    contactEmail: '',
    confirmContactEmail: false,
    contactSubject: '',
    contactMessage: '',
    contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],
    editImgLink: '',
    toggleEditTitle: false,
    users: [],
    //t and m
    isFadeBars: false,
    isSeePassWord: false,
}

function reducer(state,action){
    switch(action.type){
        case SET_TODO_INPUT:
            return {
                ...state,
                todoInput: action.payload
            }
        case SET_TYPE:
            return {
                ...state,
                Type: action.payload
            }
        case SET_MAIL:
            return {
                ...state,
                mail: action.payload
            }
        case SET_HOME_MAIL:
            return {
                ...state,
                homeMail: action.payload
            }
        case SET_MAILS:
            state.mail = ''
            const newMails = {
                ...state,
                mails: [...state.mails,action.payload]
            }
            localStorage.setItem('mails', JSON.stringify(newMails.mails))
           
            return  newMails
        case SET_CONFIRM_MAIL:
            return {
                ...state,
                confirm: action.payload,
            }
        case SET_CONFIRM_HOME_MAIL:
            return {
                ...state,
                confirmHomeMail: action.payload,
            }
        case SET_CREATE_BLOG:
            return {
                ...state,
                create: action.payload,
            }
        case SET_BLOGS:
            const newBlogs = {
                ...state,
                blogs: [...state.blogs,action.payload]
            }
            localStorage.setItem('blogs', JSON.stringify(newBlogs.blogs))

            return newBlogs
        case SET_INFINITY_BLOGS:
            return {
                ...state,
                infinityBlogs: [...state.infinityBlogs, action.payload]
            }
        case SET_LOAD_MORE:
            return {
                ...state,
                isLoadMore: action.payload
            }
        case SET_TITLE:
            return {
                ...state,
                title: action.payload
            }
        case SET_CONTENT:
            return {
                ...state,
                content: action.payload
            }
        case SET_IMG:
            return {
                ...state,
                img: action.payload
            }
        case SET_KIND:
            return {
                ...state,
                kind: action.payload
            }
        case SET_CONTACT:
            return {
            ...state,
            contact: action.payload
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case ADMIN:
            return {
                ...state,
                admin: action.payload
            }
        case SET_SIGN_IN:
            return {
                ...state,
                signIn: action.payload
            }
        case SET_SIGN_OUT:
            return {
                ...state,
                signOut: action.payload
            }
        case SET_CHECK_PASSWORD:
            return {
                ...state,
                checkPassWord: action.payload
            }
        case SET_SEARCH:
            return{
                ...state,
                search: action.payload
            }
        case GET_SEARCH:
            return{
                ...state,
                blogs: action.payload
            } 
        case SET_SEARCHED:
            return{
                ...state,
                searched: action.payload
            }
        case SET_CATEGORY:
            const newState = {
                ...state,
                category: action.payload
            }
            localStorage.setItem('categories', JSON.stringify(newState.category))

            return newState
        case UNIQUEKINDS:
            const newUniquekinds = {
                ...state,
                uniquekinds: action.payload
            }
            localStorage.setItem('uniquekinds', JSON.stringify(newUniquekinds.uniquekinds))

            return newUniquekinds
        case SET_EDIT_MODE:
            return{
                ...state,
                editMode: action.payload
            }
        case SET_EDIT_INDEX:
            return{
                ...state,
                editIndex: action.payload
            }
        case SET_EDIT_IMG:
            const editImg = {
                ...state,
                blogs: [...state.blogs]
            }
            // console.log(editImg.blogs[state.editIndex]);
            editImg.blogs[state.editIndex].img = action.payload
            return editImg
        case SET_EDIT_IMG_LINK:
            return {
                ...state,
                editImgLink: action.payload
            }
        case SET_EDIT_TITLE:
            const editTitle = {
                ...state,
                blogs: [...state.blogs]
            }
            editTitle.blogs[state.editIndex].title = action.payload
            return editTitle
        case SET_EDIT_CONTENT:
            const editContent = {
                ...state,
                blogs: [...state.blogs]
            }
            editContent.blogs[state.editIndex].content = action.payload
            return editContent
        case TOGGLE_EDIT_TITLE:
            return {
                ...state,
                toggleEditTitle: action.payload
            }
        // case SET_EDIT_IMG_LINK:
        //     return {
        //         ...state,
        //         editImgLink: action.payload
        //     }
        // case SET_EDIT_IMG_LINK:
        // return {
        //     ...state,
        //     editImgLink: action.payload
        // }

        case SET_DELETE_MODE:
            return{
                ...state,
                deleteMode: action.payload
            }
        case SET_SCROLL:
            return{
                ...state,
                isScroll: action.payload
            }
        case SET_DELETE_BLOG:
            const deleteBlog = {
                ...state,
                blogs: [...state.blogs]
            }
            deleteBlog.blogs.splice(action.payload,1)
            localStorage.setItem('blogs', JSON.stringify(deleteBlog.blogs))

            return deleteBlog
        case SET_LIKE:
            const likeBlog = {
                ...state,
                blogs: [...state.blogs],
            }
            likeBlog.blogs[action.payload].like += 1

            localStorage.setItem('blogs', JSON.stringify(likeBlog.blogs))
            return likeBlog
        case SET_DIS_LIKE:
            const disLikeBlog = {
                ...state,
                blogs: [...state.blogs]
            }
            disLikeBlog.blogs[action.payload].like -= 1

            localStorage.setItem('blogs', JSON.stringify(disLikeBlog.blogs))
            return disLikeBlog
        case SET_POPULAR_BLOGS:
            const newPopularBlogs = {
                ...state,
                popularBlogs :action.payload
            }
            localStorage.setItem('popularBlogs', JSON.stringify(newPopularBlogs.popularBlogs))
            return newPopularBlogs
        case SET_SMALL_CREATE_BLOG:
            return{
                ...state,
                isSmall: action.payload
            }
        case SET_CONTACT_NAME:
            return {
                ...state,
                contactName: action.payload
            }
        case SET_CONTACT_EMAIL:
            return {
                ...state,
                contactEmail: action.payload
            }
        case SET_CONTACT_SUBJECT:
            return {
                ...state,
                contactSubject: action.payload
            }
        case SET_CONTACT_MESSAGE:
            return {
                ...state,
                contactMessage: action.payload
            }
        case SET_CONTACTS:
            const newContacts = {
                ...state,
                contacts: [...state.contacts,action.payload]
            }
            localStorage.setItem('contacts', JSON.stringify(newContacts.contacts))
            return newContacts
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        // TABLET and MOBILE
        case TB_SET_FADE_BARS:
            return {
                ...state,
                isFadeBars: action.payload
            }
        case TOGGLE_SEE_PASSWORD:
            return {
                ...state,
                isSeePassWord: action.payload
            }
        default:
            throw new Error('Invalid action!!!')
    }
}
export { initState,initBlogs }
export default reducer