


let defaultState={
    goodslist:[]
}
function reducer(state=defaultState,action){
    switch(action.type){
        case "change_total_price":
            return {
                ...state,
                totalPrice:action.price
            }
        case "add_to_cart":
            return {
                ...state,
                goodslist:action.payload
            }
        case "remove_goods":
            return{
                ...state,
                goodslist:state.filter(item=>{
                    return item._id !=action._id    
                })
            }
        case "change_qty":
            return{
                ...state,
                goodslist:goodslist.map(item=>{
                    if(item._id==action._id){
                        item.qty=action.qty
                    }
                    return item
                })
            }
        case "clear_cart":
            return{
                ...state,
                goodslist:[]
            }
        default:
            return state
    }
}


export default reducer