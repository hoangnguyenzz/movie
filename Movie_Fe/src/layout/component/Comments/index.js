/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import moment from 'moment/moment';
import 'moment/locale/vi';

import image from '~/assets/Images';
import Wrapper from '~/components/Popper';
import { deleteComment, getCommentByMovie, postComment, updateComment } from '~/apiService/comment';
import { AuthContext } from '~/context';
import { Link } from 'react-router-dom';

const cs = classNames.bind(styles);

function Comment({ MovieId }) {
    moment.locale('vi');
    const [menu, setMenu] = useState(false);
    const [cmtValueInput, setCmtValueInput] = useState('');
    const [comments, setComments] = useState([]);
    const [cmtId, setCmtId] = useState();
    const [showUpdateBtn, setShowUpdateBtn] = useState(null);

    const { showToastMessage } = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem('user'));

    const getComment = async () => {
        try {
            const res = await getCommentByMovie(MovieId);
            setComments(res.data.filter((data) => data.userId));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getComment();
    }, [MovieId]);

    //add

    const sendComment = async () => {
        if (cmtValueInput.trim()) {
            try {
                await postComment({
                    userId: user.id,
                    movieId: MovieId,
                    content: cmtValueInput,
                });
                getComment();
                setCmtValueInput('');
            } catch (error) {
                console.log(error);
            }
        }
    };

    //update

    const handleUpdateContent = async (id, content) => {
        const elementContent = document.getElementById(id);
        if (content != elementContent.innerText) {
            try {
                await updateComment(id, { content: elementContent.innerText });
                getComment();
                setShowUpdateBtn(null);
                showToastMessage('success', 'Cập nhật thành công');
            } catch (error) {
                console.log(error);
            }
        } else {
            setShowUpdateBtn(null);
        }
    };

    const handleCancle = (id, content) => {
        const elementContent = document.getElementById(id);
        elementContent.innerText = content;
        setShowUpdateBtn(null);
    };

    //delete

    const handleDeleteCmt = async (id) => {
        try {
            await deleteComment(id);
            getComment();
            showToastMessage('success', 'Đã xóa thành công');
            // if (id == showUpdateBtn) setShowUpdateBtn(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cs('comment')}>
            <h4 className={cs('titleComment')}>Comments</h4>
            <div className={cs('contentBox')}>
                {user ? (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendComment();
                        }}
                        style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                    >
                        <img src={user.avatar || image.avatar} alt="" className={cs('avatarImg')} />
                        <input
                            type="text"
                            className={cs('InputComment')}
                            placeholder="Nhập bình luận..."
                            required={true}
                            onInvalid={(e) => e.target.setCustomValidity('Hãy nhập bình luận của bạn')}
                            onInput={(e) => e.target.setCustomValidity('')}
                            value={cmtValueInput}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (!inputValue.startsWith(' ')) {
                                    setCmtValueInput(e.target.value);
                                }
                            }}
                        />
                        <button className={cs('btnSend')}>Đăng</button>
                    </form>
                ) : (
                    <h2 className={cs('textNote')}>
                        Bạn cần <Link to="/login">đăng nhập </Link> để comments
                    </h2>
                )}
            </div>

            {comments.length < 1 ? (
                <h2 style={{ textAlign: 'center', color: '#fe2c55', marginTop: '20px' }}>Hiện chưa có bình luận nào</h2>
            ) : (
                <>
                    <ul className={cs('containComment')}>
                        {comments &&
                            comments.map((comment, index) => (
                                <li key={index} className={cs('commentItem')}>
                                    <img
                                        src={comment.userId.avatar || image.avatar}
                                        alt=""
                                        className={cs('avatarImg')}
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div className={cs('commentItem-wrap')}>
                                            <h2>{comment.userId.name}</h2>
                                            <p
                                                className={cs('contentComment')}
                                                contentEditable={comment._id == showUpdateBtn}
                                                suppressContentEditableWarning={true}
                                                id={comment._id}
                                                style={
                                                    comment._id == showUpdateBtn
                                                        ? {
                                                              outline: '2px solid rgba(22, 24, 35, 0.2)',
                                                              borderRadius: '10px',
                                                              padding: '2px 10px',
                                                          }
                                                        : {}
                                                }
                                            >
                                                {comment.content}
                                            </p>
                                            {comment._id == showUpdateBtn && (
                                                <button
                                                    style={{
                                                        display: 'block',
                                                        backgroundColor: 'rgba(22, 24, 35, 0.1)',
                                                        color: 'black',
                                                        marginLeft: '10px',
                                                    }}
                                                    onClick={() => handleCancle(comment._id, comment.content)}
                                                >
                                                    Hủy
                                                </button>
                                            )}

                                            {comment._id == showUpdateBtn && (
                                                <button
                                                    style={{ display: 'block' }}
                                                    onClick={() => handleUpdateContent(comment._id, comment.content)}
                                                >
                                                    Cập nhật
                                                </button>
                                            )}
                                        </div>
                                        <span className={cs('timeComment')}>
                                            {moment(comment.createdAt).fromNow().replace('vài giây trước', 'vừa xong')}
                                        </span>
                                    </div>
                                    {user && comment.userId._id == user.id && (
                                        <div>
                                            <Tippy
                                                interactive
                                                visible={menu && comment._id == cmtId}
                                                offset={[0, -2]}
                                                delay={[0, 700]}
                                                placement="bottom"
                                                render={(attrs) => (
                                                    <div className={cs('more-options')} tabIndex="-1" {...attrs}>
                                                        <Wrapper className={cs('menu-popper')}>
                                                            <button
                                                                className={cs('btn')}
                                                                onClick={() => {
                                                                    setMenu(false);
                                                                    setShowUpdateBtn(comment._id);
                                                                }}
                                                            >
                                                                Sửa
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setMenu(false);
                                                                    handleDeleteCmt(comment._id);
                                                                }}
                                                                className={cs('btn')}
                                                            >
                                                                Xóa
                                                            </button>
                                                        </Wrapper>
                                                    </div>
                                                )}
                                                onClickOutside={() => setMenu(false)}
                                            >
                                                <i
                                                    onClick={() => {
                                                        setMenu((menu) => !menu);
                                                        setCmtId(comment._id);
                                                    }}
                                                    className={cs('iconSend')}
                                                >
                                                    <FontAwesomeIcon className={cs('ellipsisIcon')} icon={faEllipsis} />
                                                </i>
                                            </Tippy>
                                        </div>
                                    )}
                                </li>
                            ))}
                    </ul>
                    <h4 className={cs('noMore')}>Đã hết kết quả</h4>
                </>
            )}
        </div>
    );
}

export default Comment;
