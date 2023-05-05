import { useEffect, useState } from 'react';

export default function useFetch(url : string) {
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(true)
    async function fetchData() {

        try {
            setLoading(true)
            const result = await fetch(url)
            if(!result.ok) return
            const data = await result.json()
            console.log(data.data)
            setData(data.data)
            setLoading(false)
            
        }catch(err) {
            console.log(err)
        }
        
    }
    useEffect(() => {
        fetchData()
    }, [])

    return { data, loading, fetchData}
}