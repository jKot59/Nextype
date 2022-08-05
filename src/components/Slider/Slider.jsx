import './slider.scss'; // для стиля
import { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import ContentLoader from "react-content-loader"
import fetchRequest from '../../services/fetchRequest/fetchRequest';


function Slider (props) {
    const [items, setItems] = useState(null)

    useEffect(() => {
        // получаем данные карточек для слайдера
        if(!sessionStorage.getItem('sliderCards')) {
            fetchRequest(props.contentLink)
            .then((itemData) => {
                setItems(itemData)
                // сохраняем данные карточек в хранилище, чтобы не делать дополнительнве завпросы на сервер при смене табов
                sessionStorage.setItem('sliderCards', JSON.stringify(itemData))
            })
            .catch((e) => console.log(e))
        } else { // если данные карточек уже сохранены в хранилище сессии, то достаем их от туда
            setItems(JSON.parse(sessionStorage.getItem('sliderCards')))
        }
    }, [])

    return (
        <div className='slider'>
            
            {items || sessionStorage.getItem('sliderCards') ?  // если данные получены с сервера или уже имеются в сторэдже, отображаем слайдер
                <Splide 
                    options= {
                        {
                            fixedWidth: 320,
                            fixedHeight: 472,
                            gap: 16,
                            perPage: 4,
                            arrowPath: "M17.5233 21.1666L21.9933 16.6966L20.8149 15.5183L14.3333 22L20.8149 28.4816L21.9933 27.3033L17.5233 22.8333H29.6666V21.1666H17.5233Z",
                            pagination: false,
                            breakpoints: {
                                1300: {
                                    padding: {right: 20},
                                    perPage: 3,
                                    arrows: false,
                                    pagination: true
                                },
                                1000: {
                                    perPage: 2,
                                },
                                700: {
                                    perPage: 1,
                                },
                                400: {
                                    fixedWidth: 290,
                                },
                            },
                        }
                    }
                >
                    { // рисуем карточки из полученных данных
                        items ? items.map(item => (

                            <SplideSlide key={item.id}>
                                <a href={item.url}>
                                    <img src={item.image} alt="cover" />

                                    <div className="slider__text">
                                        <div className='slider__descr'>{item.description}</div>
                                        
                                        <div className="slider__tags">
                                            {item.tags.map(tag => (
                                                <div
                                                    key={tag.id}
                                                    className="slider__tag"
                                                >
                                                    {tag.name}&nbsp;
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </a>
                            </SplideSlide>
                        ))
                        : null
                    }
                </Splide>
            : // если данные с сервера еще не получены, отображаем скелетон
                <ContentLoader
                    speed={2}
                    width={1000}
                    height={472}
                    viewBox="0 0 400 160"
                    backgroundColor="#d9d9d9"
                    foregroundColor="#ededed"
                >
                    <rect x="50" y="6" rx="4" ry="4" width="343" height="38" />
                    <rect x="8" y="6" rx="4" ry="4" width="35" height="38" />
                    <rect x="50" y="55" rx="4" ry="4" width="343" height="38" />
                    <rect x="8" y="55" rx="4" ry="4" width="35" height="38" />
                    <rect x="50" y="104" rx="4" ry="4" width="343" height="38" />
                    <rect x="8" y="104" rx="4" ry="4" width="35" height="38" />
                </ContentLoader>
            }
        </div>
    );
};

export default Slider;