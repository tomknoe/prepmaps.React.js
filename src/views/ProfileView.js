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

import { useEffect, useState } from "react";
import {
  deleteUserFromApi,
  getSingleUserFromApi,
  logOut,
  updateUserToApi,
} from "../services/UserServices";

import { Form, Button, Modal } from "react-bootstrap";

import { useLoadScript } from "@react-google-maps/api";
import { useHistory } from "react-router";

const libraries = ["places"];

const ProfileView = ({ match }) => {
  const history = useHistory();

  const { id } = match.params;
  const [previousPrEP, setPreviousPrEP] = useState();
  const [previousPEP, setPreviousPEP] = useState();
  const [previousInsurance, setPreviousInsurance] = useState();
  const [previousTesting, setPreviousTesting] = useState();
  const [previousAddress, setPreviousAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [editUser, setEditUser] = useState({
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await getSingleUserFromApi(id);
    setEditUser(response.data);

    setPreviousPrEP(response.data.PrEP);
    setPreviousPEP(response.data.PEP);
    setPreviousInsurance(response.data.insurance);
    setPreviousTesting(response.data.testing);
    setPreviousAddress(response.data.address);
  };

  const handleChange = (event) => {
    if (
      event.target.checked === true &&
      (event.target.name === "PrEP" ||
        event.target.name === "PEP" ||
        event.target.name === "insurance" ||
        event.target.name === "testing")
    ) {
      setEditUser({
        ...editUser,
        [event.target.name]: true,
      });
    } else if (
      event.target.checked === false &&
      (event.target.name === "PrEP" ||
        event.target.name === "PEP" ||
        event.target.name === "insurance" ||
        event.target.name === "testing")
    ) {
      setEditUser({
        ...editUser,
        [event.target.name]: false,
      });
    } else {
      setEditUser({
        ...editUser,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const userResponse = await updateUserToApi(id, editUser);
    window.location.reload();
  };

  const handleDelete = async (event) => {
    await deleteUserFromApi(id);
    await logOut();
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
      <div className="search-expand">
        <Combobox
          onSelect={async (address) => {
            setCurrentAddress(address);
            clearSuggestions();

            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              setEditUser({
                ...editUser,
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
            placeholder={previousAddress}
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
    <div className="profile-form">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name of practice</Form.Label>
          <Form.Control
            type="text"
            placeholder={editUser.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder={editUser.phone}
            name="phone"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            placeholder={editUser.website}
            name="website"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Search />
        </Form.Group>

        <br />

        <div className="check-field">
          <div className="custom-switch">
            <Form.Check
              type="switch"
              className="custom-switch"
              label="PrEP"
              defaultChecked={previousPrEP}
              name="PrEP"
              onClick={handleChange}
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
          </div>

          <div className="custom-switch">
            <Form.Check
              type="switch"
              className="custom-switch"
              label="PEP"
              defaultChecked={previousPEP}
              name="PEP"
              onClick={handleChange}
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
          </div>

          <Form.Check
            type="switch"
            className="custom-switch"
            label="Require insurance"
            defaultChecked={previousInsurance}
            name="insurance"
            onClick={handleChange}
          />
          <Form.Check
            type="switch"
            className="custom-switch"
            label="HIV testing"
            defaultChecked={previousTesting}
            name="testing"
            onClick={handleChange}
          />
        </div>
        <br />
        <div className="center">
          <Button
            variant="outline-primary"
            type="button"
            style={{ width: "100%" }}
            onClick={handleUpdate}
          >
            Update
          </Button>

          <Button
            variant="outline-danger"
            type="button"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={handleShow}
          >
            Delete Account
          </Button>
        </div>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your profile?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={handleDelete}
            style={{ width: "100%" }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileView;
