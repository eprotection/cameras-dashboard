import {useState,useEffect, useDebugValue} from "react";

const loadSort = (sortKeys)=>{
    try{
        const json = localStorage.getItem('sort')
        if(!json) throw 'not set'
        const sort = JSON.parse(json) // restored value
        if(! (Array.isArray(sort) && sort.length==2)) throw 'wrong format'
        const sortKey = sort[0]
        if(!sortKeys.find(key=>key==sortKey)) throw 'wrong saved key'
        return sort
    }catch(e){
        console.log('loadSort error',e)
        return ['name',true] // default value
    }
}

const saveSort = (sort)=>{
    localStorage.setItem('sort', JSON.stringify(sort))
}

export const useSort = (sortKeys)=>{
    const [sort, setSort] = useState(loadSort(sortKeys))
    useDebugValue(sort)
    const [sortKey, sortAsc] = sort
    const handleSortClick = key=>{
        const newSort = [key, key==sortKey?!sortAsc:sortAsc]
        saveSort(newSort)
        setSort(newSort)
    }
    const renderSortHeader = (key)=>
        <span key={key}>
            <span 
                className={`sort ${sortKey==key?(sortAsc?'asc':'desc'):''}`}
                onClick={()=>handleSortClick(key)} >
                {key}
            </span>
        </span>
    const renderSortHeaders = ()=>
        <>{sortKeys.map(key=>renderSortHeader(key))}</>


    return {sortKey, sortAsc, renderSortHeaders}
}