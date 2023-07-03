import { FaShoppingCart, FaHeart, FaUserAlt } from '../icons/icons'

const navItems = [
    {
        title: "MEN",
        url: "/shop",
        className: 'nav-link',
        id: 1,
    },
    {
        title: "WOMEN",
        url: "/shop",
        className: 'nav-link',
        id: 2,
    },
    {
        title: "SHOP",
        url: "/shop",
        className: 'nav-link',
        id: 3,
    },
]

const navIconsData = [
    {
        id: "user-icon",
        profileClass: 'profile-box',
        title: 'Profile',
        url:'/login',
        txtClassName: "icon-txt",
        icon: <FaUserAlt className='user-icon icon ' />,
        logBtn: "Log out",
    },
    {
        id: "wishlist-icon",
        title: 'Wishlist',
        url:'/wishlist',
        txtClassName: "icon-txt",
        icon: <FaHeart className='icon ' />,
    },
    {
        id: "cart-icon",
        title: 'Cart',
        url:'/cart',
        txtClassName: "icon-txt",
        icon: <FaShoppingCart className='cart-icon icon ' />,
    }
]

const contactUsMenu = [
    {
        title: "Help & Support",
        id: 1,
    },
    {
        title: "Feedback",
        id: 2,
    },
    {
        id: 3,
        title: "Become a Seller",
    }
]
const aboutUsMenu = [
    {
        title: "Our Story",
        id: 1,
    },
    {
        title: "Fanbook",
        id: 2,
    },
]

export { navItems, navIconsData, contactUsMenu, aboutUsMenu }