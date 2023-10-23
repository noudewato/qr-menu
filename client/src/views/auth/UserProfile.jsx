import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateUserProfileAction, GetUserProfileAction } from '../../store/actions/userActions'
import { USER_UPDATE_PROFILE_DETAILS_RESET } from '../../store/constants/userConstants'
import { useNavigate, useParams } from 'react-router-dom'
import { CCol, CContainer, CForm, CRow } from '@coreui/react'
import { InputSwitch } from 'primereact/inputswitch'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Avatar, Box, Button } from '@mui/material'
import { Toast } from 'primereact/toast'
import axios from 'axios'

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading, success, error } = userUpdate
  console.log(user)

  const [upload, setUpload] = useState(0)

  const perset_key = 'myPreset'
  const cloud_name = 'dz88wbaks'

  const uploadImage = (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', perset_key)
    axios
      .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          setUpload(Math.round((100 * e.loaded) / e.total))
        },
      })
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.log(err))
  }

  const [fullName, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhonenumber] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [image, setImage] = useState('')
  const [password, setPassword] = useState('')
  const toast = useRef(null)

  useEffect(() => {
    dispatch(GetUserProfileAction(id))
  }, [dispatch, id])

  useEffect(() => {
    if (user) {
      setFullname(user?.fullName)
      setUsername(user?.username)
      setPhonenumber(user?.phoneNumber)
      setImage(user?.image)
      setPassword(user?.password)
    }
  }, [user])

  const handleSubmit = (e) => {
    if (!username || !fullName || !phoneNumber) {
      setSubmitted(true)
    } else {
      e.preventDefault()
      dispatch(
        UpdateUserProfileAction({
          _id: id,
          fullName,
          username,
          phoneNumber,
          isAdmin,
          image,
          password,
        }),
      )
    }
  }

  useEffect(() => {
    if (success) {
      toast.current.show({
        severity: 'success',
        summary: 'successful',
        detail: `User Profile Updated Successful`,
        life: 3000,
      })

      dispatch({
        type: USER_UPDATE_PROFILE_DETAILS_RESET,
      })

      navigate('/#/')
    }
  }, [success, dispatch, navigate])

  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: 'error',
        summary: 'failed',
        detail: `${error}`,
        life: 3000,
      })
    }
  }, [error])

  return (
    <div>
      <Toast ref={toast} />
      <CContainer style={{ backgroundColor: 'white', padding: '2rem' }}>
        <CForm>
          <CRow>
            <CCol sm="5">
              <Box
                sx={{
                  width: 300,
                  height: 300,
                  margin: 'auto',
                  position: 'relative',
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={image}
                  sx={{
                    width: 300,
                    height: 300,
                    margin: 'auto',
                    position: 'relative',
                  }}
                />
                <label
                  htmlFor="image"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    textAlign: 'center',
                    position: 'absolute',
                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                    borderRadius: '50%',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <input
                    style={{ display: 'none' }}
                    id="image"
                    name="image"
                    onChange={uploadImage}
                    type="file"
                  />

                  <Button color="primary" variant="contained" component="span">
                    {upload ? <>...</> : null} Upload
                  </Button>
                </label>
              </Box>
            </CCol>
            <CCol sm="6">
              <div className="field mb-2">
                <label htmlFor="name" className="font-bold mb-2">
                  FullName
                </label>
                <br />
                <InputText
                  id="fullname"
                  value={fullName}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  autoFocus
                  className={classNames({ 'p-invalid': submitted && !fullName })}
                  style={{ width: '100%' }}
                />
                {submitted && !fullName && <small className="p-error">fullName is required.</small>}
              </div>

              <div className="field mb-2">
                <label htmlFor="name" className="font-bold mb-2">
                  Username
                </label>
                <br />
                <InputText
                  id="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  className={classNames({ 'p-invalid': submitted && !username })}
                  style={{ width: '100%' }}
                />
                {submitted && !username && <small className="p-error">Username is required.</small>}
              </div>

              <div className="field mb-4">
                <label htmlFor="name" className="font-bold mb-2">
                  Phone
                </label>
                <br />
                <InputText
                  id="fullname"
                  value={phoneNumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  required
                  autoFocus
                  className={classNames({ 'p-invalid': submitted && !phoneNumber })}
                  style={{ width: '100%' }}
                />
                {submitted && !phoneNumber && <small className="p-error">Phone is required.</small>}
              </div>

              <div className="field mb-4">
                <label htmlFor="name" className="font-bold mb-2">
                  Password
                </label>
                <br />
                <InputText
                  id="fullname"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  className={classNames({ 'p-invalid': submitted && !password })}
                  style={{ width: '100%' }}
                />
                {submitted && !password && <small className="p-error">Password is required.</small>}
              </div>

              <div
                className="field mt-2"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '2',
                }}
              >
                <InputSwitch
                  checked={isAdmin}
                  value={isAdmin}
                  onChange={(e) => setIsAdmin(e.value)}
                />
                <label htmlFor="description" className="font-bold" style={{ marginLeft: '.3rem' }}>
                  isActive?
                </label>
              </div>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={handleSubmit}
              >
                {loading && <>...</>} Update
              </Button>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
    </div>
  )
}

export default UserProfile
