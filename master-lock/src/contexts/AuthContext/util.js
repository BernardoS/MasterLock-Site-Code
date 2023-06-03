import { Api } from "../../services/API/api";

export function setUserLocalStorage(user){
    localStorage.setItem('user',JSON.stringify(user));
}

export function getUserLocalStorage(){
    const json = localStorage.getItem('user');

    if(!json){
        return null;
    }

    const user = JSON.parse(json);

    return user ?? null;
}