import Detail from '~/pages/Detail';
import Category from '~/pages/Category';
import GridType from '~/pages/GridType';
import WatchMovie from '~/pages/WatchMovie';
import Profile from '~/pages/Profile';

const allRoute = [
    { path: '/', component: Category },
    { path: '/profile', component: Profile },
    { path: '/:category', component: Category },
    { path: '/:category/:slug', component: Detail },
    { path: '/:category/mores/:type', component: GridType },
    { path: '/genres/:name/:id', component: GridType },
    { path: '/:category/:id/watch/:slug', component: WatchMovie },
];
export default allRoute;
