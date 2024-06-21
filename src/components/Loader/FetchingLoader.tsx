import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const FetchingLoader = () => {
    return (
        <View className="absolute h-full w-full inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
            <ActivityIndicator size="large" color="#FF4D67" />
        </View>
    )
}

export default FetchingLoader