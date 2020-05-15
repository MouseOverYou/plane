var Plane_P, Roof_P
var hdrTexture, hdrTextureCity, hdrTextureStudio, hdrSkyboxMaterial, hdrSkybox, CanyonEnvTask, CityEnvTask, StudioEnvTask
var TurbineLoaderTask, Turbine_P
var TurbineParts = []

function LoadAssets(scene, assetsManager) {


    //CanyonEnvTask
    CanyonEnvTask = assetsManager.addCubeTextureTask("CanyonEnvTask", "./assets/Runyon_Canyon_A_2k_cube_specular.dds");

    CanyonEnvTask.onSuccess = function (task) {
        hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(task.texture.name, scene);
        //hdrTexture = task.texture
        hdrTexture.rotationY = 180 * (Math.PI / 180);
        hdrTexture.level = 1

        hdrSkyboxMaterial = new BABYLON.PBRMaterial("hdrSkyBox", scene);
        hdrSkyboxMaterial.backFaceCulling = false;
        hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
        hdrSkyboxMaterial.reflectionTexture.level = 0.1
        hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        hdrSkyboxMaterial.microSurface = 1.0;
        hdrSkyboxMaterial.disableLighting = false;
        // Create Skybox
        hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
        hdrSkybox.visibility = 1
        hdrSkybox.material = hdrSkyboxMaterial;
        hdrSkybox.infiniteDistance = false;

    }
    CanyonEnvTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    //CanyonEnvTask
    CityEnvTask = assetsManager.addCubeTextureTask("CityEnvTask", "./assets/environment.dds");

    CityEnvTask.onSuccess = function (task) {
        hdrTextureCity = new BABYLON.CubeTexture.CreateFromPrefilteredData(task.texture.name, scene);
        //hdrTexture = task.texture
        hdrTextureCity.rotationY = 180 * (Math.PI / 180);
        hdrTextureCity.level = 1

    }
    CityEnvTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    //StudioEnvTask
    StudioEnvTask = assetsManager.addCubeTextureTask("StudioEnvTask", "./assets/DivaStudioSpecularHDR2.dds");

    StudioEnvTask.onSuccess = function (task) {
        hdrTextureStudio = new BABYLON.CubeTexture.CreateFromPrefilteredData(task.texture.name, scene);
        //hdrTexture = task.texture
        hdrTextureStudio.rotationY = 300 * (Math.PI / 180);
        hdrTextureStudio.level = 0.4

    }
    CityEnvTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }


    Plane_P = new BABYLON.TransformNode("Plane_P");
    PlaneLoaderTask = assetsManager.addMeshTask("", "", "./assets/airbus320ToWeb.glb")

    PlaneLoaderTask.onSuccess = function (task) {

        task.loadedMeshes[0].position.x = 0
        task.loadedMeshes[0].position.y = 0.001
        task.loadedMeshes[0].position.z = 0
        task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.05, 0.05, 0.05)
        task.loadedMeshes[0].parent = Plane_P
        Plane_P.position.x = 0
        Plane_P.position.y = 0

    }

    PlaneLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    Turbine_P = new BABYLON.TransformNode("Turbine_P");
    TurbineLoaderTask = assetsManager.addMeshTask("", "", "./assets/Turbine.glb")

    TurbineLoaderTask.onSuccess = function (task) {

        task.loadedMeshes[0].position.x = 0
        task.loadedMeshes[0].position.y = 0
        task.loadedMeshes[0].position.z = 0
        task.loadedMeshes[0].rotationQuaternion = null;
        task.loadedMeshes[0].rotation.y = 0 * (Math.PI / 180)
        task.loadedMeshes[0].scaling = new BABYLON.Vector3(0.1, 0.1, 0.1)
        task.loadedMeshes[0].parent = Turbine_P

        Turbine_P.position.y = 2
        Turbine_P.setEnabled(false)

        console.log(task.loadedMeshes[0]._children[0])
        task.loadedMeshes[0]._children[0].getChildTransformNodes(true).forEach(elem => {
            TurbineParts.push(elem);
        });

    }

    TurbineLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }

    Roof_P = new BABYLON.TransformNode("Roof_P");
    WorldLoaderTask = assetsManager.addMeshTask("", "", "./assets/car_web_env.glb")

    WorldLoaderTask.onSuccess = function (task) {

        task.loadedMeshes[0].position.x = 0
        task.loadedMeshes[0].position.y = 0
        task.loadedMeshes[0].position.z = 0
        task.loadedMeshes[0].parent = Roof_P
        Roof_P.position.x = 0
        Roof_P.position.y = 0
        Roof_P.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01)

    }

    WorldLoaderTask.onError = function (task, message, exception) {
        console.log(message, exception);
    }




    //FINISH

    var pbr
    assetsManager.onFinish = function (task) {
        ChangeMaterialProperties()
        CreateCustomMaterials()
        SpawnHotspots()
        CreateLighting()
        EditMeshes()
        BufferMachineAnimation()
        //CreateColorPicker();
        //AddGlow() 
        //EditMeshes();
        //CreateLighting()
        //AddShadows();
        //PostEffects(scene)
        //AddSSAO()

    }
    //Asset Manager check
    assetsManager.onProgress = function (remainingCount, totalCount, lastFinishedTask) {
        engine.loadingUIText = 'We are loading the scene. ' + remainingCount + ' out of ' + totalCount + ' items still need to be loaded.';
    };

    assetsManager.load();
}

