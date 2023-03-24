import s from "./style.module.css";
import { Typeahead } from "react-bootstrap-typeahead";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { Button } from "react-bootstrap";

export function UsersFilters({ onApply }) {
  const [countriesData, setCountriesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [sexData, setSexData] = useState([]);
  const [allCities, setAllCities] = useState([]);

  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();
  const [countryCode, setCountryCode] = useState();
  const [cityId, setCityId] = useState();
  const [preferedSexId, setPreferedSexId] = useState();

  useEffect(() => {
    axios.get(`${API_URL}/lookup/getCountries`).then((response) => {
      const countriesOptions = response.data.map((c) => {
        return { label: c.name, id: c.code };
      });
      setCountriesData(countriesOptions);
    });

    axios.get(`${API_URL}/lookup/getSex`).then((response) => {
      const sexOptions = response.data.map((s) => {
        return { label: s.name, id: s.id };
      });
      setSexData(sexOptions);
    });

    axios.get(`${API_URL}/lookup/getCities`).then((response) => {
      setAllCities(response.data);
    });
  }, []);

  useEffect(() => {
    if (countryCode && countryCode.length > 0) {
      const cities = allCities.filter((c) => c.countryCode === countryCode);
      const citiesOptions = cities.map((c) => {
        return { label: c.name, id: c.id };
      });
      setCitiesData(citiesOptions);
    }
  }, [countryCode, allCities]);

  function onCountrySelect(value) {
    if (value[0]) {
      setCountryCode(value[0].id);
    } else {
      setCountryCode(null);
    }
  }

  function onCitySelect(value) {
    if (value[0]) {
      setCityId(value[0].label);
    } else {
      setCityId(null);
    }
  }

  function onSexSelect(value) {
    if (value[0]) {
      setPreferedSexId(value[0].id);
    } else {
      setPreferedSexId(null);
    }
  }

  function onApplyClick() {
    const formValues = {
      minAge: minAge?.length > 0 ? parseInt(minAge) : null,
      maxAge: maxAge?.length > 0 ? parseInt(maxAge) : null,
      countryCode,
      cityId,
      preferedSexId,
    };
    onApply(formValues);
  }

  return (
    <div className={s.container}>
      <h4>Search Filters</h4>
      <div className={s.inputContainer}>
        <label className="form-label">Minimum Age</label>
        <input
          type="number"
          className="form-control"
          min={0}
          max={100}
          onChange={(e) => setMinAge(e.target.value)}
        />
      </div>
      <div className={s.inputContainer}>
        <label className="form-label">Maximum Age</label>
        <input
          type="number"
          className="form-control"
          min={0}
          max={100}
          onChange={(e) => setMaxAge(e.target.value)}
        />
      </div>
      <div className={s.inputContainer}>
        <label className="form-label">Country</label>
        <Typeahead
          id="country-selector"
          onChange={onCountrySelect}
          options={countriesData}
        />
      </div>
      <div className={s.inputContainer}>
        <label className="form-label">City</label>
        <Typeahead
          id="city-selector"
          onChange={onCitySelect}
          options={citiesData}
        />
      </div>
      <div className={s.inputContainer}>
        <label className="form-label">Sex</label>
        <Typeahead id="sex-selector" onChange={onSexSelect} options={sexData} />
      </div>
      <Button variant="primary" onClick={onApplyClick}>
        Apply
      </Button>
    </div>
  );
}
