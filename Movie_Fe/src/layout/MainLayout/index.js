import Footer from '../component/Footer';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import styles from './MainLayout.module.scss';
import classNames from 'classnames/bind';
import { useRef } from 'react';
const cs = classNames.bind(styles);

function MainLayout({ children }) {
    const sideBarRef = useRef();
    const handleShowmenu = () => {
        sideBarRef.current.classList.toggle(cs('visible'));
    };
    return (
        <div className={cs('wrapper')}>
            <Header className={cs('header')} onClick={handleShowmenu} />
            <Sidebar ref={sideBarRef} className={cs('sidebar')} />
            <div className={cs('content')}>{children}</div>
            <Footer className={cs('footer')} />
        </div>
    );
}

export default MainLayout;
