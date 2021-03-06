import React, {useState, useEffect} from 'react';
import { AnimatePresence, motion} from 'framer-motion'
import { Link } from 'react-router-dom';
import * as s from './Sidebar.styles';

const Sidebar = props => {
    const { 
        backgroundImage='',
        sidebarHeader={
            fullName: '',
            shortName: ''
        },
        menuItems=[],
        fonts= {
            header: '',
            menu: ''
        },
        colorPalette ={
            bgColor1: 'rgba(11, 171, 100, 0.8)',
            bgColor2: 'rgba(59, 183, 143, 0.8)',
            fontColor: 'rgba(22, 46, 39)',
            fontColorSelected: 'rgba(255, 255, 255)',
            dividerColor: 'rgba(122, 204, 178)',
            selectedBackgroundCollapsedMode: 'light'
        }
    } = props;

    // State
    const [selected, setSelectedMenuItem] = useState(menuItems[0].name);
    const [isSidebarOpen, setSidebarState] = useState(true);
    const [header, setHeader] = useState(sidebarHeader.fullName);
    const [subMenusStates, setSubmenus] = useState({});



    //Effect

    //Update of header state 
    useEffect(() => {
        isSidebarOpen ? setTimeout(() => setHeader(sidebarHeader.fullName), 200) : setHeader(sidebarHeader.shortName);
    }, [isSidebarOpen, sidebarHeader])

    //Update of sidebar state
    useEffect(() => {
        const updateWindowWidth = () => {
            if(window.innerWidth < 1280 && isSidebarOpen) setSidebarState(false);
            else setSidebarState(true)
        }
        window.addEventListener('resize', updateWindowWidth);

        return () => window.removeEventListener('resize', updateWindowWidth);
    }, [isSidebarOpen])

    //Add index of menu items with submenus to state
    useEffect(() => {
        const newSubmenus = {};

        menuItems.forEach((item, index) => {
            const hasSubmenus = !!item.subMenuItems.length;
            
            if(hasSubmenus) {
                newSubmenus[index] = {};
                newSubmenus[index]['isOpen'] = false;
                newSubmenus[index]['isSelected'] = null;
            }
        })

        setSubmenus(newSubmenus);

    },[menuItems]);

    const handleMenuItemClick = (name, index) => {
        setSelectedMenuItem(name)

        const subMenusCopy = JSON.parse(JSON.stringify(subMenusStates));

        if(subMenusStates.hasOwnProperty(index)) {
            subMenusCopy[index]['isOpen'] = !subMenusStates[index]['isOpen']
            setSubmenus(subMenusCopy)
        } else {
            for(let item in subMenusStates) {
                subMenusCopy[item]['isOpen'] = false;
                subMenusCopy[item]['isSelected'] = null;
            }
            setSubmenus(subMenusCopy);
        }
    }

    const handleSubMenuItemClick = (menuItemIdx, subMenuItemIdx) => {
        const subMenusCopy = JSON.parse(JSON.stringify(subMenusStates));

        subMenusCopy[menuItemIdx]['selected'] = subMenuItemIdx;
        setSubmenus(subMenusCopy);
    }

    const menuItemJSX = menuItems.map((item, index) => {
        const isItemSelected = selected === item.name;

        const hasSubmenus = !!item.subMenuItems.length;
        const isOpen = subMenusStates[index]?.isOpen;

        const subMenusJSX = item.subMenuItems.map((subMenuItem, subMenuItemIndex) => {
            const isSubmenuItemSelected = subMenusStates[index]?.selected === subMenuItemIndex;
            return (
                <Link to={`${item.to}${subMenuItem.to}` } style={{textDecoration: 'none'}} key={subMenuItemIndex}>
                    <s.SubMenuItem 
                        onClick={() => handleSubMenuItemClick(index, subMenuItemIndex)}
                        selected={isSubmenuItemSelected}
                        colorPalette={colorPalette}
                    >
                        {subMenuItem.name}
                    </s.SubMenuItem>
                </Link>
            )
        })

        return (
            <s.ItemContainer key={index}>
                <Link to={item.to} style={{ textDecoration: 'none'}}>
                    <s.MenuItem 
                    font={fonts.menu}
                    selected={isItemSelected}
                    onClick={() => handleMenuItemClick(item.name, index)}
                    isSidebarOpen={isSidebarOpen}
                    isOpen={isOpen}
                    colorPalette={colorPalette}
                    >
                        <s.Icon isSidebarOpen={isSidebarOpen} src={item.icon} />
                        <s.Text isSidebarOpen={isSidebarOpen}>{item.name}</s.Text>
                        {hasSubmenus && isSidebarOpen && (
                            <s.DropdownIcon selected={isItemSelected} isOpen={isOpen} colorPalette={colorPalette}/>
                            )}
                    </s.MenuItem>
                </Link>
                {/* Display submenus if they exists */}
                <AnimatePresence>
                    {hasSubmenus && isOpen &&(
                        <motion.nav
                            initial={{opacity: 0, y: -15}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.35}}
                            exit={{opacity: 0, x: -30}}
                        >
                            <s.SubMenuItemContainer isSidebarOpen={isSidebarOpen} colorPalette={colorPalette}>{subMenusJSX}</s.SubMenuItemContainer>    
                        </motion.nav>
                    )}
                </AnimatePresence>
            </s.ItemContainer>
        )
    });

    return(
        <s.SidebarContainer backgroundImage = {backgroundImage} isSidebarOpen={isSidebarOpen} colorPalette={colorPalette}>
            <s.SidebarHeader font={fonts.header}>{header}</s.SidebarHeader>
            <s.MenuItemContainer>{menuItemJSX}</s.MenuItemContainer>
            <s.TogglerContainer onClick={() => setSidebarState(!isSidebarOpen)}>
                <s.Toggler />
            </s.TogglerContainer>
            <s.LinkIconContainer isSidebarOpen={isSidebarOpen}>
                <s.LinkedIcon isSidebarOpen={isSidebarOpen}>
                    <a href="https://www.linkedin.com/in/cheong-lee/">
                        <span className="icon"><img alt='linkedin logo' src='linkIcons/linkedin.svg' /></span>
                    </a>
                </s.LinkedIcon>
                <s.LinkedIcon isSidebarOpen={isSidebarOpen}>
                    <a href="https://github.com/CubricPrune01">
                        <span className="icon"><img alt='linkedin logo' src='linkIcons/github.svg' /></span>
                    </a>
                </s.LinkedIcon>
            </s.LinkIconContainer>
        </s.SidebarContainer>
    );
}

export default Sidebar
