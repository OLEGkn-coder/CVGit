import Header from '../components/Header';
import './Main.css';
import NavBar from '../components/NavBar';
import three from '../assets/3.svg';
import TextForSong from '../assets/TextForSong.svg';
import vector from '../assets/Vector.svg';
import backpage from '../assets/backpage.svg';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import SongText from '../components/SongText';
import PageWrapper from './PageWrapper';
function SongPage(){
  const { bookingData, setBookingData } = useBooking();
 return(
  <PageWrapper baseWidth={365} baseHeight={665}>
  <div className = "Main">
   <Header/>

    <img src = { three } className = "number-three-svg"></img>
    <SongText className="text-svg" style={{ width: '280px', height: 'auto' }} />

   <div className = "input-div">
    <input 
      className = "name-of-song" 
      type='text' 
      placeholder='Олег - Шугар...'
      value={bookingData.song}
      onChange={(e) => 
        setBookingData({ ...bookingData, song: e.target.value })
      }
      maxLength={100}>  
    </input>
   </div>
   <div className = "info-div">
    <p className = "InfoText">
      ** Просимо звернути увагу! За правилами нашої СО
      ми НЕ вмикаємо пісні, що були написані росіянами
      і пісні російською мовою, а також пісні 
      з нецензурною лексикою.
    </p>
    <p className = "InfoText">
     У разі недотримання правил ми не будемо вмикати
     замовлений трек 
     </p>
   </div>
   <div className = "nav-buttons">
    <Link to = '/timepage' className = "backPage"><img src = { backpage } className = "vector-back-button"></img>НАЗАД</Link>
    <Link
  to={bookingData.song.trim() ? "/donatepage" : "#"}
  className={`nextPage ${!bookingData.song.trim() ? "disabled" : ""}`}
  onClick={(e) => {
    if (!bookingData.song.trim()) {
      e.preventDefault();
      alert("Будь ласка, введіть назву пісні!");
    }
  }}
>
  ДАЛІ<img src={vector} className="vector-next-button" />
</Link>

   </div>
   <NavBar/>
  </div>
  </PageWrapper>
 )
}

export default SongPage;