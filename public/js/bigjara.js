/**
 ** Project : ACE AFRICA INTERFACE LIBRARY
 ** Author  : Adeleke Bright 
 ** Description :  This library is built to allow easy and fast product development for 
 **    ACE AFRICA
**/
const AIL = {} 
AIL.selector = e => document.querySelector(e)
AIL.selectAll = e => Array.from(document.querySelectorAll(e))

AIL.toggle = (function(target , content , errorHandler  , ...icons) {
    try {
        let triggers = AIL.selectAll(target) 
        let toggleAbleContents = AIL.selectAll(content)
        if (triggers.length < 1) throw new Error("The element is not available") 
        triggers.map((trigger , i) => {
            trigger.addEventListener("click" , e => { 
                let target = e.target
                let currentIcons = trigger.classList
                let realContent = toggleAbleContents[i].classList
                toggleAbleContents.filter((e , j) => j !== i).map(toggleable => toggleable.classList.remove("active"))
                if (!realContent.contains("grow-animation-ease")){
                    realContent.add("grow-animation-ease")
                }
                realContent.toggle("active") 

                if (!currentIcons.contains("grow-animation-ease")){
                    currentIcons.add("grow-animation-ease")
                }
                trigger.parentNode.nextElementSibling.classList.add("grow-animation-ease")
                if (icons.length > 0 && currentIcons.contains("fa")){
                   currentIcons.toggle("fa-chevron-down")
                   currentIcons.toggle("fa-chevron-right")
                }
                if (target.classList.contains("has-content")){
                    target.textContent = target.textContent.toLowerCase().trim() === "create budget" ? "Hide Form" : "Create Budget"
                }
            })
        })
    }catch(error){
        errorHandler(error.message) 
        return 
    }
})(".tabber" , ".tab-content" , console.error , "fa fa-chevron-down") 


var Mobile = /** @class */ (function () {
    function Mobile(element) {
        this.element = element;
    }
    Mobile.prototype.toggle = function (event) {
        var target = event.target.classList; 
        if (target.contains("toggler-icon")) {
            Mobile.root.classList.toggle("mobile-hide");
            target.toggle("fa-bars")
            target.toggle("fa-close")
        }
    };
    Mobile.prototype.addEventListener = function (type, e) {
        return addEventListener(type, e);
    };
    Mobile.root = document.querySelector(".mobile-navigation");
    
    return Mobile;
}());

var mobileNav = new Mobile("#navbar-toggler");
mobileNav.addEventListener("click", function (event) {
    mobileNav.toggle(event);
});
AIL.modal = (function(target , content , closer ,  errorHandler ){
    try {
        let triggers = AIL.selectAll(target) 
        let contents = AIL.selectAll(content)
        let closers  = AIL.selectAll(closer)
        if (triggers.length < 1) throw new Error("The element is not available")
        triggers.map((trigger , i) => {
            trigger.addEventListener("click" , e => { 
                let currentContent = contents[i]
                currentContent.style.display = "block"
                let modalContent = currentContent.firstElementChild
                let contentWidth = Number(modalContent.getAttribute("data-modal-content-width"))
                let distanceFromTop = Number(modalContent.getAttribute("data-modal-content-distance-from-top"))
                modalContent.style.cssText += `;width:${contentWidth}%;margin:${distanceFromTop}% auto`
                closers[i].addEventListener("click" , e => {
                    currentContent.style.display = "none"
                })
            })
        })
    }catch(error){
        errorHandler(error.message) 
        return 
    }
})(".modal-trigger" , ".modal" , ".close" ,  console.error) 

AIL.tab = (function(targets , contents , errorHandler){
    try { 
        let tabs = AIL.selectAll(contents) 
        if (tabs.length === 0) throw new Error("No content to use as tab") 
        let revealers = AIL.selectAll(targets) 
        revealers.map((reveal , i) => {
            reveal.addEventListener("click" , event => { 
              let {target} = event 
              tabs.filter((e , j) => j !== i).map(tab => tab.classList.remove("active-content")) 
              revealers.filter((e , j) => j !== i).map(reveal => reveal.classList.remove("active-link")) 
              if (!tabs[i].classList.contains("active-content")){
                 tabs[i].classList.add("active-content") 
                 target.classList.add("active-link")
              }
            })
        })
    }catch(error){
        errorHandler(error.message) 
        return 
    }
})(".tab-reveal" , ".tab" , console.error)