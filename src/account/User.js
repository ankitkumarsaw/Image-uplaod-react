import { useState,} from 'react'
import {Button, Modal, Form, CloseButton} from 'react-bootstrap'
import {login, create, signin, auth} from "../firebase/Firebase"
import {onAuthStateChanged} from "firebase/auth";

export default function User({setUser}) {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modalType, setModalType] = useState(1)
  const [imp, setImp] = useState(true)
  onAuthStateChanged(auth, (user) => {
    setUser(user)})
  
  const submitForm = async () => {
    if (email && password) {
      if(modalType === 1) {
        try {
           const user = await create(email, password)
           setUser(user)
        } catch (err) {
          alert(err.message)
        }
      }
    } else {
      alert('email and password are required')
    }
    if (email && password) {   
      if(modalType === 2) {
        setImp(false)
        try {
             const user = await signin(email, password)
             setUser(user)
         
        } catch (err) {
          alert(err.message)
        }
      }
    } else {
      alert('email and password are required')
    }
}
const googleLogin = async () => {
    try{
        const user = await login()
        setUser(user)
    }
    catch (err) {
        alert(err.message)
    }
  
}
  return (
    <Modal show={true} centered size="lg">
      <Modal.Header>
        <Modal.Title>{modalType === 1 ? 'Sign Up' : 'Login'}</Modal.Title>
        <CloseButton />
      </Modal.Header>

      <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={submitForm}>
            {modalType === 1 ? 'Sign Up' : 'Login'}
          </Button>
          <Button variant="primary" onClick={googleLogin}>
           Log in with Google
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <h4>{ modalType === 1 ? "Already have an account?" : "Don't have an account?" }</h4>
        <Button variant="primary" onClick={() => setModalType(modalType === 1 ? 2 : 1, modalType === 2 ? setImp(true) : setImp(false))}>{ modalType === 1 ? 'Login' : 'Sign Up' }</Button>
      </Modal.Footer>
    </Modal>
  )
}