import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls';
var ls = new SecureLS({isCompression:false})

export default createStore({
    state:{
        userList:null,
        key: 'Bookmark1212!',
    },
    mutations:{
        setUser(state, user){
                state.userList = user;
        },
        LogOutUser(state){
            state.userList = null;
        },
        setLikes(state, bookmarkId){
            // state.userList.likes.push(_like)
            state.userList.likes = bookmarkId;
        }
    },
    getters:{
        _isAuthanticated : state=> state.userList != null,
        _saltkey: state=> state.key,
        _getCurrentUser(state){
            const ul = state.userList;
            // for (let i = 0; i < ul?.length; i++) {
            //     delete ul[i]?.password;
            // }
            // if(ul!=null && ul.hasOwnProperty("password")){
            // } //! the same with optional chaining
            delete ul?.password;
            return ul;
        },
        _currentUserId: state=> state?.userList?.id,
        _userLikes: state => state.userList?.likes || []

    },
    plugins:[createPersistedState(
        {
            key: 'bookmark_app',
            storage:{
                getItem : key=> ls.get(key),
                setItem : (key, value) => ls.set(key, value),
                removeItem: key=> ls.remove(key)
            }
        }
    )]
})


