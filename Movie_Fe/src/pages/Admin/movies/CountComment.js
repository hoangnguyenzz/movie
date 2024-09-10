import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCountComments } from '~/apiService/comment';

function CountCmt({ movieId }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const comment = async () => {
            try {
                const count = await getCountComments(movieId);
                setCount(count.counts);
            } catch (error) {
                console.log(error);
            }
        };
        comment();
    }, [movieId]);
    return (
        <td className="text-center">
            <Link
                to={'/admin/dashboard/movies/comment/' + movieId}
                style={{ textDecoration: 'underline', color: '#fe2c55' }}
            >{`Chi tiết(${count})`}</Link>
        </td>
    );
}

export default memo(CountCmt);
