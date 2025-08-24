import React, { useEffect, useState } from "react";
import { ChildrenApi } from "../api/childApi";
import CardPerson from "../components/card/Card";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layouts/layout.jsx";
import SortingButtons from "../components/sorting/SortingButtons.jsx";
import "./Children.css";
import { FancyCursorBorders } from "../components/FancyCursorBorders/FancyCursorBorders.jsx";

export default function Children() {
  const [childrenList, setChildrenList] = useState(null);
  const [sortedChildren, setSortedChildren] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSort, setCurrentSort] = useState('name');
  const [isReversed, setIsReversed] = useState(false);

  const navigate = useNavigate();
  
  const handleClick = (id) => {
    navigate(`/children/${id}`);
  };

  // Функция для получения возраста из даты рождения
  const getAge = (birthDate) => {
    if (!birthDate) return 0;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Функция для получения числового значения класса
  const getGradeNumber = (grade) => {
    if (!grade) return 0;
    const match = grade.toString().match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Функция сортировки
  const sortChildren = (children, sortType, reversed) => {
    if (!children) return null;

    const sorted = [...children].sort((a, b) => {
      let comparison = 0;

      switch (sortType) {
        case 'name':
          const fullNameA = `${a.surname} ${a.name} ${a.fathersname}`.toLowerCase();
          const fullNameB = `${b.surname} ${b.name} ${b.fathersname}`.toLowerCase();
          comparison = fullNameA.localeCompare(fullNameB, 'ru');
          break;

        case 'grade':
          const gradeA = getGradeNumber(a.grade);
          const gradeB = getGradeNumber(b.grade);
          comparison = gradeA - gradeB;
          break;

        default:
          return 0;
      }

      return reversed ? -comparison : comparison;
    });

    return sorted;
  };

  // Обработчик изменения сортировки
  const handleSortChange = (sortType, reversed) => {
    setCurrentSort(sortType);
    setIsReversed(reversed);
    
    const sorted = sortChildren(childrenList, sortType, reversed);
    setSortedChildren(sorted);
  };

  useEffect(() => {
    const fetchGet = async () => {
      try {
        const data = await ChildrenApi.getChildren();
        setChildrenList(data);
        // Применяем сортировку по умолчанию
        const sorted = sortChildren(data, currentSort, isReversed);
        setSortedChildren(sorted);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGet();
  }, []);

  // Пересортировка при изменении исходных данных
  useEffect(() => {
    if (childrenList) {
      const sorted = sortChildren(childrenList, currentSort, isReversed);
      setSortedChildren(sorted);
    }
  }, [childrenList, currentSort, isReversed]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <Layout onMenuClick={(path) => navigate(path)}>
      <FancyCursorBorders >
      <SortingButtons
        onSortChange={handleSortChange}
        currentSort={currentSort}
        isReversed={isReversed}
        showAgeSort={true}
      />
      </FancyCursorBorders>
      <FancyCursorBorders className="children-parent">
        {sortedChildren?.map((item) => (
          <CardPerson
            key={item.id}
            title={`${item.surname} ${item.name} ${item.fathersname}`}
            subtitle={item.grade ?? "7 класс"}
            text={item.birthDate ? `Возраст: ${getAge(item.birthDate)}` : ""}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </FancyCursorBorders>
    </Layout>
  );
}
