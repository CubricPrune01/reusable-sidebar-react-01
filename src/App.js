import React from 'react';
import * as s from './App.styles';
import * as Palette from './colors'

//Components
import Sidebar from './components/Sidebar/Sidebar.components';
import Mainview from './components/Mainview/Mainview.component';

const App = () => {

  const backgroundImage = 'images/mountain.jpg';
  const sidebarHeader = {
    fullName: 'Yo Yo Travel',
    shortName: 'YO'
  };
 
  const fonts = {
    header: 'ZCOOL Kuaile',
    menu: 'Poppins'
  }
 
  const menuItems = [
    {name: 'Home', to: '/', icon: 'icons/home.svg', subMenuItems: []},
    {name: 'About', to: '/about', icon: 'icons/about.svg', subMenuItems: []},
    {name: 'Skills', to: '/skills', icon: 'icons/skills.svg', subMenuItems: []},
    {name: 'Projects', to: '/projects', icon: 'icons/projects.svg', 
    subMenuItems: [
      {name: 'Project 1', to: '/project1'},
      {name: 'Project 2', to: '/project2'},
      {name: 'Project 3', to: '/project3'},
      {name: 'Project 4', to: '/project4'}
    ]},
    {name: 'Contact', to: '/contact', icon: 'icons/contact.svg', subMenuItems: []}
  ];

  return (
    <s.App>
      <Sidebar 
        backgroundImage={backgroundImage}
        sidebarHeader={sidebarHeader}
        menuItems={menuItems}
        fonts={fonts}
        colorPalette={Palette.preDark}
      />
      <Mainview />
    </s.App>
  );
}

export default App;
