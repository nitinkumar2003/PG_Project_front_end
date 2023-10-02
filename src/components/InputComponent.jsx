import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import React, { useState } from 'react';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { ArrowPathIcon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, } from '@heroicons/react/24/outline'
import Select from 'react-select';
import './InputComponent.css'

export const SelectDropdown = ({ options, value, handleSelect, label, id }) => {
    return (
        <select
            className="block m-1 appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={value}
            onChange={handleSelect}
            id={id}
        >
            <option value=''>{label}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export const InputBox = ({ placeholder, allScreen = false }) => {
    return <>
        <div className={`${allScreen ? '' : 'w-1/2'} m-2 `}>
            <input type="text" id="username" className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder={placeholder} />
        </div>
    </>
}

export const InputCheckbox = ({ label,idForName, checked, onChange }) => {
    return (
        <>
            <input type="radio" className="mt-2 mb-1 ms-2 mr-2 h-6 w-6" name={idForName} />
            <label className='text-md'>{label}</label>
        </>
    )
}

export const MultiSelectDropDown = ({ placeholder, options, isMulti = false, allScreen = false }) => {
    return (
        <>
            <div className={`${allScreen ? '' : 'w-1/2 ml-2'} mb-4`}>
                <Select
                    placeholder={placeholder}
                    options={options}
                    isMulti={isMulti}
                    classNamePrefix="react-select"
                    className="select-control"
                />
            </div>
        </>
    )
}



