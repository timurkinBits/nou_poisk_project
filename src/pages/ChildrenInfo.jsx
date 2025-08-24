import { useEffect, useState } from "react"
import Layout from "../components/layouts/layout"
import { ChildrenApi } from "../api/childApi"
import { useParams } from "react-router-dom"
import './Info.css'
import { CardDetail } from "../components/card_detail/CardDetail"

export const ChildrenInfo = () => {
    const {id} = useParams()
    const [child, setChild] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchGet = async () => {
          try {
            const data = await ChildrenApi.getChildrenById(id);
            setChild(data);
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

    return <Layout><CardDetail name={child.name} surname={child.surname} fathername={child.fathersname} birthdate={child.birthdate} 
    workingPlace={child.study_place} grade={child.grade}/></Layout>
}
