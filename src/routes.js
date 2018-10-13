
import Home from './components/Home.vue';
import Edit from './components/PlanEdit.vue';
import Test from './components/Test.vue';
import Graph from './components/Graph.vue';
import Calibrate from './components/Calibrate.vue';

export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/editplan/:id',
        name: 'edit',
        component: Edit
    },
    {
        path: '/test',
        name: 'test',
        component: Test
    },
    {
        path: '/graph',
        name: 'graph',
        component: Graph
    },
    {
        path: '/calibrate',
        name: 'calibrate',
        component: Calibrate
    }
]