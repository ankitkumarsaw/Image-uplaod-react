import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import {app} from './Firebase'


const storage = getStorage(app, 'gs://galleryauthorization.appspot.com')
const uploadFile = async (uid, session, image,name) => {
    const fileRef = ref(storage, `${uid}/${session}/${name}`);

    await uploadString(fileRef, image, 'data_url').then((snapshot) => {
        console.log('Uploaded an image');
    })

    const url = await getDownloadURL(fileRef)
    return url
    
}

const uploadJson = async (uid, session, json) => {
    const fileRef = ref(storage, `${uid}/${session}/locations.json`);

    await uploadString(fileRef, json, 'base64').then((snapshot) => {
        console.log('Uploaded a json!');
    })

    const url = await getDownloadURL(fileRef)
    return url
    
}

export { 
    uploadFile,
    uploadJson
}