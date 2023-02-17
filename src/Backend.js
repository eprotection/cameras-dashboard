export class ApiError{
    constructor(status,message){
        this.status  = status
        this.message = message
    }
    toString(){
        return `API error: ${this.status} - ${this.message}`
    }
}

var API_URL = null // will be set by init()

export const apiInit = (ws)=>{
    // Backend URL 
    let protocol = window.location.protocol
    let port     = protocol==='http:' ? 8080 : 8443;
    API_URL = `${protocol}//${window.location.hostname}:${port}/${ws}`

    console.log('Backend.init API_URL: '+API_URL);
}

//----------------------------------------------------------------
// SEND JSON
export const apiRequest = async function(method, path, json){
    
    let params = {
        method: method,
        credentials: "include",// to allow cookies
        headers: { }
    }
    if(json){
        params.body = JSON.stringify(json)
        params.headers['Content-Type'] = 'application/json';
    }

    return new Promise((resolve, reject) => {
        let status = null

        fetch( API_URL + path, params)
        .then(response => {
            status = response.status
            return response.json()
        })
        .then(data => {
            if(status===200) resolve(data)
            else reject(new ApiError(status, data.message))
        })
        .catch(error => {reject(error)})
    })
}

export default {
    apiInit,
    apiRequest,
    getApiUrl  : ()=>API_URL
}



