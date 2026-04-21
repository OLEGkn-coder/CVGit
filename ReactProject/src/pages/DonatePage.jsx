import React, { useRef, useState } from "react";
import Header from "../components/Header";
import "./Main.css";
import NavBar from "../components/NavBar";
import four from "../assets/4.svg";
import TextForDonate from "../assets/TextForDonate.svg";
import vector from "../assets/Vector.svg";
import backpage from "../assets/backpage.svg";
import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PageWrapper from "./PageWrapper";

function DonatePage() {
  const { bookingData, setBookingData } = useBooking();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    if (e.target.files.length === 0) return;

    const file = e.target.files[0];
    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Допустимі формати: PNG, JPG, JPEG, PDF");
      return;
    }

    const storageRef = ref(storage, `receipts/${Date.now()}-${file.name}`);
    setLoading(true);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFileName(file.name);
      setBookingData({ ...bookingData, receipt: downloadURL });
      alert("Квитанцію завантажено ✅");
    } catch (err) {
      console.error("Помилка завантаження:", err);
      alert("Не вдалося завантажити квитанцію");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => fileInputRef.current.click();

  return (
    <PageWrapper baseWidth={365} baseHeight={665}>
      <div className="Main">
        <Header />
        <img src={four} className="number-four-svg" />
        <img src={TextForDonate} className="text-svg" />

        <div className="info-div-one">
          <p className="InfoText">
            Щоб замовити пісню, вам необхідно задонатити на постійну банку за
            посиланням нижче номіналом від 20 гривень:
          </p>
        </div>

        <div className="reference-div">
          <button
            className="reference-button"
            onClick={() => {
              const newWindow = window.open(
                "https://send.monobank.ua/jar/6d4PPqmhUi",
                "_blank",
                "noopener,noreferrer",
              );
              if (newWindow) newWindow.opener = null;
            }}
          >
            ПОСИЛАННЯ НА АКТУАЛЬНИЙ ЗБІР
          </button>
        </div>

        <div className="info-div-two">
          <p className="InfoText">Зібрані кошти підуть на потреби </p>
          <p className="InfoText">військових-могилянців на збір від KMA Help</p>
        </div>

        <div className="input-img">
          <input
            className="upload-img"
            type="file"
            accept="image/*,.pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            className="upload-button"
            type="button"
            onClick={handleUploadClick}
            disabled={loading}
          >
            {loading ? "Завантаження..." : "Завантажити квитанцію"}
          </button>
        </div>

        <div className="nav-buttons">
          <Link to="/songpage" className="backPage">
            <img src={backpage} className="vector-back-button" />
            НАЗАД
          </Link>
          <Link
            to={bookingData.receipt ? "/commentpage" : "#"}
            className={`nextPage ${!bookingData.receipt ? "disabled" : ""}`}
            onClick={(e) => {
              if (!bookingData.receipt) {
                e.preventDefault();
                alert("Будь ласка, завантажте квитанцію!");
              }
            }}
          >
            ДАЛІ <img src={vector} className="vector-next-button" />
          </Link>
        </div>

        <NavBar />
      </div>
    </PageWrapper>
  );
}

export default DonatePage;
