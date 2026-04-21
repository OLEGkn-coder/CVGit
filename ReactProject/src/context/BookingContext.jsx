import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue, runTransaction } from "firebase/database";

const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const initialState = { date: null, time: null, song: "", receipt: null, comment: "" };

  const [bookingData, setBookingData] = useState(() => {
    const saved = localStorage.getItem("bookingData");
    return saved ? JSON.parse(saved) : initialState;
  });

  const [bookedSlots, setBookedSlots] = useState({});

  useEffect(() => {
    const slotsRef = ref(db, "bookedSlots");
    const unsubscribe = onValue(slotsRef, (snapshot) => {
      const data = snapshot.val() || {};
      setBookedSlots(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
  }, [bookingData]);

  const addBooking = async (date, time) => {
    const slotRef = ref(db, `bookedSlots/${date}/${time}`);
    let success = false;

    await runTransaction(slotRef, (currentData) => {
      if (!currentData) {
        success = true;
        return { count: 1 };
      }
      if (currentData.count >= 4) {
        success = false;
        return currentData;
      }
      success = true;
      return { count: currentData.count + 1 };
    });

    return success;
  };

  const resetBooking = () => {
    setBookingData(initialState);
    localStorage.removeItem("bookingData");
  };

  return (
    <BookingContext.Provider
      value={{ bookingData, setBookingData, bookedSlots, addBooking, resetBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
