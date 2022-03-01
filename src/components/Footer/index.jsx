/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import iconLinkedin from '../../images/linkedin.svg';
import iconGithub from '../../images/github.svg';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div id="div-primary">
          <div>
            ©
            <a href="https://imgeff.github.io/" target="_blank" id="link-portfolio"> Gefferson Batista </a>
            - 2022
          </div>
          <nav id="nav-footer">
            <a href="https://www.linkedin.com/in/geffbatista/" target="_blank"><img src={ iconLinkedin } alt="Linkedin" id="link-edin" /></a>
            <a href="https://github.com/imgeff" target="_blank"><img src={ iconGithub } alt="Github" id="link-github" /></a>
          </nav>
        </div>
        <div id="div-secondary" />
      </footer>
    );
  }
}

export default Footer;
