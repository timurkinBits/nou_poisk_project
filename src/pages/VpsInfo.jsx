import { useEffect, useState } from "react"
import Layout from "../components/layouts/layout"
import { VpsApi } from "../api/vpsApi"
import { useParams } from "react-router-dom"
import './Info.css'
import { CardDetail } from "../components/card_detail/CardDetail"

export const VpsInfo = () => {
    const {id} = useParams()
    const [vps, setVps] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchGet = async () => {
          try {
            const data = await VpsApi.getVpsById(id);
            setVps(data);
          } catch (error) {
            console.error("API Error:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchGet();
     }, [id])
    if (loading) {
    return <Layout>Загрузка...</Layout>
    }

    return <Layout><CardDetail name={vps.name} surname={vps.surname} fathername={vps.fathersname} birthdate={vps.birthdate} 
    workingPlace={vps.study_place}/></Layout>
}