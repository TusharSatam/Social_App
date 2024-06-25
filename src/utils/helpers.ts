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
    timeDifference: (current, previous) => {
        const msPerSecond = 1000;
        const msPerMinute = msPerSecond * 60;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;

        const elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / msPerSecond) + " seconds ago";
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + " minutes ago";
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + " hours ago";
        } else {
            return Math.round(elapsed / msPerDay) + " days ago";
        }
    },
    formatNumber: num => {
        if (num >= 1000) {
            return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "k";
        }
        return num.toString();
    },
};

export {helpers};
