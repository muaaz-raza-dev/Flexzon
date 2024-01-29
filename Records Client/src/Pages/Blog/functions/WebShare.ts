export let Webshare =async (title:string,url:string,text:string)=>{
    if (navigator) {
        
        if (navigator.share) {
           await navigator.share(
                {
                title:title,
                url:url,
                text:text
            }
            ) 
        }
        else{
        await    navigator?.clipboard?.writeText(url)       
        }
    }
}