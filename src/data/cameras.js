import {useState} from "react"
import {backend} from '../Backend'

var mt = 0

export default () => {
    
    const [list, setList] = useState([]);// not just an object but register in the state machine
    
    return {
        list : list,

        load : async () => {
            let data = await backend.request('POST','/cameras/load_cameras',{mt:mt})
            mt = data.till_mt
            console.log('cameras:',data)
            setList(data.results)
    
        }

    }
}