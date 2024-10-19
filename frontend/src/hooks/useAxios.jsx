import axios from 'axios'
import { useState } from 'react'

export default function useAxios(){

    const [response, setResponse]= useState(null)
    const [error, setError]= useState("")
    const [loading, setLoading]= useState(false)

    //creating instance of axios with config
    const axiosInstance= axios.create({
        baseURL: ""
    })

    const fetchData= async({url, method, data= {}, params={}}) => {
        setLoading(true)

        try{
            //fetching data
            const data= await axiosInstance({
                url,
                method,
                data,
                params
            })
            setResponse(result.data)
        }catch(error){
            setError(error.response? error.response.data : error.message)
        }finally{
            setLoading(false)
        }

        return {response, error, loading, }
    }

}