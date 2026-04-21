import Header from '../components/Header';
import './Main.css';
import heart from '../assets/Heart 2.svg';
import TextForFinal from '../assets/TextForFinal.svg';
import twitter from '../assets/Twitter.svg';
import instagram from '../assets/Instagram.svg';
import whatsapp from '../assets/WhatsApp.svg';
import PageWrapper from './PageWrapper';
function FinalPage(){

 return(
  <PageWrapper baseWidth={365} baseHeight={665}>
  <div className = "Main">
   <Header/>
   <img src = { heart } className = "heart-svg"></img>
   <img src = { TextForFinal } className = "final-text-svg"></img>
   <div className = "info-final-text">
    <p className = "InfoText">
     Незабаром вона вже гратиме на плацах Академії.
    </p>
    <p className = "InfoText">
     А поки пропонуємо вам підписатися
    </p>
    <p className = "InfoText">
     на наші соцмережі, аби завжди
    </p>
    <p className = "InfoText">
     бути в курсі оновлень від нашої СО!
    </p>
    <p className = "InfoText-final">
     Вашe Radio KVIT.
    </p>
    <p className = "InfoText-final">
     **Щоб повернутися на головну сторінку натисність на логотип
    </p>
   </div>
   <div className = "link-buttons">
    <a href = "https://www.instagram.com/radio.kvit?igsh=MWFnNDZ5NDhkcWU5dA%3D%3D&utm_source=qr" target='_blank'><img src = { instagram } className = "inst"></img></a>
    <a href= "https://whatsapp.com/channel/0029Vaw0oHJ3LdQNxxxeVD2N" target='_blank'><img src = { whatsapp } className = "wtsapp"></img></a>
    <a href = "https://x.com/radiokvit?s=21" target='_blank'><img src = { twitter } className = "tw"></img></a>
   </div>
  </div>
  </PageWrapper>
 )
}

export default FinalPage;