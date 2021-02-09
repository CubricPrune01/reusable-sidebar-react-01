import React from 'react';
import {Switch, Route} from 'react-router-dom'

// Components
import Home from './components/Mainview/Home/Home.components'
import About from './components/Mainview/About/About.components'
import Skills from './components/Mainview/Skills/Skills.components'
import Project from './components/Mainview/Projects/Project/Project.components'
import Projects from './components/Mainview/Projects/Projects.components'
import Contact from './components/Mainview/Contact/Contact.components'

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/skills' component={Skills} />
            <Route exact path='/projects' component={Projects} />
            <Route exact path='/projects/:project' component={Project} />
            <Route exact path='/contact' component={Contact} />
        </Switch>
    )
}

export default Routes
