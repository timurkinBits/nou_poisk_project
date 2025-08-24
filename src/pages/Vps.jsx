import { useEffect, useState } from "react";
import { VpsApi } from "../api/vpsApi";
import './Children.css';
import CardPerson from "../components/card/Card";
import Layout from "../components/layouts/layout";
import SortingButtons from "../components/sorting/SortingButtons.jsx";
import { useNavigate } from "react-router-dom";
import { FancyCursorBorders } from "../components/FancyCursorBorders/FancyCursorBorders.jsx";

export const Vps = () => {
    const [vpsList, setVpsList] = useState(null);
    const [sortedVps, setSortedVps] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentSort, setCurrentSort] = useState('name');
    const [isReversed, setIsReversed] = useState(false);

    const navigate = useNavigate();
    
    const handleClick = (id) => {
        navigate(`/VPS/${id}`);
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

    // Функция сортировки
    const sortVps = (vps, sortType, reversed) => {
        if (!vps) return null;

        const sorted = [...vps].sort((a, b) => {
            let comparison = 0;

            switch (sortType) {
                case 'name':
                    const fullNameA = `${a.surname || ''} ${a.name} ${a.fathersname}`.toLowerCase().trim();
                    const fullNameB = `${b.surname || ''} ${b.name} ${b.fathersname}`.toLowerCase().trim();
                    comparison = fullNameA.localeCompare(fullNameB, 'ru');
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
        
        const sorted = sortVps(vpsList, sortType, reversed);
        setSortedVps(sorted);
    };

    useEffect(() => {
        const fetchGet = async () => {
            try {
                const data = await VpsApi.getVps();
                setVpsList(data);
                // Применяем сортировку по умолчанию
                const sorted = sortVps(data, currentSort, isReversed);
                setSortedVps(sorted);
            } catch (error) {
                console.error("Всё сломалось!!!!", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGet();
    }, []); // Убрал зависимости из useEffect, так как они отсутствовали в оригинале

    // Пересортировка при изменении исходных данных
    useEffect(() => {
        if (vpsList) {
            const sorted = sortVps(vpsList, currentSort, isReversed);
            setSortedVps(sorted);
        }
    }, [vpsList, currentSort, isReversed]);

    if (loading) return (<p>Загрузка</p>);

    return (
        <Layout onMenuClick={(path) => navigate(path)}>
            <FancyCursorBorders>
            <SortingButtons
                onSortChange={handleSortChange}
                currentSort={currentSort}
                isReversed={isReversed}
                showGradeSort={false} // Скрываем кнопку сортировки по классу для VPS
            />
            </FancyCursorBorders>
            <FancyCursorBorders className="children-parent">
                {sortedVps?.map((item) => {
                    const age = getAge(item.birthDate || item.birth_date);
                    
                    return (
                        <CardPerson 
                            key={item.id} 
                            title={`${item.surname || ''} ${item.name} ${item.fathersname}`.trim()}
                            text={age > 0 ? `Возраст: ${age}` : ""}
                            onClick={() => handleClick(item.id)}
                        />
                    );
                })}
            </FancyCursorBorders>
        </Layout>
    );
};
