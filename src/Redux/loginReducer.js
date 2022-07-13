const inicial = {
    logado:false
}

const loginReducer = (state=inicial,action)=>{
    switch (action.type) {
        case "logado":
            return {...state,logado:action.payload.logado}
    
        default:
            break;
    }
    return state
}
export default loginReducer