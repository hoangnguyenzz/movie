import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';
import classNames from 'classnames/bind';
import image from '~/assets/Images';

import { login } from '~/apiService/auth';
import { getInfo } from '~/apiService/user';
import { AuthContext } from '~/context';
import ResetPassW from '../ResetPassW';

const cs = classNames.bind(styles);

const Login = () => {
    const resetPassRef = useRef();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { showToastMessage } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        if (!username || !password) {
            showToastMessage('error', 'Vui lòng nhập đủ thông tin');
        } else {
            try{
                const res = await login({
                    username,
                    password,
                });
                console.log(res);
            if (res.results.result) {
                try{
                    const res1 = await getInfo(res.results.token);
                    localStorage.setItem('id', JSON.stringify(res1.results.id));
                    localStorage.setItem('username', JSON.stringify(res1.results.username));
                    localStorage.setItem('subName', JSON.stringify(res1.results.subName));
                    localStorage.setItem('email', JSON.stringify(res1.results.email));
                    localStorage.setItem('avatar', JSON.stringify(res1.results.avatar));
                }catch(error){
                    showToastMessage('error' , error)
                }
                localStorage.setItem('user', JSON.stringify(res.results.token));
                localStorage.setItem('isAdmin' , JSON.stringify(res.results.admin));
                navigate('/movie');
                showToastMessage('success', 'Đăng nhập thành công !');
                setUsername('');
                setPassword('');
            }
         }catch(error) {
            showToastMessage('error','Thông tin không chính xác !')
         }
        }
    };

    const handleResetPassword = () => {
        resetPassRef.current.classList.add('openModal');
    };

    const handleCloseModal = () => {
        resetPassRef.current.classList.remove('openModal');
    };

    return (
        <div className={cs('wrapper')} style={{ backgroundImage: `url(${image.background})` }}>
            <div className={cs('modal')}>
                <Link to="/movie" className={cs('header')}>
                    <img className={cs('logo-img')} src={image.logo} alt="logo" />
                    <h4>Đăng nhập TwTCinema</h4>
                </Link>
                <form onSubmit={handleSubmit} className={cs('form')}>
                    <input
                        type="username"
                        name="username"
                        value={username}
                        placeholder="Nhập username..."
                        
                         //onInvalid={(e) => e.target.setCustomValidity('Đừng bỏ trống trường này')}
                         //onInput={(e) => e.target.setCustomValidity('')}
                        className={cs('Input')}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Nhập mật khẩu..."
                        
                        className={cs('Input')}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className={cs('Button')}>
                        Đăng nhập
                    </button>
                </form>
                <p className={cs('textNote')}>
                    Bạn chưa có tài khoản? <Link to="/register">Đăng kí ngay bây giờ</Link>
                </p>
                <p className={cs('textNote', 'reset')}>
                    <button onClick={handleResetPassword}>Quên mật khẩu?</button>
                </p>
                <ResetPassW ref={resetPassRef} handleCloseModal={handleCloseModal} />
            </div>
        </div>
    );
};
export default Login;
