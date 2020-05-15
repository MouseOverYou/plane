
var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };

var BGDefault
var currentWorld = "plane"

/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    var assetsManager = new BABYLON.AssetsManager(scene)
    LoadAssets(scene, assetsManager)
    camera = new BABYLON.ArcRotateCamera("Camera", 0 * (Math.PI / 180), 85 * (Math.PI / 180), 18, new BABYLON.Vector3(0, 0.5, 0), scene);
    camera.minZ = 1
    camera.panningDistanceLimit = 0;
    camera.pinchToPanMaxDistance = 0;
    camera.panningSensibility = 0
    camera.lowerRadiusLimit = 12
    camera.upperRadiusLimit = 25
    camera.upperBetaLimit = 90 * (Math.PI / 180)
    camera.angularSensibilityX = 3000
    camera.angularSensibilityy = 3000
    camera.wheelPrecision = 10
    camera.attachControl(canvas, true, true, false);

    var sphereGlass = BABYLON.Mesh.CreateSphere("sphereGlass", 48, 1.5, scene);
    sphereGlass.position.y = 2
    sphereGlass.visibility = 0;

    var glass = new BABYLON.PBRMaterial("glass", scene);
    glass.reflectionTexture = hdrTexture;
    glass.refractionTexture = hdrTexture;
    glass.linkRefractionWithTransparency = true;
    glass.indexOfRefraction = 0.52;
    glass.alpha = 0;
    glass.microSurface = 1;
    glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new BABYLON.Color3(0.85, 0.85, 0.85);
    sphereGlass.material = glass;

    scene.clearColor = new BABYLON.Color3(1, 1, 1);
    scene.ambientColor = new BABYLON.Color3(1, 1, 1);
    BGDefault = scene.createDefaultEnvironment({
        groundColor: new BABYLON.Color3(1, 1, 1),
        skyboxColor: new BABYLON.Color3(1, 1, 1)

    });
    BGDefault.skybox.setEnabled(false)

    //var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false});
    //Handle Dragging MOuse

    scene.onPointerMove = function () {
        //updates rotation of hotspots
        if (currentWorld == "plane") {
            for (let hs of HsPLaneList) {
                A_LooksAt_B(hs, camera)
            }
        }

        else if (currentWorld == "turbine") {

            for (let hs of HsTurbineList) {
                A_LooksAt_B(hs, camera)
            }
        }

    }

    var showUI = false
    scene.onPointerDown = function () {

        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return (mesh.name.startsWith("HS Collider") && mesh.isPickable); });
        if (pickInfo && pickInfo.pickedMesh) {

            //alert(pickInfo.pickedMesh.name);
            CurrentSelection = pickInfo.pickedMesh.name.split('HS Collider ')[1];
            //alert(CurrentSelection)
            switch (CurrentSelection) {
                case "0":
                    showUI = !showUI
                    break;

                case "1":
                    ManageWorlds("turbine");
                    break;

                case "2":
                    showUI = !showUI
                    break;

                case "3":
                    showUI = !showUI
                    break;

                case "4":
                    ManageWorlds("plane");
                    break;

                case "5":
                    showUI = !showUI
                    break;
            }

            if (showUI) {
                //$('#InfoUI').css('display', "block")
                document.getElementById("infobox-video").style.opacity = "1"
                document.getElementById("infobox-video").style.right = "60px"
            }
            else {
                document.getElementById("infobox-video").style.opacity = "0"
                document.getElementById("infobox-video").style.right = "-400px"
            }

            //console.log(CurrentSelection)
        }
    }
    return scene;
};
/******* End of the create scene function ******/

engine = createDefaultEngine();
if (!engine) throw 'engine should not be null.';
scene = createScene();;
sceneToRender = scene

let UpdateAnimRate = false
let AnimRate = 0
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
        var fpsLabel = document.getElementById("fpsLabel");
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
    }
    /*
    if (UpdateAnimRate) {
        AnimRate += 0.01
        TurnLightsOn(AnimRate)
        console.log(AnimRate)
    }
    */
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});



/*
TO DO:
Mute video streaming: cvurrent fake mute
EXplision reveal pack
change urls
*/