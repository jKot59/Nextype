import './tabs.scss';
import { useState, useEffect } from 'react';
import fetchRequest from '../../services/fetchRequest/fetchRequest';
import Interesting from '../Interesting/Interesting';
import Slider from '../Slider/Slider';
import ItTab from '../ItTab/ItTab';
import ContentLoader from "react-content-loader"

function Tabs (props) {
    const [tabs, setTabs] = useState(null)
    const [activeTab, setActiveTab] = useState(null)

    useEffect(() => {
        //получаем данные для табов
        fetchRequest(props.contentLink)
        .then((serverTadsTitles) => {
            setTabs(serverTadsTitles)
            setActiveTab(serverTadsTitles[0].name) // устанавливаем первый таб активным по дефолту
        })
        .catch(() => console.log('error'))
    }, [])

    return (
        <>
            <div className='tabs'>
                {tabs ? tabs.map((tabTitle) => ( // рисуем полученные табы
                        <div 
                            key={tabTitle.id}
                            className={tabTitle.name === activeTab ? "tab tab_active" : "tab"}
                            onClick={() => setActiveTab(tabTitle.name)} //переключаем активные табы
                        >
                            {tabTitle.name}
                        </div>
                    )) 
                : // покажем скелетон, когда табы загружаются
                    <ContentLoader
                        speed={1}
                        width={200}
                        height={43}
                        viewBox="0 0 380 43"
                        backgroundColor="#d9d9d9"
                        foregroundColor="#ededed"
                    >
                        <rect x="0" y="0" rx="0" ry="0" width="100" height="43" />
                        <rect x="140" y="0" rx="0" ry="0" width="100" height="43" />
                        <rect x="280" y="0" rx="0" ry="0" width="100" height="43" />
                    </ContentLoader>
                }
            </div>

            { // открываем блок, который соответствует активному табу
                activeTab === "Блог" ?
                <Slider contentLink="https://my-json-server.typicode.com/glebov-g/frontend-fake-db/items"/>
                : activeTab === "Интересное" ? <Interesting/>
                : activeTab === "Сфера-IT" ? <ItTab/>
                : null
            }
        </>
    );
};

export default Tabs;