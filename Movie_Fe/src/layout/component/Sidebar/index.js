/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faClockRotateLeft, faFilm, faTelevision } from '@fortawesome/free-solid-svg-icons';
import { faCompass, faHeart } from '@fortawesome/free-regular-svg-icons';
import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '~/context';
import { getAll } from '~/apiService/genres';
import { getDetail } from '~/apiService/user';

const cs = classNames.bind(styles);

function Sidebar({ className }, ref) {
    const [genres, setGenres] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const { showToastMessage, role, setRole } = useContext(AuthContext);
    const refSubmenu = useRef();

    useEffect(() => {
        const genAllGenres = async () => {
            try{
            const genres = await getAll(1,100,user);
            setGenres(genres.results.content);
            
                // const userRole = await getDetail(user.email);
                // setRole(userRole?.data?.isAdmin);
            }catch(error){
                console.log(error)
            }
            
        };
        genAllGenres();
    }, []);

    const handleToastMessage = (e) => {
        if (!user) {
            e.preventDefault();
            showToastMessage('info', 'Hãy đăng nhập để thực hiện hành động này');
        }
    };
    const handleSubmenu = () => {
        refSubmenu.current.classList.toggle(cs('open'));
    };
    return (
        <div className={cs('wrapper', className)} ref={ref}>
            <div className={cs('container')}>
                <div className={cs('menu')}>
                    <h2 className={cs('title')}>DANH MỤC</h2>
                    <NavLink to="/movie" className={(nav) => cs('nav-link', { active: nav.isActive })}>
                        <FontAwesomeIcon className={cs('iconmovie')} icon={faFilm} />
                        <span>Phim Lẻ</span>
                    </NavLink>
                    <NavLink to="/tv" className={(nav) => cs('nav-link', { active: nav.isActive })}>
                        <FontAwesomeIcon className={cs('icontv')} icon={faTelevision} />
                        <span>Phim Dài Tập</span>
                    </NavLink>

                    <div ref={refSubmenu} className={cs('nav-subMenu')}>
                        <div className={cs('nav-link')} onClick={handleSubmenu}>
                            <FontAwesomeIcon className={cs('iconCompass')} icon={faCompass} />
                            <span style={{ fontSize: '1.7rem' }}>Khám Phá</span>
                            <FontAwesomeIcon className={cs('iconDown')} icon={faChevronRight} />
                        </div>
                        <div className={cs('subContent')}>
                            {genres.map((genre, index) => (
                                <NavLink
                                    key={index}
                                    to={`/genres/${genre.name}/${genre.id}`}
                                    className={(nav) => cs('subContent-item', { active: nav.isActive })}
                                >
                                    {genre.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={cs('personal')}>
                    <h2 className={cs('title')}>CÁ NHÂN</h2>
                    <NavLink
                        to="/favorite/mores/favorite"
                        className={(nav) => cs('nav-link', { active: nav.isActive })}
                        onClick={handleToastMessage}
                    >
                        <FontAwesomeIcon className={cs('iconmovie')} icon={faHeart} />
                        <span>Yêu thích</span>
                    </NavLink>
                    <NavLink
                        to="/history/mores/history"
                        className={(nav) => cs('nav-link', { active: nav.isActive })}
                        onClick={handleToastMessage}
                    >
                        <FontAwesomeIcon className={cs('icontv')} icon={faClockRotateLeft} />
                        <span>Xem gần đây</span>
                    </NavLink>
                </div>
                {user && role && (
                    <div className={cs('dashboard')}>
                        <button className={cs('btn-dashboard')} onClick={() => navigate('/admin/dashboard/statistic')}>
                            Quản Trị
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default forwardRef(Sidebar);
