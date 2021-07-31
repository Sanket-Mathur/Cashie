import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CategoryIcon from '@material-ui/icons/Category';
import LayersIcon from '@material-ui/icons/Layers';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';

const sidebarLinksAdmin = [
    { id: '1', label: 'Dashboard', icon: <HomeIcon />, page: '' },
    { id: '2', label: 'User', icon: <PeopleAltIcon />, page: 'user' },
    { id: '3', label: 'Category', icon: <CategoryIcon />, page: 'category' },
    { id: '4', label: 'Product', icon: <LayersIcon />, page: 'product' },
    { id: '5', label: 'Transaction', icon: <ReceiptIcon />, page: 'transaction' },
    { id: '6', label: 'Report', icon: <AssessmentIcon />, page: 'report'}
];

const sidebarLinksCashier = [
    { id: '1', label: 'Dashboard', icon: <HomeIcon />, page: '' },
    { id: '4', label: 'Product', icon: <LayersIcon />, page: 'product' },
    { id: '5', label: 'Transaction', icon: <ReceiptIcon />, page: 'transaction' },
];

export { sidebarLinksAdmin, sidebarLinksCashier };