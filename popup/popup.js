const colorPicker = document.getElementById("color-picker")
const blueBadgePopup = document.getElementById("blue-badge-popup")
const badgePickColor = document.querySelectorAll(".badge-pick-color")
const btSaveAction = document.querySelector(".bt-save-action")
const infoSaveText = document.getElementById("info-save")
let configExtensionValues ={}
let blueVerifiedBadgeColor = '#3297c579'

//Loading Config
document.addEventListener("DOMContentLoaded", async ()=>{
    const [tab] = await browser.tabs.query({active: true, lastFocusedWindow: true});
    const configResponse = await browser.tabs.sendMessage(tab.id, {
        loadConfig: true
    });
    if(configResponse != "Not Found"){
        const badgeColorConfig = configResponse.badgeColor
        blueVerifiedBadgeColor = badgeColorConfig
        blueBadgePopup.style.fill= badgeColorConfig
    }
    badgePickColor.forEach(element => {
        element.style.fill= blueVerifiedBadgeColor
    });
})

//Change badge color options
colorPicker.addEventListener("input",()=>{
    badgePickColor.forEach(element => {
        element.style.fill= colorPicker.value
    });
    activateChangeOptions()
    blueVerifiedBadgeColor = colorPicker.value
})

btSaveAction.addEventListener("click",()=>{ 
    infoSaveText.style.display="block"
    saveChanges("badgeColor",blueVerifiedBadgeColor)
})

function activateChangeOptions(){
    btSaveAction.removeAttribute("disabled")
    btSaveAction.classList.add("bt-save")
}

function saveChanges(configKey,configValue){
    let newValues = {
        ...configExtensionValues,
        [configKey]:configValue
    }
    sendConfig(newValues)
}

async function sendConfig(newConfig) {
    const [tab] = await browser.tabs.query({active: true, currentWindow: true});
    const response = await browser.tabs.sendMessage(tab.id,{
        config: newConfig
    });
}
