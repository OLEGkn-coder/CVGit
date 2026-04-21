import React, { useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import one from "../assets/1.svg";
import Text1 from "../assets/Text1.svg";
import "./CustomDatepicker.css";
import PageWrapper from "./PageWrapper";

function DatePage() {
  const { bookingData, setBookingData, bookedSlots } = useBooking();
  const [selectedDate, setSelectedDate] = useState(
    bookingData.date ? new Date(bookingData.date) : null,
  );

  const times = [
    "9:50-10:00",
    "11:20-11:40",
    "13:00-13:30",
    "14:50-15:00",
    "16:20-16:30",
    "17:50-18:00",
  ];

  const handleDateChange = (date) => {
    const formatted = date.toISOString().split("T")[0];
    setSelectedDate(date);
    setBookingData({ ...bookingData, date: formatted, time: null });
  };

  const fullyBookedDates = Object.keys(bookedSlots).filter((date) => {
    const slots = bookedSlots[date] || {};
    return times.every((t) => (slots[t]?.count || 0) >= 4);
  });

  const handleDayClassName = (dateObj) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const formatted = dateObj.toISOString().split("T")[0];

    if (dateObj < today) return "date-disabled";
    if (fullyBookedDates.includes(formatted)) return "date-disabled";
    const day = dateObj.getDay();
    if (day === 0 || day === 6) return "date-disabled";
    return "";
  };

  return (
    <PageWrapper baseWidth={365} baseHeight={665}>
      <div className="Main">
        <Header />
        <img src={Text1} className="text-svg" alt="" />
        <img src={one} className="number-svg" alt="" />
        <div className="Choosing-date">
          <DatePicker
            inline
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd.MM.yyyy"
            minDate={new Date()}
            dayClassName={handleDayClassName}
          />
        </div>
        <div className="nav-buttons-first-page">
          <Link
            to={bookingData.date ? "/timepage" : "#"}
            className={`nextPage ${!bookingData.date ? "disabled" : ""}`}
            onClick={(e) => {
              if (!bookingData.date) {
                e.preventDefault();
                alert("Будь ласка, оберіть дату!");
              }
            }}
          >
            ДАЛІ
          </Link>
        </div>
        <NavBar />
      </div>
    </PageWrapper>
  );
}

export default DatePage;
