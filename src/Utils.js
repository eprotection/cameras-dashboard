// UTILS
const options = {
        //timeZone:"Australia/Melbourne",
    //weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour:'2-digit',
    minute:'2-digit',
    timeZoneName:'short'
}

export const formatTime = function(time){
    return new Date(time).toISOString()
}
export const formatDateTime = function(time,timeZone){
    // return new Date(time).toISOString()
    // .slice(0,16).replace('T',' ') 
    //timeZone="Australia/Melbourne"
    const date = new Date(time)
    try{
        const formatter = new Intl.DateTimeFormat(
            "ru", {...options,timeZone:timeZone?timeZone:undefined});
        return formatter.format(date)
    }catch(e){
        console.error('formatDateTime',e)
        return date.toLocaleString()
    }
}
export const formatDate = function(time){
    if(!time) return ''
    return new Date(time).toISOString()
    .slice(0,10)//date only
}
export const formatDistance = function(dist){
    return `${(dist/100).toFixed()} km`  
}
export const formatTime_Interval = function(t){
    var s = Math.floor(t/1000);
    // Days
    var d = Math.floor(s/86400);
    s -= d*86400;
    // Hours
    var h = Math.floor(s/3600);
    s -= h*3600;
    // Minutes
    var m = Math.floor(s/60);
    s -= m*60;
    
    if(d) return d+"d "+h+"h";
    if(h) return h+"h "+m+"m";
    if(m) return m+"m "+s+"s";
    return s+"s";
}
