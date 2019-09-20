let defaultState = {
    authorType:false,
    author:"",
    manage:false,
    insert:false,
    update:false,
    remove:false,
    listTitle:"首页/资讯管理/资讯信息"
}

function reducer(state=defaultState,action){
    switch(action.type){
        case "removeUser":
            return {
                ...state,
                authorType:false,
                author:"",
                listTitle: "首页/资讯管理/资讯信息"
            }
        case "changeListTitle":
            return {
                ...state,
                listTitle:action.data
            }
        case "authorShow":
            return {
                ...state,
                authorType:true
            }
        case "changeType":
            return {
                ...state,
                authorType:true,
                author:action.author,
                manage:action.manage,
                insert:action.insert,
                update:action.update,
                remove:action.remove
            }
        default:
            return state;
    }
}


export default reducer;