import { askAsync, getAsync, MEDIA_LIBRARY } from 'expo-permissions'
import { Alert } from 'react-native'

const getMediaLibraryPermission = async() => {
  await getAsync(MEDIA_LIBRARY)
  .then(async({granted}) => {
    if(!granted) {
      await askAsync(MEDIA_LIBRARY)
      .then(({granted}) => {
        if(!granted) {
          Alert.alert(
            'Without permission!',
            'You need to enable permission to access the media library to save QrCodes.'
          )
        }
      })
    }
  })
}

export default getMediaLibraryPermission