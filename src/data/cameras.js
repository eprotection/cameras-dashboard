import {useState} from "react"
import {backend} from '../Backend'

var mt = 0

export var load = async () => {
    console.log('cameras: start loading...')
    let data = await backend.request('POST','/cameras/load_cameras',{mt:mt})
    mt = data.till_mt
    console.log('cameras:',data)
    listUpdater(data.results)
}

//--------------------------------------------------------------------------------
// HOOK - registrator
// The module is not just an object but have to be registered in the state machine
var listUpdater = null

export default () => {
    
    const [list, setList] = useState([]);
    
    listUpdater = setList

    return {
        list : list,
        load : load
    }
}
