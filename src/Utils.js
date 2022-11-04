// UTILS
export const formatTime = function(time){
    return new Date(time).toISOString()
}
export const formatDateTime = function(time){
    return new Date(time).toISOString()
    .slice(0,16).replace('T',' ') 
}
export const formatDate = function(time){
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
