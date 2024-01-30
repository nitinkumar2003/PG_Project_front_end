import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useCustomSelector from '../hooks/useCustomSelector';
import konsole from '../network/Konsole';
import $Services from '../network/Services';
import GoogleMapCom from '../components/GoogleMapCom';

const SelectPg = () => {
    const { homeTypeList, livingTypeList, priceRangeList, sharingTypeList, propertyList } = useCustomSelector('masterApiSlice');
    const { id } = useParams();
    const [selectedData, setSelectedData] = useState(null)
    const [address, setAddress] = useState('')
    const [answerList, setAnswerList] = useState([])
    const [uplodedImage, setUploadedImage] = useState('')
    const propertyDetails = selectedData?.propertyType;

    useEffect(() => {
        const propertySelectedData = propertyList.length > 0 && propertyList?.find((item) => item._id == id)
        const userId = propertySelectedData?.userId;
        const _id = propertySelectedData?._id;
        console.log('propertySelectedData', userId, _id)
        getAppQuestiosnAns(_id)
        if (propertySelectedData) {
            setSelectedData(propertySelectedData)
            setAddress(propertySelectedData?.address)
            setUploadedImage(propertySelectedData?.image)
        }
    }, [propertyList])


    const getAppQuestiosnAns = (_id) => {
        if (_id == undefined) return;
        console.log(' ', _id)
        $Services.getAppQuestiosn({ property_id: _id }).then((res) => {
            console.log('res of getting questions ans', res)
            const responseData = res?.data
            let array = [...responseData];
            array = array.map((item) => {
                const answerId = item?.answer_options.find((item) => item.isChecked == true)
                return {
                    question_label: item.question_label,
                    question_id: item.question_id,
                    ...answerId
                }
            })
            setAnswerList(array)
            console.log('arrayarray', array)
        }).catch((err) => console.log('err in gettig questions', err))

    }


    const showRowData = (key, data) => {
        return <div className="flex  ">
            <p className="font-bold">{key}:</p>
            <p className='ps-4 pe-4'>{(data?.length > 0) ? data?.map(item => item?.label).join(', ') : "No available"}</p>
        </div>
    }

    konsole.log('selectedData', address, selectedData)
    return (
        <>
            <div className="m-16 container mx-auto">
                <div className='container fixed bg-white z-10 mb-5 '>
                    <div className='flex flex-wrap items-center'>
                        <img src="/icon/arrow-left.png" className='h-5 mt-1 ms-1 w-5 cursor-pointer' onClick={() => window.history.back()} />
                        <h6 className='font-bold sm:text-3xl ms-1'> {selectedData?.name}</h6>
                    </div>
                    <h2 className='border-b mb-2'>{selectedData?.address?.addressLineOne} </h2>
                </div>
            </div>
            <div className="py-20 container mx-auto px-4 sm:px-6 lg:px-8 shadow">
                <div className="flex flex-col lg:flex-row items-center lg:items-stretch h-full ">
                    {/* --------------------------------Image Part--------------------------------------------------------------------- */}
                    <div className="lg:w-1/2">
                        {uplodedImage?.url ? <>
                            <img src={uplodedImage.url} alt="Image not found" className="object-cover w-full h-full rounded-l-lg" />
                        </>
                            : <>
                                <div className='bg-gray-800' style={{ display: 'flex', color: "white", justifyContent: 'center', alignItems: 'center', width: '100%', height: '75vh', borderRadius: '8px' }}>
                                    Image Unavailable
                                </div>
                            </>}
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
                <div className="flex mt-5 flex-col lg:flex-row items-center lg:items-stretch ">
                    {/*----------------------------------------------------------------- Box Part------------------------------------ */}
                    <div className="lg:w-1/2 w-full  bg-gray-200 p-8">
                        <div className="w-full mt-4">
                            <div className="w-full bg-white shadow-md rounded-lg p-4">
                                <h2 className="text-lg font-bold mb-2">Property Description</h2>
                                <div className="grid bg-gray-200 rounded-lg ps-2">
                                    {showRowData('Type', propertyDetails?.homeType)}
                                    {showRowData('Living', propertyDetails?.livinType)}
                                    {showRowData('Sharing', propertyDetails?.shareType)}
                                    {showRowData('Price', propertyDetails?.priceType)}
                                    <div className='ps-1'>
                                        <ul className="list-none">
                                            {answerList.map((item, index) => (<li key={index}>
                                                <img src={`${(item.answer_id == 1) ? '/images/checkmark.png' : '/images/multiply.png'}`} alt='Correct' className='h-4 w-4 inline-block align-middle me-2' />
                                                {item.question_label}
                                            </li>))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* --------------------------------Image Part--------------------------------------------------------------------- */}
                    <div className="lg:w-1/2">

                        {(address) ?
                            <GoogleMapCom
                                lng={address?.long}
                                lat={address?.lat}
                                name={selectedData?.name}
                            /> :
                            <img
                                // src="https://placekitten.com/800/600"
                                alt="Google map not available."
                                className="object-cover w-full h-full rounded-r-lg"
                            />}

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