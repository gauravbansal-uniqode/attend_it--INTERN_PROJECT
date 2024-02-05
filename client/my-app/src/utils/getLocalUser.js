
const getLocalUser=()=>{
    const user= JSON.parse(localStorage.getItem("user"));
    console.log(user);
    return user;
}

export default getLocalUser;