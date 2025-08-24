import { useEffect, useState } from "react"
import { VpsApi } from "../api/vpsApi";
import Layout from "../components/layouts/layout";
import CardPerson from "../components/card/Card";
import './Children.css'

export const Vps = () => {
    const [vpsList, setVpsList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGet = async () => {
            try {
                const data = await VpsApi.getVps();
                setVpsList(data)
            } catch {
                console.error("Исключение !")
            } finally {
                setLoading(false)
            }
        }

        fetchGet()
    })

    if (loading) return (<p>Загрузка...</p>)

    return (
        <Layout>
            <div className="children-parent">
                {
                    vpsList?.map((item) => {
                        return <CardPerson key={item.id} title={`${item.name} ${item.fathersname}`}/>
                            })
                }
            </div>
        </Layout>
    )

}

