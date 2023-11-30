import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useCustomSelector from '../hooks/useCustomSelector';
import konsole from '../network/Konsole';

const SelectPg = () => {
    const { homeTypeList, livingTypeList, priceRangeList, sharingTypeList, propertyList } = useCustomSelector('masterApiSlice');
    const { id } = useParams();
    const [selectedData, setSelectedData] = useState(null)

    useEffect(() => {
        const propertySelectedData = propertyList.length > 0 && propertyList?.find((item) => item._id == id)
        if (propertySelectedData) {
            setSelectedData(propertySelectedData)
        }
    }, [propertyList])
    const propertyDetails = selectedData?.propertyType
    console.log('selectedDataselectedData', JSON.stringify(propertyDetails?.homeType), selectedData)
    const showRowData = (key, data) => {
        return <div className="flex">
            <div className="w-1/3 p-1"> <p className="font-bold">{key}:</p></div>
            <div className="w-2/3 p-1">
            <p>{(data?.length > 0) ? data?.map(item => item?.label).join(', ') : "No available"}</p>
            </div>
        </div>


    }
    return (
        <>
            <div className="m-16 container mx-auto">
                <div className='container fixed bg-white z-20 '>
                    <h5 className='font-bold sm:text-3xl'>{selectedData?.name}</h5>
                    <h2 className=' border-b mb-4 pb-2'>{selectedData?.location} </h2>
                </div>
            </div>
            <div className="py-20 container mx-auto px-4 sm:px-6 lg:px-8 shadow">

                <div className="flex flex-col lg:flex-row items-center lg:items-stretch h-full">
                    {/* --------------------------------Image Part--------------------------------------------------------------------- */}
                    <div className="lg:w-1/2">
                        <img
                            src="https://placekitten.com/800/600"
                            alt="Example"
                            className="object-cover w-full h-full rounded-l-lg"
                        />
                    </div>

                    {/*----------------------------------------------------------------- Box Part------------------------------------ */}
                    <div className="lg:w-1/2 w-full  bg-gray-200 p-8">
                        {/*------------------------------------------------- owner details------------------------------------------------- */}
                        <div className="w-full mb-4">
                            <CardOwnerNCaretaker heading="Owner Details" {...selectedData?.propertyOwner} />
                        </div>
                        {/*------------------------------------------------- Care taker details------------------------------------------------- */}

                        <div className="w-full mt-4">
                            <CardOwnerNCaretaker heading="Care Taker Details" {...selectedData?.caretaker} />
                        </div>
                    </div>

                </div>

                <div className="flex mt-5 flex-col lg:flex-row items-center lg:items-stretch h-full">

                    {/*----------------------------------------------------------------- Box Part------------------------------------ */}
                    <div className="lg:w-1/2 w-full  bg-gray-200 p-8">
                        <div className="w-full mt-4">
                            <div className="w-full h-96 bg-white shadow-md rounded-lg p-4">
                                <h2 className="text-lg font-bold mb-2">Property Description</h2>
                                <div className="grid bg-gray-200 rounded-lg ps-2">
                                    {showRowData('Property type', propertyDetails?.homeType)}
                                    {showRowData('Sutable for', propertyDetails?.livinType)}
                                    {showRowData('Sharing', propertyDetails?.shareType)}
                                    {showRowData('Price', propertyDetails?.priceType)}
                                    <div className='ps-4'>
                                        <ul className="list-disc">
                                            <li>Food Availability</li>
                                            <li>AC</li>
                                            <li>Washing Machine</li>
                                            <li>Power Backup</li>
                                            <li>Room Cleaning Service</li>
                                            <li>Fully Furnished</li>
                                            <li>Common Area Available</li>
                                            <li>RO Water Available</li>
                                        </ul>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                    {/* --------------------------------Image Part--------------------------------------------------------------------- */}
                    <div className="lg:w-1/2">
                        <img
                            src="https://placekitten.com/800/600"
                            alt="Example"
                            className="object-cover w-full h-full rounded-r-lg"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const CardOwnerNCaretaker = ({ heading, name, email, mobile }) => {
    const showRowData = (key, value) => {
        return <><div className="p-1"><p><b>{key}:</b> {value ? value : "No available"}</p></div></>
    }
    return (
        <>
            <div className="w-full h-48 bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-bold mb-2">{heading}</h2>
                <div className="grid gap-4 bg-gray-200 rounded-lg ps-2">
                    {showRowData('Name', name)}
                    {showRowData('Email', email)}
                    {showRowData('Mobile', mobile)}
                </div>
            </div>
        </>
    )
}

export default SelectPg