import { Link } from 'react-router-dom';

function Header(){
  return(
    <>
      <header>
          <nav className="menu">
              <img src="./static/temp.png" alt="Icon"/>
              <section id="menuchoose">
                  <Link to='/'>Главная</Link>
                  <Link to="/about">О нас</Link>
                  <Link to="/service">Услуги</Link>
                  <Link to="/pharmacy">Ветаптека</Link>
                  <Link to="/profile">Личный кабинет</Link>
              </section>
              <img src="./static/vector_temp.png" alt="altmenu"/>
          </nav>
      </header>
    </>
  )
}

export default Header