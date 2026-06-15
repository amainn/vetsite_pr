import Header from './components/Header'
import Footer from './components/Footer'

function Service() {
  return (
    <>
    <Header/>
      <table id="servicetable">
        <caption>Предлагаемые услуги</caption>
        <thead>
            <tr>
                <th>Категория</th>
                <th>Направление</th>
                <th>Наименование услуги</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td rowSpan="4">Прием и консультации</td>
                <td rowSpan="2">Первичный прием</td>
                <td>Консультация терапевта</td>
            </tr>
            <tr>
                <td>Консультация узкого специалиста</td>
            </tr>
            <tr>
                <td rowSpan="2">Повторный прием</td>
                <td>Контрольный осмотр</td>
            </tr>
            <tr>
                <td>Online-консультация</td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <td rowSpan="8">Диагностика</td>
                <td rowSpan="4">Лаборатория</td>
                <td>Общий анализ крови</td>
            </tr>
            <tr>
                <td>Биохимический анализ крови</td>
            </tr>
            <tr>
                <td>Анализ мочи</td>
            </tr>
            <tr>
                <td>Анализ кала</td>
            </tr>
            <tr>
                <td rowSpan="4">Инструментальная</td>
                <td>УЗИ (одна зона)</td>
            </tr>        
            <tr>
                <td>УЗИ (комплексное)</td>
            </tr>
            <tr>
                <td>Рентген (1 снимок)</td>
            </tr>
            <tr>
                <td>ЭКГ</td>
            </tr>
        </tbody>
      </table>

      <Footer/>
    </>
  )
}

export default Service
