import React, { useState, useRef } from 'react'
import { googleApiKey } from '../utilities/Constant'

const addressInfoObj = () => {
    return { addressLineOne: "", addressLine2: "", zipCode: "", city: "", state: "", country: "", county: "", long: "", lat: "", streetAddress: '' }
}
export const AddressCom = ({ setAddressInfo, error, setError }) => {

    const [addressInfo, setaddressInfo] = useState({ ...addressInfoObj() })

    const inputSearchaddressRef = useRef(null)
    const onhandleChangeAddress = () => {
        initMapScript().then(() => initAutoComplete());
        if (inputSearchaddressRef.current.value !== "") {
            if (inputSearchaddressRef.current.value > 0) {
                // showClearButton = true;
            }
        }
    };

    const initAutoComplete = () => {
        if (!inputSearchaddressRef.current) return;
        const autocomplete = new window.google.maps.places.Autocomplete(inputSearchaddressRef.current);
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () =>
            onChangeAddress(autocomplete)
        );
    };

    const onChangeAddress = (autocomplete) => {
        const place = autocomplete.getPlace();
        const lat = place?.geometry?.location?.lat();
        const long = place?.geometry?.location?.lng();
        console.log('longlong', long, lat)
        setError(false)
        setAddressfun(lat, long, extractAddress(place));
    };

    const extractAddress = (place) => {
        const address = {
            city: "",
            state: "",
            zip: "",
            county: "",
            country: "",
            plain() {
                const city = this.city ? this.city + ", " : "";
                const zip = this.zip ? this.zip + ", " : "";
                const county = this.county ? this.county + "," : "";
                const state = this.state ? this.state + ", " : "";
                return city + zip + state + county;
            },
        };

        if (Array.isArray(place?.address_components)) {
            place.address_components.forEach((component) => {
                const types = component.types;
                const value = component.long_name;

                address.city = types.includes("locality") ? value : address?.city;
                address.state = types.includes("administrative_area_level_1") ? value : address?.state;
                address.county = types.includes("administrative_area_level_2") ? value : address?.county;
                address.zip = types.includes("postal_code") ? value : address?.zip;
                address.country = types.includes("country") || types.includes("county") ? value : address?.country;
            });
        }
        return address;
    };

    const setAddressfun = (lat, long, address) => {
        const addressInfoDet = {
            city: address?.city,
            county: address?.county,
            state: address?.state,
            zipcode: address?.zip,
            country: address?.country,
            lat: lat,
            long: long,
            addressLine2: "",
            addressLineOne: inputSearchaddressRef?.current?.value,
            //   createdBy: loggedInId,
            streetAddress: inputSearchaddressRef?.current?.value.substring(0, inputSearchaddressRef?.current?.value.indexOf(",")),
            addressTypeId: 1
        };
        setError(false)
        setAddressInfo(addressInfoDet)
        setaddressInfo({ ...addressInfoDet });
    };



    const initMapScript = () => {
        const mapApi = "https://maps.googleapis.com/maps/api/js";
        if (window.google) {
            return Promise.resolve();
        }
        const src = `${mapApi}?key=${'AIzaSyBaUn22pwovCzOxH7Uthivbd8_ScMkaEAI'}&libraries=places&v=weekly`;
        return loadAsyncScript(src);
    }


    function loadAsyncScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            Object.assign(script, {
                type: "text/javascript",
                async: true,
                src
            })
            script.addEventListener("load", () => resolve(script));
            document.head.appendChild(script);
        })
    }

    return (
        <>
            <div className=' m-2 relative'>
                <input id='location' type="text" className="border-b  w-full border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-900"
                    placeholder='Please Enter your full address...'
                    defaultValue={addressInfo.addressLine1}
                    onChange={() => onhandleChangeAddress()} ref={inputSearchaddressRef}
                />
                {error && (<div className="text-red-500 text-xs mt-1">Address can not be blank</div>)}
            </div>
        </>
    )
}
