export const logincall= async(user, dispatch)=>{
    return dispatch({type:"LOGIN_SUCCESS", payload: user});
}