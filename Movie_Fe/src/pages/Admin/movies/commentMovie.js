import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styles from './Movies.module.scss';
import classNames from 'classnames/bind';

import { deleteComment, getCommentByMovie, getCommentMonth } from '~/apiService/comment';

const cs = classNames.bind(styles);

function CommentMovie() {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCommentByid = async () => {
        try {
            if (id == 'month') {
                const allComment = await getCommentMonth();
                setComments(allComment.data);
            } else {
                const allComment = await getCommentByMovie(id);
                setComments(allComment.data);
            }
            setLoading(true);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCommentByid();
    }, [id]);

    const handleDeleteComment = async (id) => {
        try {
            await deleteComment(id);
            getCommentByid();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cs('admin_container', 'movie')}>
            <>
                {!loading && <div>Loading...</div>}

                {comments.length > 0 ? (
                    <>
                        <h3 className="text-center mb-3 fs-1 fw-bold">Danh sách bình luận</h3>
                        <Table striped bordered hover className="mt-2">
                            <thead>
                                <tr>
                                    <th className="text-center ">STT</th>
                                    <th className="text-center">Tên</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">Nội dung</th>
                                    <th className="text-center">Thời gian tạo</th>
                                    <th className="text-center">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments &&
                                    comments.map((comment, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">{comment?.userId?.name}</td>
                                            <td className="text-center">{comment?.userId?.email}</td>
                                            <td className="text-center">{comment?.content}</td>
                                            <td className="text-center">{comment?.createdAt}</td>
                                            <td className="text-center">
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                >
                                                    Xoá
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </>
                ) : (
                    loading && (
                        <h2 style={{ textAlign: 'center', color: '#fe2c55', marginTop: '20px' }}>
                            Hiện chưa có bình luận nào
                        </h2>
                    )
                )}
            </>
        </div>
    );
}

export default CommentMovie;
