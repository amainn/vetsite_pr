import Header from './components/Header'
import Footer from './components/Footer'
import './About.css'


function About() {
  return (
    <>
    <Header/>
      <div className = "about">
        <div className="abouttext">
        <p id="abouthead">НАША ЦЕЛЬ</p>
        <p>Продлить жизнь вашим любимцам и сделать её качественной.</p>
        <p>Для этого у нас есть всё: собственная лаборатория, современная диагностика и искренняя любовь к животным. Мы не работаем «от звонка до звонка», 
            мы живем своей работой, чтобы каждый хвост, попавший к нам, ушел домой здоровым и счастливым.</p>
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default About