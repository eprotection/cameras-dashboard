import {useState} from "react"
import {backend} from '../Backend'

var mt = 0

export var load = async () => {
    // Load
    console.log('cameras: start loading...')
    let data = await backend.request('POST','/cameras/load_cameras',{mt:mt})
    mt = data.till_mt
    console.log('cameras:',data)
    // Update
    const newList = data.results
    listUpdater(newList)
    // Update selected
    let newSelected = newList.map(cam=>({id:cam.id, name:cam.name}))
    console.log('cameras.selected:',newSelected)
    selectedUpdater(newSelected)
}

//--------------------------------------------------------------------------------
// HOOK - registrator
// The module is not just an object but have to be registered in the state machine
var listUpdater = null
var selectedUpdater = null

export default () => {
    
    const [list,     setList]       = useState([]); // cameras list
    const [selected, setSelected]   = useState([]); // selected id list
    
    listUpdater     = setList
    selectedUpdater = setSelected

    return {
        list    : list,
        selected: selected,
        load    : load
    }
}
