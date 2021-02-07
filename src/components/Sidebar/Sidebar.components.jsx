import React from 'react';
import * as s from './Sidebar.styles';

const Sidebar = props => {
    const { 
        backgroundImage='',
        sidebarHeader='',
        menuItems=[],
        fonts= {
            header: '',
            menu: ''
        }
    } = props;

    const menuItemJSX = menuItems.map((item, index) => {
        return (
            <s.MenuItem key={index} font={fonts.menu}>
                <s.Icon src={item.icon} />
                <s.Text>{item.name}</s.Text>
            </s.MenuItem>
        )
    })

    return(
        <s.SidebarContainer backgroundImage = {backgroundImage}>
            <s.SidebarHeader font={fonts.header}>{sidebarHeader}</s.SidebarHeader>
            <s.MenuItemContainer>{menuItemJSX}</s.MenuItemContainer>
        </s.SidebarContainer>
    )
}

export default Sidebar
