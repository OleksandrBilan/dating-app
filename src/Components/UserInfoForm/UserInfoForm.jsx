import s from "./style.module.css";
import Form from "react-bootstrap/Form";
import { FieldError } from "../FieldError/FieldError";
import { useEffect, useState } from "react";
import { ValidatorService } from "../../Services/validator";
import { ButtonPrimary } from "../ButtonPrimary/ButtonPrimary";
import { Country, City } from "country-state-city";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";
import { API_URL } from "../../config";

const VALIDATOR = {
  name: (value) => {
    return ValidatorService.min(value);
  },
  birthDate: (value) => {
    return ValidatorService.birthDate(value);
  },
  description: (value) => {
    return ValidatorService.min(value);
  },
};

export function UserInfoForm({ onSubmit }) {
  const [countriesData, setCountriesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [sexData, setSexData] = useState([]);

  const [formValues, setFormValues] = useState({
    name: "",
    birthDate: Date.now(),
    country: { code: "", name: "" },
    city: { name: "", countryCode: "" },
    sex: 0,
    sexPreferences: 0,
    description: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: true,
    birthDate: true,
    country: true,
    city: true,
    sex: true,
    sexPreferences: true,
    description: true,
  });

  function updateFormValues(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
    validate(name, value);
  }

  function validate(fieldName, fieldValue) {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATOR[fieldName](fieldValue),
    });
  }

  function hasError() {
    for (const fieldName in formErrors) {
      if (formErrors[fieldName]) {
        return true;
      }
    }
    return false;
  }

  function onCountrySelect(value) {
    if (value[0] != undefined) {
      setFormValues({
        ...formValues,
        country: { name: value[0].label, code: value[0].id },
      });
      setFormErrors({
        ...formErrors,
        country: false,
      });
    }
  }

  function onCitySelect(value) {
    if (value[0] != undefined) {
      setFormValues({
        ...formValues,
        city: { name: value[0].label, countryCode: value[0].countryCode },
      });
      setFormErrors({
        ...formErrors,
        city: false,
      });
    }
  }

  function onSexSelect(value) {
    if (value[0] != undefined) {
      setFormValues({
        ...formValues,
        sex: value[0].id,
      });
      setFormErrors({
        ...formErrors,
        sex: false,
      });
    }
  }

  function onSexPreferencesSelect(value) {
    if (value[0] != undefined) {
      setFormValues({
        ...formValues,
        sexPreferences: value[0].id,
      });
      setFormErrors({
        ...formErrors,
        sexPreferences: false,
      });
    }
  }

  useEffect(() => {
    let countries = Country.getAllCountries().map((c) => {
      return { label: c.name, id: c.isoCode };
    });
    setCountriesData(countries);

    axios.get(`${API_URL}/lookup/getSex`).then((response) => {
      let sexOptions = response.data.map((s) => {
        return { label: s.name, id: s.id };
      });
      setSexData(sexOptions);
    });
  }, []);

  useEffect(() => {
    if (
      formValues.country != undefined &&
      formValues.country.code != undefined &&
      formValues.country.code.length > 0
    ) {
      let cities = City.getCitiesOfCountry(formValues.country.code).map((c) => {
        return { label: c.name, countryCode: c.countryCode };
      });
      setCitiesData(cities);
    }
  }, [formValues.country]);

  return (
    <div className={s.container}>
      <div className={`mb-5 ${s.all_inputs}`}>
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={updateFormValues}
        />
        <FieldError message={formErrors.name} />
      </div>
      <div className={`mb-5 ${s.all_inputs}`}>
        <label className="form-label">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          className="form-control"
          onChange={updateFormValues}
        />
        <FieldError message={formErrors.birthDate} />
      </div>
      <div className={`mb-5 ${s.all_inputs}`}>
        <label className="form-label">Country</label>
        <Typeahead
          id="country-selector"
          onChange={onCountrySelect}
          options={countriesData}
        />
      </div>
      <div className={`mb-5 ${s.all_inputs}`}>
        <label className="form-label">City</label>
        <Typeahead
          id="city-selector"
          onChange={onCitySelect}
          options={citiesData}
        />
      </div>
      <div className={`mb-5 ${s.all_inputs}`}>
        <label className="form-label">Your sex</label>
        <Typeahead id="sex-selector" onChange={onSexSelect} options={sexData} />
      </div>
      <div className={`mb-5 ${s.all_inputs}`}>
        <label className="form-label">
          Sex of people you want to communicate with
        </label>
        <Typeahead
          id="sex-preferences-selector"
          onChange={onSexPreferencesSelect}
          options={sexData}
        />
      </div>
      <div className={`mb-5 ${s.all_inputs}`}>
        <label className="form-label">Write something about yourself</label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          onChange={updateFormValues}
        />
        <FieldError message={formErrors.description} />
      </div>
      <div className={s.submit_btn}>
        <ButtonPrimary
          isDisabled={hasError()}
          onClick={() => onSubmit(formValues)}
        >
          Submit
        </ButtonPrimary>
      </div>
    </div>
  );
}