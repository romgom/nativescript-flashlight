var application = require("application");
var flashlight = require("./flashlight-common");
var camera;
var parameters;

flashlight.isAvailable = function() {
	var packageManager = application.android.currentContext.getPackageManager();
	return packageManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_CAMERA_FLASH);
}
flashlight.on = function() {
	this._checkAvailability();
	if (!camera) {
		camera = android.hardware.Camera.open(0);
		parameters = camera.getParameters();
	}
	//parameters.setFlashMode(camera.Parameters.FLASH_MODE_TORCH);  //original code 
	//change "camera" to "android.hardware.Camera" in setFlashMode as it causing a js runtime error
	parameters.setFlashMode(android.hardware.Camera.Parameters.FLASH_MODE_TORCH);
	camera.setParameters(parameters);
	camera.startPreview();
};
flashlight.off = function() {
	//parameters.setFlashMode(camera.Parameters.FLASH_MODE_OFF); //original code 
	parameters.setFlashMode(android.hardware.Camera.Parameters.FLASH_MODE_OFF);
	camera.setParameters(parameters);
	camera.stopPreview();
	camera.release();
	camera = null; //added to fully release the camera
};

module.exports = flashlight;
