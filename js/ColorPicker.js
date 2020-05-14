function CreateColorPicker(){
         // GUI
         var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

         var panel = new BABYLON.GUI.StackPanel();
         panel.width = "200px";
         panel.isVertical = true;
         panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
         panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
         advancedTexture.addControl(panel);
     
         var textBlock = new BABYLON.GUI.TextBlock();
         textBlock.text = "Coat color:";
         textBlock.height = "30px";
         panel.addControl(textBlock);     
     
         var picker = new BABYLON.GUI.ColorPicker();
         picker.value = coatMat.albedoColor;
         picker.height = "150px";
         picker.width = "150px";
         picker.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
         picker.onValueChangedObservable.add(function(value) { // value is a color3
            coatMat.albedoColor.copyFrom(value);
         });
     
         panel.addControl(picker);  
}