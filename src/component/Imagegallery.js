import React, { useEffect, useState, useRef } from "react"
import Spinner from 'react-bootstrap/Spinner';
import {Container, Col, Row, Button} from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid';
import {uploadFile, uploadJson} from '../firebase/Storage'
const constraints = {
  audio: false,
  video: {
    width: 1280,
    height: 720
  }
}



function Imagegallery({user}) {

  const videoRef = useRef()
  const photoRef = useRef()

  const [session, setSession] = useState(null)
  const [images, setImages] = useState([])
  
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState('')

  const  upload = async () =>{
    setUploading(true)
      for (let i = 0; i < images.length; i++) {
        // const file = new Blob([images[i].image], {type: 'image/jpeg'})
        await uploadFile(user.uid, session, images[i].image, images[i].name)
        setProgress(`Uploading ${i+1}/${images.length} images`)
      }

      const locations = images.map(image => {
        return {
          name: image.name,
          latitude: image.location.latitude,
          longitude: image.location.longitude
        }
      })

      await uploadJson(user.uid, session, btoa(JSON.stringify(locations)))
      alert('Upload complete')
      window.location.reload()
  }

  const startCamera = () => {
    navigator
      .mediaDevices
      .getUserMedia(constraints).then(stream => {
        window.stream = stream;
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.log(err))
  };


  const getLocation = () => {
    return new Promise((resolve, reject) => {
      const success = (pos) => resolve(pos)
      const error = (err) => reject(err)

      navigator.geolocation.getCurrentPosition(success, error)
    })
  }

  const takePicture = async () => {
    
    const video = videoRef.current
 
    const photo = photoRef.current
    

    photo.width = video.videoWidth
 
    photo.height = video.videoHeight
 
    const ctx = photo.getContext('2d')
 
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

    const image = photo.toDataURL('image/jpeg')

    const location = await getLocation()

    const data = {
      image: image,
      location: location.coords,
      name:  `image-${images.length}.jpg`
    }
    setImages([...images, data])
    }
    const clearImage = () => setImages([])
 
useEffect(() => {
  startCamera()
  setSession(uuidv4())
}, []);



if(uploading) return (
  <div>
  <br/>
  <Container>
  <Row>
  <Col></Col>
  <Col xs={2}>
  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
  </Spinner>
  <p>{progress}</p>
  </Col>
  <Col></Col>
</Row>
</Container>
  </div>
  
)

return (
  <div>
  <Container>
  <Row>
    <Col><video ref={videoRef} className="container" style={{"height": "400px", "width": "600px"}} autoPlay playsInline></video>
    <div className="container align-center" >
    <Button onClick={takePicture} className="py-3 px-md-5">Take Picture</Button>
    <Button onClick={clearImage} className="py-3 px-md-5" style={{"margin-left":"10px"}}>Clear Image</Button>
    <Button onClick={upload} className="py-3 px-md-5" style={{"margin-left":"10px"}}>Upload</Button>
    </div>
    <canvas className="container" ref={photoRef} style={{ "display": "none"}}></canvas>
    </Col>
    
    <Col xs={6}> <div className="scrolling">{ images.map((image, index) => (
      <div key={index}>
        <img className="py-3 px-md-2 image" alt='captured shot' src={image.image} />
        <p>Name: {image.name}</p>
        <p>Latitude: {image.location.latitude} Longitude: {image.location.longitude}</p>
      </div>
    )) }</div></Col>

  </Row>
  <Row>
    <Col></Col>
    <Col xs={5}></Col>
    <Col></Col>
  </Row>
</Container>
  
  </div>
);
}

export default Imagegallery;
