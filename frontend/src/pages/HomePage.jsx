import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import "../styles/HomePopUp.css";

import Header from "@components/Header";
import BeerCard from "@components/beer-card-elmt/BeerCard";
import HomePopUp from "@components/HomePopUp";
import Footer from "@components/Footer";
import axios from "axios";
import FiltersComponent from "../components/filters-comp/FiltersComponent";

function HomePage() {
  const [beerArray, setBeeArray] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/beer").then((res) => {
      setBeeArray(res.data);
    });
  }, []);

  const [minColValue, setMinColValue] = useState(0);
  const [maxColValue, setMaxColValue] = useState(0);
  const colorInput = (e) => {
    setMinColValue(e.minValue);
    setMaxColValue(e.maxValue);
  };

  const [minAlcValue, setMinAlcValue] = useState(0);
  const [maxAlcValue, setMaxAlcValue] = useState(0);
  const alcInput = (el) => {
    setMinAlcValue(el.minValue);
    setMaxAlcValue(el.maxValue);
  };

  const [minBitterValue, setMinBitterValue] = useState(0);
  const [maxBitterValue, setMaxBitterValue] = useState(0);
  const bitterInput = (ele) => {
    setMinBitterValue(ele.minValue);
    setMaxBitterValue(ele.maxValue);
  };

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const clearFilter = () => {
    setMinAlcValue(0);
    setMaxAlcValue(11);
    setMinBitterValue(0);
    setMaxBitterValue(110);
    setMinColValue(0);
    setMaxColValue(45);
  };

  const alc = {
    min: minAlcValue,
    max: maxAlcValue,
    callback: alcInput,
  };

  const bit = {
    min: minBitterValue,
    max: maxBitterValue,
    callback: bitterInput,
  };

  const col = {
    min: minColValue,
    max: maxColValue,
    callback: colorInput,
  };

  return (
    <div id="body">
      <Header />
      <div className="main">
        <h2>Oh my brew!</h2>
        <h3 className="taglineWebsite">Let the dogs out!</h3>
        <FiltersComponent
          col={col}
          alc={alc}
          bit={bit}
          resetEvent={(ev) => clearFilter(ev)}
        />
        <button
          className="PopUpButton"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          ?
        </button>
        <img
          className="dog"
          src="src/assets/oh-my-brew-icon-dog-ok.png"
          alt="dog"
        />
      </div>
      <div className="beerDisplay">
        <div className="beerCardList">
          {beerArray
            .filter((ele) => {
              if (maxAlcValue >= 11) {
                if (ele.abv >= minAlcValue) return ele;
              }
              if (maxAlcValue <= 10) {
                if (ele.abv >= minAlcValue && ele.abv <= maxAlcValue)
                  return ele;
              }
              return null;
            })
            .filter((el) => {
              if (maxColValue >= 45) {
                if (el.srm > minColValue) return el;
              }
              if (maxColValue <= 40) {
                if (el.srm >= minColValue && el.srm <= maxColValue) return el;
              }
              return null;
            })
            .filter((ele) => {
              if (maxBitterValue >= 110) {
                if (ele.ibu > minBitterValue) return ele;
              }
              if (maxBitterValue <= 100) {
                if (ele.ibu >= minBitterValue && ele.ibu <= maxBitterValue)
                  return ele;
              }
              return null;
            })
            .map((element) => (
              <BeerCard
                key={element.id}
                name={element.name}
                imageUrl={`http://localhost:5000/images/${element.imageUrl}`}
                ibu={element.ibu}
                firstBrewed={element.firstBrewed}
                abv={element.abv}
                srm={element.srm}
                description={element.description}
                ingredients={element.ingredients}
                foodPairing={element.foodPairing}
              />
            ))}
        </div>
      </div>
      <Footer />
      {isOpen && <HomePopUp onClose={handleClose} />}
    </div>
  );
}

export default HomePage;
