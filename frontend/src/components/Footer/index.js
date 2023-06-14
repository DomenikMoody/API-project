import "./Footer.css"
const Footer = () => {
    return (
      <div className="wholeFooter">
        <div>
          <div className='icons-bottom'>
            <a className="GitHub" href="https://github.com/DomenikMoody" target="_blank"><i class="fab fa-github"></i></a>
            <a className="BsLinkedin" href="https://www.linkedin.com/in/domenik-moody-90370521b/" target="_blank"><i class="fab fa-linkedin"></i></a>
          </div>
          <div>
            <p className='whatweused'>
              Created by Domenik Moody<br/>
              Flask ~ Sequelize ~ Redux ~ JavaScript ~ React ~ Express
            </p>
          </div>
        </div>
      </div>
    );
  };

export default Footer
