import React from 'react'
import * as s from './Project.styles'

const Project = props => {
    const project = props.match.params.project;
    const projects = {
        project1: {
            img: '/images/sample.jpg',
            description: 'project 1: lorem ipsum'
        },
        project2: {
            img: '/images/sample.jpg',
            description: 'project 2: lorem ipsum'
        },
        project3: {
            img: '/images/sample.jpg',
            description: 'project 3: lorem ipsum'
        },
        project4: {
            img: '/images/sample.jpg',
            description: 'project 4: lorem ipsum'
        }
    }


    return (
        <s.ProjectContainer>
            <s.ProjectImage img={projects[project]['img']}/>
            <s.ProjectDescription>{projects[project]['description']}</s.ProjectDescription>
        </s.ProjectContainer>
    )
}

export default Project
