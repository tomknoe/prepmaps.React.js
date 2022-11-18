import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

import {
  Navbar,
  Nav,
  Container,
  InputGroup,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";

import { useLoadScript } from "@react-google-maps/api";

import { Animated } from "react-animated-css";
import { useEffect, useState } from "react";
import { loginUserToApi, signupUser } from "../services/UserServices";
import { useHistory } from "react-router";

const libraries = ["places"];

const SignupView = () => {
  const history = useHistory();

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [addressError, setAddressError] = useState("search");
  const [phoneError, setPhoneError] = useState(false);
  const [websiteError, setWebsiteError] = useState(false);

  const [currentAddress, setCurrentAddress] = useState("");
  const [newUsuer, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone: "",
    website: "",
    PrEP: false,
    PEP: false,
    insurance: false,
    testing: false,
    longitude: 0,
    latitude: 0,
  });

  const handleChange = (event) => {
    if (
      event.target.checked === true &&
      (event.target.name === "PrEP" ||
        event.target.name === "PEP" ||
        event.target.name === "insurance" ||
        event.target.name === "testing")
    ) {
      setNewUser({
        ...newUsuer,
        [event.target.name]: true,
      });
    } else if (
      event.target.checked === false &&
      (event.target.name === "PrEP" ||
        event.target.name === "PEP" ||
        event.target.name === "insurance" ||
        event.target.name === "testing")
    ) {
      setNewUser({
        ...newUsuer,
        [event.target.name]: false,
      });
    } else {
      setNewUser({
        ...newUsuer,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const userResponse = await signupUser(newUsuer);

    console.log(userResponse);

    if (userResponse.data.errors) {
      setEmailError(false);
      setPasswordError(false);
      setNameError(false);
      setAddressError("search");
      setPhoneError(false);
      setWebsiteError(false);

      userResponse.data.errors.map((err) => {
        switch (err.param) {
          case "email":
            setEmailError(true);
            break;
          case "password":
            setPasswordError(true);
            break;
          case "name":
            setNameError(true);
            break;
          case "address":
            setAddressError("search-disabled");
            break;
          case "phone":
            setPhoneError(true);
            break;
          case "website":
            setWebsiteError(true);
            break;
        }
      });

      return;
    }

    await loginUserToApi({
      email: newUsuer.email,
      password: newUsuer.password,
    });
    history.push("/");
    window.location.reload();
  };

  const Search = () => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: {
          lat: () => 25.76585949266363,
          lng: () => -80.19816792343089,
        },
        radius: 10 * 1000,
      },
    });

    useEffect(() => {
      setValue(currentAddress, false);
    }, []);

    return (
      <div className={addressError}>
        <Combobox
          onSelect={async (address) => {
            setCurrentAddress(address);
            clearSuggestions();

            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              setNewUser({
                ...newUsuer,
                address: results[0].formatted_address,
                latitude: lat,
                longitude: lng,
              });
            } catch (error) {
              console.log("error");
            }
          }}
        >
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
          />
          <ComboboxPopover
            style={{ listStyleType: "none" }}
            className="search-field"
          >
            {status === "OK" &&
              data.map(({ id, description }) => (
                <div key={id}>
                  <ComboboxOption value={description} />
                </div>
              ))}
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <Animated>
      <div className="signup-form">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                isInvalid={emailError}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Create password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                isInvalid={passwordError}
                required
              />
              <Form.Text className="text-muted">
                Passwords should be at least 8 characters long and include
                capital & lowercase letters, numbers, and symbols
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please enter a valid password
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name of practice</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="name"
                onChange={handleChange}
                isInvalid={nameError}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please include a name
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Search />

            <div
              style={{ color: "#dc3645", fontSize: "14px", marginTop: "3px" }}
            >
              {addressError === "search-disabled"
                ? "Please enter a valid address"
                : ""}
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone number</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="phone"
                onChange={handleChange}
                isInvalid={phoneError}
                required
              />
              <Form.Text className="text-muted">
                Phone numbers must be in the following format: (000) 000-0000,
                (000)000-000, 000-000-000
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please enter a valid phone number
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Website</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                name="website"
                onChange={handleChange}
                isInvalid={websiteError}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid website URL
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <br />

          <Form.Check
            className="grid-elem"
            type="checkbox"
            id={"default-checkbox"}
            label="Do you offer PrEP?"
            name="PrEP"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Read{" "}
            <a
              href="https://www.plannedparenthood.org/learn/stds-hiv-safer-sex/hiv-aids/prep"
              target="_blank"
            >
              here
            </a>{" "}
            to learn more about PrEP
          </Form.Text>
          <br />
          <br />
          <Form.Check
            className="grid-elem"
            type="checkbox"
            id={"default-checkbox"}
            label="Do you offer PEP?"
            name="PEP"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Read{" "}
            <a
              href="https://www.plannedparenthood.org/learn/stds-hiv-safer-sex/hiv-aids/pep"
              target="_blank"
            >
              here
            </a>{" "}
            to learn more about PEP
          </Form.Text>
          <br />
          <br />

          <Form.Check
            className="grid-elem"
            type="checkbox"
            id={"default-checkbox"}
            label="Do you require insurance?"
            name="insurance"
            onChange={handleChange}
          />
          <br />
          <Form.Check
            className="grid-elem"
            type="checkbox"
            id={"default-checkbox"}
            label="Do you offer HIV testing?"
            name="testing"
            onChange={handleChange}
          />
          <br />
          <br />
          <div className="center">
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%" }}
              onClick={handleSignup}
            >
              Sign up
            </Button>
          </div>
        </Form>
      </div>
    </Animated>
  );
};

export default SignupView;
