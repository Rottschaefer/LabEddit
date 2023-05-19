import axios from "axios"
import { useEffect, useState } from "react"

export const useRequestData = (path) => {

    const [data, setData] = useState([])

    // useEffect(()=>{
    //     axios.post(path, body)
    //     .then(response => {setData(response.data)})
    //     .catch(error => console.log(error.message))
    // }, [path])

    const addData = (body, setIsLoading) => {
        axios.post(path, body)
        .then(response => {setData(response.data); setIsLoading(false)})
        .catch(error => {console.log(`Error: ${error.message}`); setIsLoading(false)})
        
        return data
    }

    return {addData}
}