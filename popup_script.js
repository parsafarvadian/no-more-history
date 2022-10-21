let isEnabled = null

function updateBtn(state)
{
    document.getElementById("toggleExt").className = `chkbx_1_${state}`
}

function checkEnabled()
{
    if(isEnabled==false)
    {
        updateBtn("deactive")
    }
    if(isEnabled==true)
    {
        updateBtn("active")
    }
    document.getElementById("toggleStatus").innerHTML = "enabled = " + isEnabled
}

chrome.runtime.sendMessage({ 
    message: "get_enabled"
}, response => {
    if (response.message === 'success') {
        isEnabled = response.payload
        console.log("response: isEnabled is " + isEnabled)
        checkEnabled()
    }
});

document.getElementById("toggleExt").onclick = function(){
    console.log(".")
    if(isEnabled==false)
    {
        chrome.runtime.sendMessage({ 
            message: "set_enabled_true"
        }, response => {
            if (response.message === 'success') {
                isEnabled = response.payload
                console.log("response: isEnabled is " + isEnabled)
                checkEnabled()
            }
        });
    }else{
        if(isEnabled==true)
        {
            chrome.runtime.sendMessage({ 
                message: "set_enabled_false"
            }, response => {
                if (response.message === 'success') {
                    isEnabled = response.payload
                    console.log("response: isEnabled is " + isEnabled)
                    checkEnabled()
                }
            });
        }
    }
}