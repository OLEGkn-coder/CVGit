import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "./Main.css";
import NavBar from "../components/NavBar";
import two from "../assets/2.svg";
import TextForTime from "../assets/TextForTime.svg";
import vector from "../assets/Vector.svg";
import backpage from "../assets/backpage.svg";
import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import TimeText from "../components/TimeText";
import PageWrapper from "./PageWrapper";
function TimePage() {
  const { bookingData, setBookingData, bookedSlots } = useBooking();

  const times = ["11:20-11:40", "13:00-13:30"];

  const [selectedTime, setSelectedTime] = useState(bookingData.time || null);

  useEffect(() => {
    setSelectedTime(bookingData.time || null);
  }, [bookingData.time]);

  const isTimeBooked = (time) => {
    if (!bookingData.date) return false;
    const slots = bookedSlots[bookingData.date] || {};
    return (slots[time]?.count || 0) >= 4;
  };

  const handleSelectTime = (time) => {
    if (isTimeBooked(time)) return;
    setSelectedTime(time);
    setBookingData({ ...bookingData, time });
  };

  return (
    <PageWrapper baseWidth={365} baseHeight={665}>
      <div className="Main">
        <Header />
        <img src={two} className="number-two-svg" alt="" />
        <TimeText
          className="text-svg"
          style={{ width: "280px", height: "auto" }}
        />

        <div className="Button-time">
          <div className="Time-line-one">
            {times.slice(0, 3).map((time) => (
              <button
                key={time}
                className={` ${isTimeBooked(time) ? "booked" : ""} time-button ${selectedTime === time ? "active" : ""}`}
                onClick={() => handleSelectTime(time)}
                disabled={isTimeBooked(time)}
              >
                {time}
              </button>
            ))}
          </div>
          <div className="Time-line-two">
            {times.slice(3, 6).map((time) => (
              <button
                key={time}
                className={`${isTimeBooked(time) ? "booked" : ""} time-button ${selectedTime === time ? "active" : ""} `}
                onClick={() => handleSelectTime(time)}
                disabled={isTimeBooked(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="nav-buttons">
          <Link to="/datepage" className="backPage">
            <img src={backpage} alt="" className="vector-back-button" />
            НАЗАД
          </Link>
          <Link
            to={bookingData.time ? "/songpage" : "#"}
            className={`nextPage ${!bookingData.time ? "disabled" : ""}`}
            onClick={(e) => {
              if (!bookingData.time) {
                e.preventDefault();
                alert("Будь ласка, оберіть час!");
              }
            }}
          >
            ДАЛІ <img src={vector} alt="" />
          </Link>
        </div>

        <NavBar />
      </div>
    </PageWrapper>
  );
}

export default TimePage;
