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
    SET_PASSWORD,
    SET_CHECK_PASSWORD,
    SET_SIGN_IN,
    SET_SIGN_OUT,
    SET_SEARCH,
    GET_SEARCH,
    SET_SEARCHED,
    SET_CATEGORY,
    ADMIN,
    UNIQUEKINDS,
    SET_EDIT_MODE,
    SET_EDIT_INDEX,
    SET_EDIT_INFO,
    SET_EDIT_CONFIRM,
    SET_EDIT_IMG,
    SET_EDIT_IMG_LINK,
    SET_EDIT_TITLE,
    TOGGLE_EDIT_TITLE,
    SET_EDIT_KIND,
    SET_EDIT_CONTENT,
    SET_EDITED,
    SET_DELETE_MODE,
    SET_DELETE_BLOG,
    SET_LIKE,
    SET_DIS_LIKE,
    SET_POPULAR_BLOGS,
    SET_SMALL_CREATE_BLOG,
    SET_SCROLL,
    SET_CONTACT_NAME,
    SET_CONTACT_EMAIL,
    SET_CONFIRM_CONTACT_EMAIL,
    SET_CONTACT_SUBJECT,
    SET_CONTACT_MESSAGE,
    SET_CONTACTS,
    SET_USERS,
    TB_SET_FADE_BARS,
    TOGGLE_SEE_PASSWORD,
} from "./const";

export const setTodoInput = payload => ({
    type: SET_TODO_INPUT,
    payload
})
export const setType = payload =>({
    type: SET_TYPE,
    payload
})
// Left
export const setMails = payload =>({
    type: SET_MAILS,
    payload
})
export const setMail = payload =>({
    type: SET_MAIL,
    payload
})
export const setConfirmMail = payload =>({
    type: SET_CONFIRM_MAIL,
    payload
})
// Blogs
export const setCrateBlog = payload => ({
    type: SET_CREATE_BLOG,
    payload
})
export const setBlogs = payload => ({
    type: SET_BLOGS,
    payload
})
export const setLengthBlogs = payload => ({
    type: SET_LENGTH_BLOGS,
    payload
})
export const setTitle = payload =>({
    type: SET_TITLE,
    payload
})
export const setContent = payload =>({
    type: SET_CONTENT,
    payload
})
export const setImg = payload =>({
    type: SET_IMG,
    payload
})
export const setKind = payload =>({
    type: SET_KIND,
    payload
})

export const setInfinityBlogs = payload =>({
    type: SET_INFINITY_BLOGS,
    payload
})
export const setLoadMore = payload =>({
    type: SET_LOAD_MORE,
    payload
})

// Contact
export const setContact = payload =>({
    type: SET_CONTACT,
    payload
})
// About
export const setPassWord = payload =>({
    type: SET_PASSWORD,
    payload
})
export const setCheckPassWord = payload =>({
    type: SET_CHECK_PASSWORD,
    payload
})
export const setSignIn = payload =>({
    type: SET_SIGN_IN,
    payload
})
export const setSignOut = payload =>({
    type: SET_SIGN_OUT,
    payload
})
export const admin = payload =>({
    type: ADMIN,
    payload
})
export const toggleSeePassWord = payload=>({
    type: TOGGLE_SEE_PASSWORD,
    payload
})
// search
export const setSearch = payload =>({
    type: SET_SEARCH,
    payload
})
export const getSearch = payload =>({
    type: GET_SEARCH,
    payload
})
export const setSearched = payload =>({
    type: SET_SEARCHED,
    payload
})
// category
export const setCategory = payload =>({
    type: SET_CATEGORY,
    payload
})
export const uniqueKinds = payload =>({
    type: UNIQUEKINDS,
    payload
})
// edit
export const setEditMode = payload =>({
    type: SET_EDIT_MODE,
    payload
})
export const setEditIndex = payload =>({
    type: SET_EDIT_INDEX,
    payload
})
export const setEditImg = payload =>({
    type: SET_EDIT_IMG,
    payload
})
export const setEditImgLink = payload =>({
    type: SET_EDIT_IMG_LINK,
    payload
})
export const setEditInfo = payload =>({
    type: SET_EDIT_INFO,
    payload
})
export const setEditTitle = payload =>({
    type: SET_EDIT_TITLE,
    payload
})
export const toggleEditTitle = payload =>({
    type: TOGGLE_EDIT_TITLE,
    payload
})
export const setEditKind = payload =>({
    type: SET_EDIT_KIND,
    payload
})
export const setEditContent = payload =>({
    type: SET_EDIT_CONTENT,
    payload
})
export const setEditConfirm = payload =>({
    type: SET_EDIT_CONFIRM,
    payload
})
export const setEdited = payload =>({
    type: SET_EDITED,
    payload
})
export const setDeleteMode = payload =>({
    type: SET_DELETE_MODE,
    payload
})
export const setDeleteBlog = payload =>({
    type: SET_DELETE_BLOG,
    payload
})
// like
export const setLike = payload =>({
    type: SET_LIKE,
    payload
})
export const setDisLike = payload =>({
    type: SET_DIS_LIKE,
    payload
})
// popular blogs
export const setPopularBlogs = payload =>({
    type: SET_POPULAR_BLOGS,
    payload
})
//home mail
export const setHomeMail = payload =>({
    type: SET_HOME_MAIL,
    payload
})
export const setConfirmHomeMail = payload =>({
    type: SET_CONFIRM_HOME_MAIL,
    payload
})
// SET_SMALL_CREATE_BLOG
export const setSmallCreateBlog = payload =>({
    type: SET_SMALL_CREATE_BLOG,
    payload
})
//scroll
export const setSroll = payload =>({
    type: SET_SCROLL,
    payload
})
// Contact
export const setContactName = payload =>({
    type: SET_CONTACT_NAME,
    payload
})
export const setContactEmail = payload =>({
    type: SET_CONTACT_EMAIL,
    payload
})
export const setConfirmContactEmail = payload =>({
    type: SET_CONFIRM_CONTACT_EMAIL,
    payload
})
export const setContactSubject = payload =>({
    type: SET_CONTACT_SUBJECT,
    payload
})
export const setContactMessage = payload =>({
    type: SET_CONTACT_MESSAGE,
    payload
})
export const setContacts = payload =>({
    type: SET_CONTACTS,
    payload
})
//user
export const setUsers = payload =>({
    type: SET_USERS,
    payload
})


//tablet && mobile
export const TBsetFadeBars = payload=>({
    type: TB_SET_FADE_BARS,
    payload
})