/* eslint-disable eqeqeq */
import styles from './Users.module.scss';
import classNames from 'classnames/bind';
import { Form } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { getDetail, updateUser, getUserById } from '~/apiService/user';
import { AuthContext } from '~/context';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseConnect } from '~/components/Firebase';

import image from '~/assets/Images';

const cs = classNames.bind(styles);


const EditUser = () => {

    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState(null);
    const [urlAvatar, setUrlAvatar] = useState();

    const { id } = useParams();
    const { email } = useParams();
    const navigate = useNavigate();
    const { showToastMessage } = useContext(AuthContext);

    const storage = getStorage();

    const { register, handleSubmit, reset } = useForm();

    

    useEffect(() => {
        const getUser = async () => {
            try {
                console.log('id :'+id);
                const user = await getUserById(id,JSON.parse(localStorage.getItem('user')));
                console.log('avatar:'+user.results.avatar);
                setUser(user);
                reset({
                    subName: user.results.subName, // Đặt giá trị mặc định cho trường tên người dùng
                    checkAdmin: user.results.checkAdmin // Đặt giá trị mặc định cho trường quyền quản trị (nếu có)
                });
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, []);


    const Onsubmit = async (data) => {
        
        try {
            if (avatar) {
                data.avatar = avatar;
            }
           
            console.log('du lieu data :'+JSON.stringify( data)); // Sẽ hiển thị object dưới dạng chuỗi JSON

          const res=   await updateUser(data, id, JSON.parse(localStorage.getItem('user')));
          if(res.code===1000){
            navigate('/admin/dashboard/users');
            showToastMessage('success', 'Cập nhật thành công');
          }
        } catch (error) {
            showToastMessage('error', error.message);
        }
    };

    useEffect(() => {
        const getUserDetail  = async () => {
            try {
                const res = await getDetail(email);
                if (res.success) {
                    //setUser(res.data);
                    reset(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUserDetail();
    }, []);

    const handleUploadImg = (e) => {
    
        const image = e.target.files[0];
        if (image) {
            // const storageRef = ref(storage, `images/${image.name}`);
            // const uploadTask = uploadBytesResumable(storageRef, image);
            // uploadTask.on(
            //     'state_changed',
            //     (snapshot) => {},
            //     (error) => {
            //         console.log(error);
            //     },
            //     () => {
            //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //             try {
            //                 setAvatar(downloadURL);
            //             } catch (error) {
            //                 console.log(error);
            //                 // setLoading(false);
            //             }
            //         });
            //     },
            // );
            const imageUrl = URL.createObjectURL(image);
            setUrlAvatar(imageUrl);
            setAvatar(image);
        }
    };

    return (
        <div className={cs('admin_container', 'user')}>
            <h3 className="text-center mt-4 mb-3 fs-1 fw-bold">Sửa người dùng</h3>
            <Form className={cs('genres_form')} onSubmit={handleSubmit(Onsubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Avatar người dùng</Form.Label>
                    <img className={cs('user_avatar_Base')} src={urlAvatar ||(user.results && user.results.avatar ? 'http://localhost:8080/images/' + user.results.avatar : image.avatar)} alt="" />
                    <Form.Control className="mt-4" type="file" style={{ border: 'none' }}  onChange={handleUploadImg}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tên người dùng</Form.Label>
                    <Form.Control required type="text" {...register('subName')} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Quyền quản trị" {...register('checkAdmin')} />
                </Form.Group>
                <button type="submit" className={cs('movie_btn_submit')}>
                    Lưu thông tin
                </button>
            </Form>
        </div>
    );
};

export default EditUser;
