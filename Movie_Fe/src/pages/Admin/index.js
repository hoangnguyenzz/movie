import styles from './Admin.module.scss';
import classNames from 'classnames/bind';
import { Link, Navigate, NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '~/context';
import image from '~/assets/Images';
const cs = classNames.bind(styles);

function Dashboard() {
    var { role } = useContext(AuthContext);

    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    
    role = isAdmin;

    const pathname = '/admin/dashboard';

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(role);

    // if (!user) {
    //     return <Navigate to="/movie" />;
    // }
    if (!role) {
        return <Navigate to="/movie" />;
    }
    return (
        <div className={cs('wrapper')}>
            <div className={cs('Sidebar')}>
                <Link to="/movie" className={cs('logo')}>
                    <img className={cs('logo-img')} src={image.logo} alt="logo" />
                    <span className={cs('first-titl')}>TwT</span>
                    <span className={cs('last-titl')}>Cinema</span>
                </Link>
                <NavLink to={`${pathname}/statistic`} className={(nav) => cs('nav-link', { active: nav.isActive })}>
                    Trang chủ
                </NavLink>
                <NavLink to={`${pathname}/movies`} className={(nav) => cs('nav-link', { active: nav.isActive })}>
                    Quản lí phim
                </NavLink>
                <NavLink to={`${pathname}/genres`} className={(nav) => cs('nav-link', { active: nav.isActive })}>
                    Quản lí thể loại
                </NavLink>
                <NavLink to={`${pathname}/users`} className={(nav) => cs('nav-link', { active: nav.isActive })}>
                    Quản lí người dùng
                </NavLink>

                <button className={cs('btn')}>
                    <a
                        href="/movie"
                        onClick={() => {
                            localStorage.removeItem('user');
                        }}
                        className={cs('btn-logout')}
                    >
                        Đăng xuất
                    </a>
                </button>
            </div>

            <div className={cs('Content')}>
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;
