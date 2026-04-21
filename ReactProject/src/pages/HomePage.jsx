import Header from '../components/Header';
import './Main.css';
import vector1 from '../assets/Vector 1.svg';
import vector2 from '../assets/Vector 2.svg';
import vector3 from '../assets/Vector 3.svg';
import { Link } from "react-router-dom";
import PageWrapper from "./PageWrapper";
function HomePage(){
 return(
<PageWrapper baseWidth={365} baseHeight={665}>
  <div className = "Main">
      <img src = { vector2 } alt = "vector-2" className = "vector2"></img>
      <img src = { vector1} alt = "vector-1" className  = "vector1"></img>
      <img src = { vector3 } alt  = "vector-3" className = "vector3"></img>
  <Header className = "Header"/>
  <div className = "MainText">
   <p className = "Text">DONATE TO</p>
   <p className = "Text">UKRAINIAN ARMY</p>
   <p className = "AnotherText"></p>
  </div>
  <div className = "AnotherText">
    <p className = "another1">Закликаємо зробити це ще приємнішим способом.</p>
    <p className = "another2"> Ваше Radio KVIT</p>
  </div>
  <div className = "MainButton">
   <Link to = '/datepage' className = "song-button">
   ЗАМОВИТИ ПІСНЮ
   </Link>
  </div>
  <div className = "Info">
    <div className = "design">
    <p className = "InfoText">**</p>
    </div>
   <p className = "InfoText">Все просто: замовляєш пісню, донатиш, і вона звучатиме на плацу - спеціально для тебе</p>
  </div>
</div>
</PageWrapper>
 )
}

export default HomePage;