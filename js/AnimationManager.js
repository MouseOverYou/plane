function TurnLightsOff(){
    spotLightL.diffuse = new BABYLON.Color3(0, 0, 0)
    spotLightR.diffuse = new BABYLON.Color3(0, 0, 0)
    godrays.exposure = 0

    LeuchteMat.emissiveColor = new BABYLON.Color3(0, 0, 0)
}

function TurnLightsOn(rate) {
    rate = rate * 2
    //spots
    spotLightL.diffuse = new BABYLON.Color3(rate, rate, rate)
    spotLightR.diffuse = new BABYLON.Color3(rate, rate, rate)

    //general
    LeuchteMat.emissiveColor = new BABYLON.Color3(255 / 255 * rate, 255 / 255 * rate, 255 / 255 * rate)
    godrays.exposure = rate/4


    if (rate > 0.99) {
        UpdateAnimRate = false
        AnimRate = 0;
    }
}

var TurbineAnim = gsap.timeline({paused:true});

var startPos = []
function BufferMachineAnimation(){

    var rateZ = 100
    var c = 0
    for (let elem of TurbineParts){

        startPos.push(elem.position.x)
        TurbineAnim.fromTo(elem.position, {x: startPos[c]}, {x:startPos[c]-rateZ, ease: "power2.out", duration: 1}, "<");
        rateZ = rateZ - 5
        c++
    }
}

function ResetTurbine(){
    var c = 0
    for (let elem of TurbineParts){

        elem.position.x = startPos[c]
        c++
    }

}