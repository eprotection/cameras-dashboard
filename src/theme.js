import { useState } from "react";

const loadTheme=()=>{
    let stored=window.localStorage.getItem('theme');
    return stored?stored:'dark'
}

const saveTheme=(value)=>{
    window.localStorage.setItem('theme',value)
}

export const useTheme = ()=>{
    const [theme,setTheme] = useState(loadTheme)
    const toggleTheme = ()=>{
      const newTheme = theme=='dark' ? 'light' : 'dark'
      saveTheme(newTheme)
      setTheme(newTheme) 
    }
    return [theme,toggleTheme]
}