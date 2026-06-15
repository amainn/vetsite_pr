import './Profile.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';

import Header from './components/Header'
import Footer from './components/Footer'


const LogoutButton = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/');
    };
    
    return <button onClick={handleLogout}>Выйти</button>;
};

function Profile() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('auth_token');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      procedure: '',
      appointment_date: '',
      appointment_time: ''
    },

    onSubmit: async (values, {resetForm, setSubmitting}) => {
      try{

        const responce = await axios.post('/api/appointments', values, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (responce.data.success) {
          alert("Вы успешно записались!");
          resetForm();
          await loadPage();
        }
        else{
          alert("Ошибка при отправке запроса: " + (responce.data.error || reesponce.data.message || "Неизвестная ошибка"));
        }
      }
      catch (error){
        console.error('Error:', error);
        alert("Ошибка при отправке запроса");
      }
      finally {
        setSubmitting(false);
      }
    }
  })

  useEffect(() => {
        if (!token) {
            console.log('No token, redirecting to login');
            navigate('/login');
            return;
        }
        loadPage();
    }, []); 
  
  const loadPage = async () => {
    setLoading(true);
    try{
      const responce = await axios.get('/api/appointments', {
        withCredentials: true,
        headers: {'Accept': 'application/json', 'Authorization': `Bearer ${token}`}
      });

      setAppointments(responce.data);
    }
    catch(error){
      navigate('/login');
      console.error('Error:', error);
      setAppointments([]);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => { loadPage();}, []);

    const procedureMap = {
    'vaccination': 'Вакцинация',
    'chipping': 'Чипирование',
    'ultrasound': 'УЗИ',
    'surgery': 'Хирургия',
    'dentistry': 'Стоматология',
    'parasites': 'Обработка от паразитов',
    'grooming': 'Груминг'
  };

  const procedureName = (value) => procedureMap[value] || value;
  const today = new Date().toISOString().split('T')[0];
  return (
    <>
    <Header/>
    <div className="profile"> 
      <section id="profile-menu">
      <div>
        <section id="create-ticket">
        <h1 style={{paddingBottom: '20px'}}>Записаться на прием</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className='form-field'>
            <select
              id="inputState"
              className="form-control"
              name="procedure"
              value={formik.values.procedure}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="">Выберите процедуру</option>
              {Object.entries(procedureMap).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
            {formik.touched.procedure && formik.errors.procedure && (
              <div style={{ color: 'red' }}>{formik.errors.procedure}</div>
            )}
          </div>

          <div className='form-field'>
            <input
              id="inputState"
              className="form-control"
              type="date"
              name="appointment_date"
              min={today}
              value={formik.values.appointment_date }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.appointment_date && formik.errors.appointment_date && (
              <div style={{ color: 'red' }}>{formik.errors.appointment_date}</div>
            )}
          </div>

          <div className='form-field'>
            <input
              id="inputState"
              className="form-control"
              type="time"
              name="appointment_time"
              value={formik.values.appointment_time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.appointment_time && formik.errors.appointment_time && (
              <div style={{ color: 'red' }}>{formik.errors.appointment_time}</div>
            )}
          </div>

          <button type="submit" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Отправка..." : "Записаться"}
          </button>
        </form>
        </section>
        <LogoutButton/>

      </div>

      <div>
        <h1 style = {{textAlign: 'center'}}>Ваши записи</h1>

        <div>
        <section id="app-table">
          {loading ? (
            <div>Загрузка...</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Процедура</th>
                  <th>Когда приходить</th>
                  <th>Во сколько</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td>{procedureName(appointment.procedure)}</td>
                    <td>{appointment.appointment_date}</td>
                    <td>{appointment.appointment_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      </div>

    </section>
    </div>
    
    
    <Footer/>
    </>
  )
}

export default Profile