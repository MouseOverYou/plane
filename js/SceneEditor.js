var lightLinks, lightRechts, spotLightL, spotLightR, godrays
function CreateLighting(){
    lightLinks = new BABYLON.DirectionalLight("lightLinks", new BABYLON.Vector3(-60, -41, -90), scene);
    lightLinks.position = new BABYLON.Vector3(1, 1, 0);
    lightLinks.intensity = 0
    lightLinks.shadowMinZ = -13

    lightRechts = new BABYLON.DirectionalLight("lightRechts", new BABYLON.Vector3(120, -41, -90), scene);
    lightRechts.position = new BABYLON.Vector3(-1, 1, 0);
    lightRechts.intensity = 0.0

    spotLightL = new BABYLON.SpotLight("spotLightL", new BABYLON.Vector3(0.7, 0.75, 2.2), new BABYLON.Vector3(0, 0, 1), 115 * (Math.PI / 180), 2, scene);
    spotLightL.intensity = 250

    spotLightR = new BABYLON.SpotLight("spotLightR", new BABYLON.Vector3(-0.7, 0.75, 2.2), new BABYLON.Vector3(0, 0, 1), 95 * (Math.PI / 180), 2, scene);
    spotLightR.intensity = 250

    spotLightL.diffuse = new BABYLON.Color3(0, 0, 0)
    spotLightR.diffuse = new BABYLON.Color3(0, 0, 0)
    // Create the "God Rays" effect (volumetric light scattering)
    godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, LightMesh, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
    godrays._volumetricLightScatteringRTT.renderParticles = true;
    godrays.invert = false;
    //godrays.weight = 1
    godrays.exposure =0

/*


	// By default it uses a billboard to render the sun, just apply the desired texture
	// position and scale
	godrays.mesh.material.diffuseTexture = new BABYLON.Texture('assets/sun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
	godrays.mesh.material.diffuseTexture.hasAlpha = true;
	godrays.mesh.position = new BABYLON.Vector3(0.7, 0.75, 2.2);
	godrays.mesh.scaling = new BABYLON.Vector3(1, 1, 1);

*/

}

let LightMesh
function EditMeshes(){
    scene.meshes.forEach(mesh => {
        if(mesh.name == "Car03_CollisionMesh"){
            //mesh.isVisible = false
            //console.log(mesh)
        }
        if(mesh.name == "Car03_Lights_HeadLight"){
            LightMesh = mesh
        }
    });
}

function AddShadows() {
    var groundShadow = BABYLON.Mesh.CreatePlane('groundShadow', 95, scene)
    groundShadow.rotation.x = Math.PI / 2
    groundShadow.position.y = 0.01
    groundShadow.material = new BABYLON.ShadowOnlyMaterial('shadowOnly', scene)
    groundShadow.material.alpha = 0.2
    groundShadow.receiveShadows = true

    var generator = new BABYLON.ShadowGenerator(4096 / 8, lightLinks);
    generator.setTransparencyShadow(true);
    generator.filter = 100

    for (var i = 0; i < scene.meshes.length; i++) {
        if (scene.meshes[i].name == "Car03_CollisionMesh") {
            generator.addShadowCaster(scene.meshes[i]);

        }
        else if (scene.meshes[i].name == "walls") {
            scene.meshes[i].receiveShadows = true;
        }

    }

}

function AddGlow() {
    // Add lights to the scene
    var gl = new BABYLON.GlowLayer("glow", scene) //glow layer 
    gl.intensity = 1.5;
    scene.meshes.forEach(elem => {
        if (elem.name.startsWith("Screen_") || elem.name == "Video_Screens") {
            //gl.addExcludedMesh(elem)
        }
    });

}

var changeEnv = async function (hdr, vis) {
    hdrSkyboxMaterial.dispose(false,true)
    await CreateEnvMaterial(hdr, vis);
    await UpdateEnvReflections(hdr);
    await ChangeEnvMesh(vis);
}

function CreateEnvMaterial(hdr, vis){

    hdrSkyboxMaterial = new BABYLON.PBRMaterial("hdrSkyBox", scene);
    hdrSkyboxMaterial.backFaceCulling = false;
    hdrSkyboxMaterial.reflectionTexture = hdr.clone();
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    hdrSkyboxMaterial.microSurface = 1.0;
    hdrSkyboxMaterial.disableLighting = false;
    // Create Skybox
    hdrSkybox.material = hdrSkyboxMaterial;
    hdrSkybox.visibility = vis
}

function ChangeEnvMesh(vis){

    if(vis == 0){
        console.log("setting off")
        console.log(Roof_P)
        Roof_P.setEnabled(false)
    }
    else{
        console.log("setting on")
        Roof_P.setEnabled(true)
    }


}