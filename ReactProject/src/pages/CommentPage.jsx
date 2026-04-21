import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import five from '../assets/5.svg';
import TextForComment from '../assets/TextForComment.svg';
import backpage from '../assets/backpage.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import emailjs from '@emailjs/browser';
import PageWrapper from './PageWrapper';

function CommentPage() {
  const { bookingData, setBookingData, addBooking, resetBooking } = useBooking();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    emailjs.init('XYkiRdWDDl3GG3Gkn');
  }, []);

  const handleConfirm = async () => {
    if (!bookingData.date || !bookingData.time) {
      alert("Оберіть дату та час перед підтвердженням!");
      return;
    }

    if (!bookingData.receipt) {
      alert("Завантажте квитанцію перед підтвердженням!");
      return;
    }

    if(!bookingData.comment){
      alert("Введіть плац для підтвердження!");
      return;
    }

    const success = await addBooking(bookingData.date, bookingData.time);

    if (!success) {
      alert("На жаль, цей час вже заповнений. Оберіть інший слот.");
      return;
    }

    try {
      await emailjs.send(
        "service_twcdbwr",
        "template_lj70xc9",
        {
          song: bookingData.song || "",
          date: bookingData.date || "",
          time: bookingData.time || "",
          comment: bookingData.comment || "",
          receipt: bookingData.receipt || "",
        },
        "XYkiRdWDDl3GG3Gkn"
      );

      alert("Ваше бронювання підтверджено ✅");
      resetBooking();
      navigate("/finalpage");
    } catch (error) {
      console.error("Помилка відправки повідомлення:", error);
      alert("Сталася помилка при відправці. Спробуйте ще раз.");
    }
  };

  return (
    <PageWrapper baseWidth={365} baseHeight={665}>
    <div className="Main">
      <Header />
      <img className="number-five-svg" src={five} alt="" />
      <img className="text-svg" src={TextForComment} alt="" />
      <div className="info-comment-div">
        <p className="InfoText">Також якщо у вас є специфічні побажання з приводу</p>
        <p className="InfoText">чого завгодно, ви можете залишити їх</p>
      </div>
      <div className = "info-comment-div-two">
        <p className="InfoText">Обов'язково вкажіть плац на якому хочете</p>
        <p className="InfoText">почути пісню (перший або другий):</p>
      </div>

      <div className="input-comment-div">
        <input
          type="text"
          placeholder="Пачку дзиґар і хмільне міцне літрове..."
          className="input-comment"
          value={bookingData.comment}
          onChange={(e) =>
            setBookingData({ ...bookingData, comment: e.target.value })
          }
        />
      </div>

      <div className="nav-buttons">
        <Link to="/donatepage" className="back">
          <img src={backpage} alt="Назад" />
        </Link>
        <button className="next" onClick={handleConfirm} disabled={uploading}>
          ПІДТВЕРДИТИ
        </button>
      </div>

      <NavBar />
    </div>
    </PageWrapper>
  );
}

export default CommentPage;
