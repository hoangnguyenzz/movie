import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import useDebounce from '~/hooks/useDebounce';
import Tippy from '@tippyjs/react/headless';

import requestApi from '~/apiService';
import PopperWrapper from '~/components/Popper';
import SearchItem from './SearchItem';
import { Link, useNavigate } from 'react-router-dom';

const cs = classNames.bind(styles);
function SearchBox() {
    const [inputValue, setInputValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const navigate = useNavigate();

    const debouncedValue = useDebounce(inputValue, 500);

    useLayoutEffect(() => {
        if (!debouncedValue.trim()) {
            //reset lai mang sau khi xoa
            setSearchResult([]);
            return;
        }

        const loadlistresult = async () => {
            setLoading(true);

            const result = await requestApi.getSearch({ params: { keyword: debouncedValue } });
            setSearchResult(result.data);
            setLoading(false);
        };

        loadlistresult();
    }, [debouncedValue]);

    useEffect(() => {
        const ref = inputRef.current;
        const enterKey = (e) => {
            e.preventDefault();
            setShowResult(true);
            if (e.keyCode === 13) {
                navigate(debouncedValue !== '' ? `/search/mores/${debouncedValue}` : '');
                setShowResult(false);
                setInputValue('');
            }
        };
        ref.addEventListener('keyup', enterKey);
        return () => {
            ref.removeEventListener('keyup', enterKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    const handleClear = () => {
        setShowResult(false);
        setInputValue('');
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (!inputValue.startsWith(' ')) {
            setInputValue(inputValue);
        }
    };

    return (
        <div className={cs('wrapper')}>
            <Tippy
                interactive
                visible={!loading && showResult && debouncedValue.trim()}
                render={(attrs) => (
                    <div className={cs('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {searchResult.length > 0 ? (
                                <>
                                    <h4 className={cs('search-title')}>{`Kết quả cho '${debouncedValue}'`}</h4>
                                    <Link
                                        to={debouncedValue !== '' ? `/search/mores/${debouncedValue}` : ''}
                                        onClick={() => {
                                            setShowResult(false);
                                            setInputValue('');
                                        }}
                                    >
                                        <h4
                                            className={cs('search-title', 'see-more')}
                                        >{`Xem tất cả kết quả '${debouncedValue}'`}</h4>
                                    </Link>
                                    <div className={cs('result-scroll')}>
                                        {searchResult.map((result) => (
                                            <SearchItem
                                                // onClick={() => setShowResult(false)}
                                                onClick={() => {
                                                    setShowResult(false);
                                                    setInputValue('');
                                                }}
                                                key={result.id}
                                                data={result}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className={cs('noResult')}>{`Không có kết quả cho '${debouncedValue}'`}</p>
                            )}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={() => {
                    setShowResult(false);
                }}
            >
                <div className={cs('search')}>
                    <input
                        ref={inputRef}
                        value={inputValue}
                        placeholder="Nhập tên phim..."
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {inputValue && !loading && (
                        <button className={cs('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cs('loading')} icon={faSpinner} />}

                    <div className={cs('separate')}></div>
                    <a
                        href={debouncedValue !== '' ? `/search/mores/${debouncedValue}` : ''}
                        onClick={(e) => {
                            !debouncedValue && e.preventDefault();
                            setShowResult(false);
                            setInputValue('');
                        }}
                        className={cs('search-btn')}
                    >
                        <button onMouseDown={(e) => e.preventDefault()}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </a>
                </div>
            </Tippy>
        </div>
    );
}

export default SearchBox;
