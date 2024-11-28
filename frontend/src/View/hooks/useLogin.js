import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {

    const navigate = useNavigate();
    setIsLoading(true);
    setError(null)

    try {
        const response = await axios.post("http://localhost:9000/api/auth/login", {email, password}) 

        //const json = await response.data.details
        const json = await response.data.details
        const status = await response.statusText

        if(status !== 'OK') {
            //setIsLoading(false);
            console.log("!json");
            // setError(json.error)
        }

        if(status == 'OK') {

            // save the user to local storage
            //localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            //dispatch({type: 'LOGIN', payload: json})
            console.log("response.data", json);
            //console.log("json", json)

            // update loading state
            setIsLoading(false);
            setError(null)

            navigate(`/patient-portal/auth/${json._id}`) //1. navigate to otp page
        }
    } catch (error) {
        console.log(error)
    }
  }

  return { login, isLoading, error }
}