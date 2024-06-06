import {Platform} from "react-native";
import {
    checkMultiple,
    PERMISSIONS,
    requestMultiple,
} from "react-native-permissions";

const helpers = {
    checkReadCameraGalleryPermission: async () => {
        const responses = await checkMultiple([
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]);

        if ((Platform.Version as number) < 33) {
            return (
                responses["android.permission.CAMERA"] === "granted" &&
                responses["android.permission.READ_MEDIA_IMAGES"] ===
                    "granted" &&
                responses["android.permission.READ_EXTERNAL_STORAGE"] ===
                    "granted"
            );
        } else {
            return (
                responses["android.permission.CAMERA"] === "granted" &&
                responses["android.permission.READ_MEDIA_IMAGES"] === "granted"
            );
        }
    },
    requestReadCameraGalleryPermission: async () => {
        const responses = await requestMultiple([
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]);

        return responses;
    },
};

export {helpers};
