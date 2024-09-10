import styles from './Users.module.scss';
import classNames from 'classnames/bind';

import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import { deleteUser, getAll } from '~/apiService/user';
import { useState } from 'react';
import image from '~/assets/Images';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const cs = classNames.bind(styles);

function UsersPage() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const users = await getAll(JSON.parse(localStorage.getItem('user')));
          //  console.log(users.results[0])
            setUsers(users.results);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        if(window.confirm('Are you sure you want to delete')){
            const res = await deleteUser(id,JSON.parse(localStorage.getItem('user')));
            if(res.code===1000) {
                await getUsers();
            }
        }else {
            console.log('errror')
            return;
        }
    };

    return (
        <div className={cs('admin_container', 'user')}>
            <h3 className="text-center mb-3 mt-4 fs-1 fw-bold">Danh sách User</h3>
            <Table striped bordered hover className="mt-2">
                <thead className={cs('')}>
                    <tr>
                    <td className="text-center fw-bold">STT</td>
                        <td className="text-center fw-bold">ID</td>
                        <td className="text-center fw-bold">Tên người dùng</td>
                        <td className="text-center fw-bold">Avatar</td>
                        <td className="text-center fw-bold">Email</td>
                        <td className="text-center fw-bold">UserName</td>
                        <td className="text-center fw-bold">Quyền hạn</td>
                        <td className="text-center fw-bold">Chức năng</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            
                            <td className="text-center">{index+1}</td>
                            <td className="text-center">{user.id}</td>
                            <td className="text-center">{user.subName}</td>
                            <td className="text-center">
                                <img className={cs('user_avatar_img')} src={'http://localhost:8080/images/'+user.avatar || image.avatar} alt="" />
                            </td>
                            <td className="text-center">{user.email}</td>
                            <td className="text-center">{user.username}</td>
                            <td className="text-center">{user.roles[0].name === 'ADMIN' ? 'Admin' : 'User'}</td>
                            <td className="text-center">
                                <Link to={`/admin/dashboard/users/edit/${user.id}`}>Sửa</Link>
                                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                                    Xoá
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default UsersPage;
