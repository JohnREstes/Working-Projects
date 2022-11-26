var tl = new TimelineMax({onUpdate:updatePercetage});
const controller = new ScrollMagic.Controller();
var aboutMeText = document.querySelector(".aboutMeText");

tl.from("blockquote", .5, {x:200});

const scene = new ScrollMagic.Scene({
    triggerElement: ".sticky",
    triggerHook: "onLeave",
    duration: "100%"
})
    .setPin(".sticky")
    .setTween(tl)
    .addTo(controller);

function updatePercetage(){
    tl.progress();
    console.log(tl.progress());
}