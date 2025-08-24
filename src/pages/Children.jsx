import "./Children.css"

import React, { useEffect, useState } from "react";
import { ChildrenApi } from "../api/childApi";
import CardPerson from "../components/card/Card";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layouts/layout.jsx";
import { Button } from "../components/button/Button.jsx"

export default function Children() {
  const [childrenList, setChildrenList] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/children/${id}`); // Переход по клику
  };

  useEffect(() => {
    const fetchGet = async () => {
      try {
        const data = await ChildrenApi.getChildren(); // Используем наш API-метод
        setChildrenList(data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGet();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <Layout onMenuClick={(path) => navigate(path)}>
      <div className="children-parent">
      {childrenList?.map((item) => (
        <CardPerson
          key={item.id}
          title={`${item.surname} ${item.name} ${item.fathersname}`}
          subtitle={item.grade ?? "7 класс"}
          text={""}
          onClick={() => handleClick(item.id)}
        />
      ))}
      </div>
    </Layout>
  );
}
