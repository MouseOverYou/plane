let woodMat, LeuchteMat
let videoMats = []
let coatMat;
function ChangeMaterialProperties() {

    var redBay = new BABYLON.Color3.FromHexString("#ea1e1e");
    var blueBay = new BABYLON.Color3.FromHexString("#063c9d");
    var lightGrayBay = new BABYLON.Color3.FromHexString("#eeeeee");
    var darkGrayBay = new BABYLON.Color3.FromHexString("#323334");
    var blackBay = new BABYLON.Color3.FromHexString("#000000");

    var yellow = new BABYLON.Color3.FromHexString("#E19A00");
    var white = new BABYLON.Color3.FromHexString("#FFFFFF");

    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" ) {
            continue;
        }

        mat.reflectionTexture = hdrTexture;
        if (mat.name == "planeMainMat") {
            //mat.reflectionTexture = hdrTexture;
            coatMat = mat
            mat.roughness = 0.25
            mat.metallic = 0.25
            mat.twoSidedLighting = true

            //mat.clearCoat.isEnabled = true;
            //mat.clearCoat.intensity = 1; // 0-1 defaults to 1
            //mat.clearCoat.roughness = 0.1; // 0-1 defaults to 0
            //material.clearCoat.texture = texture; // R is storing intensity and G roughness

            //mat.clearCoat.isTintEnabled = true;
            //mat.clearCoat.tintColor = Color3.Teal();
            //mat.clearCoat.bumpTexture = texture; // dedicated bump texture for the coat
        }
        else if(mat.name == "Car03_LightsEmissive"){
            LeuchteMat = mat
            //mat.emissiveColor = new BABYLON.Color3.FromHexString("#FFFFFF")
        }
        else if(mat.name =="glassFront"){
            mat.alpha = 0
            mat.albedoColor = white 
            mat.roughness = 0;
            mat.metallic = 0
            mat.twoSidedLighting = true
        }
        else if(mat.name == "Car03_Wheel_Mat01"){
            mat.metallic = 1
            mat.roughness = 0.2

        }
        else if(mat.name == "Car03_Interior_Mat01"){
            mat.alpha = 1
            mat.roughness = 0.5
            mat.bumpTexture.level = 0.3
        }

        else if(mat.name == "env_floor"){
            scaleText(mat.albedoTexture, 20, 20)
            scaleText(mat.bumpTexture, 20, 20, 0.4)
            scaleText(mat.metallicTexture, 20, 20)
            mat.roughness = 0.3
            mat.metallic = 0.3
        }
        else if(mat.name == "env_walls"){
            scaleText(mat.albedoTexture, 100, 1, 1)
            scaleText(mat.bumpTexture, 100, 1, 1)
            mat.metallic = 0.1
            mat.roughness = 0.5
            mat.metallicF0Factor = 0
            var wallsAO = new BABYLON.Texture("./assets/Walls2Ambient_Occlusion.png", scene, true, false)
            mat.ambientTexture = wallsAO
        }
        else if(mat.name == "coll Mat"){
            mat.alpha = 0
            mat.transparencyMode = 2
        }
        else if(mat.name =="FloorAO"){
            var textAlpha = new BABYLON.Texture("./assets/FLoor Opacity.png", scene, true, false);
            textAlpha.getAlphaFromRGB = true
            mat.opacityTexture = textAlpha
            mat.unlit = true
 
        }
    }


}

function UpdateEnvReflections(hdr){
    let sceneMats = scene.materials;
    for (let mat of sceneMats) {
        if (mat.name == "hdrSkyBox" ) {
            continue;
        }

        mat.reflectionTexture = hdr;
    }

}
function scaleText(text, uValue, vValue, strength){
    text.uScale = uValue
    text.vScale = vValue
    if(strength == null){
        return
    }
    text.level = strength
}

var colMat, HotspotMat
function CreateCustomMaterials() {
    colMat = new BABYLON.StandardMaterial("colMat", scene)
    colMat.wireframe = true
    colMat.alpha = 0

    var hsText = new BABYLON.Texture("./assets/hotspot.png", scene, true, false)
    HotspotMat = new BABYLON.PBRMaterial("HotspotMat", scene)
    HotspotMat.unlit = true
    HotspotMat.albedoTexture = hsText
    HotspotMat.opacityTexture = hsText

    
}

function createVideoMat() {

    var videoMat = new BABYLON.PBRMaterial("videoMat", scene);
    videoMats.push(videoMat)
    var dotsText = new BABYLON.Texture("./assets/videoDots2.jpg", scene, true, false)
    var ambientScreen = new BABYLON.Texture("./assets/screenAmbient.jpg", scene, true, false)
    videoMat.ambientTexture = ambientScreen
    videoMat.bumpTexture = dotsText
    videoMat.bumpTexture.level = 0
    videoMat.bumpTexture.uScale = 1
    videoMat.bumpTexture.vScale = 1
    videoMat.emissiveColor = new BABYLON.Color3.FromHexString("#313131")
    videoMat.metallic = 0
    videoMat.roughness = 0

    return videoMat;
}

