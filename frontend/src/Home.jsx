import './Home.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useNavigate } from 'react-router-dom'

function Home(){
    const navigate = useNavigate();

  return (
    <> 
      <Header/>
      <div className = "maininfo">
        <p id="mainhead">ХВОСТ ЛЕЧИМ, НОС — В ПОРЯДКЕ!</p>
        <p>Всё для здоровья вашего любимца под одной крышей: УЗИ, рентген и собственная лаборатория с анализами за 15 минут.</p>
        <button className="bookon" type="button" onClick={() => navigate('/profile')}>Записаться</button>
      </div>

      <section id="second">
          <p style={{paddingBottom: '80px'}}>Что мы предлагаем?</p>
          <div className="offer">
              <div className="circle-item">
                  <div className="circle" style={{backgroundImage: "url('/static/surgery.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="description">
                      <p style={{fontSize: '32px', fontWeight: 400}}>Хирургия</p>
                      <p>Профессиональный подход к оперативному лечениию любой сложности</p>
                  </div>
              </div>
              <div className="circle-item">
                  <div className="circle" style={{backgroundImage: "url('/static/pharm.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="description">
                      <p style={{fontSize: '32px', fontWeight: 400}}>Фармацевтика</p>
                      <p>Широкий ассортимент лекарств, лечебных кормов и средств ухода</p>
                  </div>
              </div>
              <div className="circle-item">
                  <div className="circle" style={{backgroundImage: "url('/static/groom.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="description">
                      <p style={{fontSize: '32px', fontWeight: 400}}>Зооэстетика</p>
                      <p>Комплексная гигиена и косметологтческие процедуры для Вашего питомца</p>
                  </div>
              </div>
          </div>
      </section>
      
      <section id="third">
          <p style={{paddingBottom: '80px'}}>Почему именно мы?</p>
          <div className="why_us">
              <div className="rectangle-item">
                  <div className="rectangle" style={{backgroundImage: "url('/static/dog1.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="description">
                      Мы не боимся трудных диагнозов и готовы бороться за жизнь питомца в самых непростых ситуациях. Наши хирурги и терапевты имеют успешный опыт проведения сложных операций и выхаживания тяжелых больных.
                  </div>
              </div>
              <div className="rectangle-item">
                  <div className="description">
                      Вам не придется искать узких специалистов в других местах. В нашей клинике есть всё: терапия, хирургия, кардиология и офтальмология. Ваш питомец получит помощь комплексно в одном месте без лишней беготни по городу.
                  </div>
                  <div className="rectangle" style={{backgroundImage: "url('/static/dog2.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              </div>
              <div className="rectangle-item">
                  <div className="rectangle" style={{backgroundImage: "url('/static/dog3.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                  <div className="description">
                      Мы строим прозрачные отношения: подробно рассказываем о диагнозе, показываем снимки и объясняем назначения понятным языком. Для нас важно, чтобы вы не просто оставили питомца, а ушли с полным пониманием плана лечения и спокойствием на душе.
                  </div>
              </div>
          </div>
      </section>

      <section id="fourth">
          <p>Запишите своего питомца на первую консультацию</p>
          <button className="bookon" type="button" onClick={() => navigate('/profile')}>Записаться</button>
      </section>

      <Footer/>
    </>
  )
}

export default Home