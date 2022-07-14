const inicial = {
    logado:localStorage.getItem('logado')
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