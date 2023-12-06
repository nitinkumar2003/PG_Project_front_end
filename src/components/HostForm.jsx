import React, { useEffect, useState, } from 'react';
import { InputBox, InputCheckbox, MultiSelectDropDown } from './InputComponent';
import { useNavigate } from 'react-router-dom';
import ButtonCom from './ButtonCom';
import $Services from '../network/Services';
import useCustomSelector from '../hooks/useCustomSelector';
import useSessionStorage from '../hooks/useSessionStorage';
import { useDispatch } from 'react-redux';
import { createQuestionAnsJson } from '../utilities/Constant';
import withToaster from '../HOC/withToaster';
import { fetchPropertyList } from '../features/masterApi/masterApiSlice';
import { AddressCom } from './AddressCom';



const HostForm = ({ showToast }) => {
  const dispatch = useDispatch()
  const { homeTypeList, livingTypeList, priceRangeList, sharingTypeList, propertyList } = useCustomSelector('masterApiSlice');
  console.log('propertyListpropertyList', JSON.stringify(propertyList))
  const [loggedInUserDetails] = useSessionStorage('loggedInUserDetails')
  const loggedInUserId = loggedInUserDetails.userId

  const navigate = useNavigate()
  const [questionsList, setQuestionsList] = useState([])
  const [propertyDetails, setPropertyDetails] = useState({ name: '', location: '' })
  const [propertyOwnerDetails, setPropertyOwnerDetails] = useState({ name: '', email: '', mobile: '' })
  const [propertyCatetakerDetails, setPropertyCaretakerDetails] = useState({ name: '', email: '', mobile: '' })
  const [addressInfo, setAddressInfo] = useState({})
  const [location, setLocation] = useState('')
  const [homeTypeSelect, setHomeTypeSelect] = useState([]);
  const [priceTypeSelect, setPriceTypeSelect] = useState([]);
  const [shareTypeSelect, setShareTypeSelect] = useState([]);
  const [livinTypeSelect, setLivinTypeSelect] = useState([]);
  const [questionAns, setQuestionAns] = useState([])


  console.log('addressInfoaddressInfoaddressInfo', addressInfo)

  useEffect(() => {
    getAppQuestiosn()
  }, [loggedInUserId])

  const getAppQuestiosn = () => {
    if (loggedInUserId == undefined) return;
    console.log(' ', loggedInUserId)
    $Services.getAppQuestiosn({ userId: loggedInUserId }).then((res) => {
      console.log('res of getting questions', res)
      setQuestionsList(res.data)
    }).catch((err) => console.log('err in gettig questions', err))

  }



  const handleSave = (e) => {
    e.preventDefault()
    const jsonObj = {
      userId: loggedInUserId,
      location: location,
      name: propertyDetails.name,
      propertyOwner: propertyOwnerDetails,
      caretaker: propertyCatetakerDetails,
      propertyType: {
        homeType: homeTypeSelect,
        livinType: livinTypeSelect,
        shareType: shareTypeSelect,
        priceType: priceTypeSelect
      }
    }
    console.log('jsonObj', jsonObj)
    // handleSaveAns()
    // return;
    $Services.postPropertyBasic(jsonObj).then(async (res) => {
      console.log('resres', res)
      const dataId = res.data._id
      // if (addressInfo && Object.keys(addressInfo).length > 0) {
        const addresJson = { property_id: dataId, ...addressInfo }
        let result = await $Services.postAddress(addresJson)
        console.log('resultresult', result)
      // }
      console.log('dataId', dataId)
      if (questionAns.length !== 0) {
        handleSaveAns(dataId)
      } else {
        navigate_aftersave()
      }
    }).catch((err) => console.log('err in save property', err))
    // alert('form submit')
  }


  const handleSaveAns = (dataId) => {
    // postPropertyAnswer
    const jsonObj = {
      userId: loggedInUserId,
      property_id: dataId,
      quesAns: questionAns
    }
    console.log('jsonObj', jsonObj)
    $Services.postPropertyAnswer(jsonObj).then((res) => {
      console.log('res of saving answer')
      navigate_aftersave();
    }).catch((err) => console.log('error in saving answrr', err))
  }


  const navigate_aftersave = () => {
    dispatch(fetchPropertyList());
    showToast('success', 'Data saved successsfully.');
    navigate('/search');
  }


  const handleChange = (e, type) => {
    const { value, id } = e.target
    const stateUpdate = (type === 'property') ? setPropertyDetails : (type === 'owner') ? setPropertyOwnerDetails : setPropertyCaretakerDetails
    handleUpdateState(stateUpdate, id, value)
  }

  const handleUpdateState = (setState, key, value) => {
    setState(prev => ({
      ...prev, [key]: value
    }))
  }

  const handleSelect = (e, type) => {
    console.log(e)
    switch (type) {

    }

  }

  const handleRadioQuestion = (e, question_id) => {
    console.log('handleRadioQuestion', e.target.id, question_id)
    const answerId = e.target.id
    let findIndexExistsValue = questionAns?.findIndex((item) => item?.question_id == question_id)
    console.log('findIndexIdfindIndexId', findIndexExistsValue)
    if (findIndexExistsValue < 0) {
      const newObj = createQuestionAnsJson({ question_id, answer_id: e.target.id })
      console.log('jsonObj', newObj)
      setQuestionAns(prev => [...prev, newObj]);

    } else {
      setQuestionAns((prev) => {
        let newArray = [...prev]
        newArray[findIndexExistsValue]['answer_id'] = answerId
        return newArray;
      })
    }
  }

  console.log('questionAnsquestionAns', questionAns)
  return (
    <form onSubmit={handleSave}>
      <div className='border-1 p-2 rounded-lg mt-12'>
        <h6 className='font-bold text-1xl sm:text-1xl mb-4'>Basic Details</h6>
        <InputBox placeholder='Enter Property Name' allScreen="true" id='name' onChange={(e) => handleChange(e, 'property')} />
        <div className="flex">
          <InputBox placeholder='Property Owner Name' name='name' id='name' onChange={(e) => handleChange(e, 'owner')} />
          <InputBox placeholder='Property Owner Email' name='email' id='email' onChange={(e) => handleChange(e, 'owner')} />
        </div>
        <div className="flex">
          <InputBox placeholder='Care taker  name' id='name' onChange={(e) => handleChange(e, 'caretaker')} />
          <InputBox placeholder='Care taker email' id='email' onChange={(e) => handleChange(e, 'caretaker')} />
        </div>
        <div className="flex">
          <InputBox placeholder='Property Owner mobile' name='mobile' id='mobile' onChange={(e) => handleChange(e, 'owner')} />
          <InputBox placeholder='Care taker mobile' id='mobile' onChange={(e) => handleChange(e, 'caretaker')} />
        </div>
        {/* <InputBox placeholder='Enter Location' allScreen="true" id='location' value={location} onChange={(e)=>setLocation(e.target.value)} /> */}
        <AddressCom setAddressInfo={setAddressInfo} />
      </div>
      <div className='border-1 p-2 rounded-lg mt-2'>
        <h6 className='font-bold text-1xl sm:text-1xl border-b mb-4 pb-2'>Services</h6>
        <div className="flex">
          <MultiSelectDropDown placeholder='Select Property' isMulti="true" value={homeTypeSelect} onChange={(e) => setHomeTypeSelect(e)} options={homeTypeList.filter(item => item.value != 1)} />
          <MultiSelectDropDown placeholder='Select Living' isMulti="true" value={livinTypeSelect} onChange={(e) => setLivinTypeSelect(e)} options={livingTypeList.filter(item => item.value != 1)} />
        </div>
        <div className="flex">
          <MultiSelectDropDown placeholder='Select Living' isMulti="true" value={shareTypeSelect} onChange={(e) => setShareTypeSelect(e)} options={sharingTypeList.filter(item => item.value != 1)} />
          <MultiSelectDropDown placeholder='Select Price' isMulti="true" value={priceTypeSelect} onChange={(e) => setPriceTypeSelect(e)} options={priceRangeList.filter(item => item.value != 1)} />
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questionsList?.length > 0 && questionsList?.map(({ question_label, answer_options, question_id }, quesIndex) => {
              console.log('answer_options', quesIndex, answer_options)
              return (
                <div className="flex justify-between items-center  ml-2" key={quesIndex}>
                  <label className="text-gray-700">({quesIndex + 1}) {question_label}</label>
                  <div className="flex items-center">
                    {answer_options.length > 0 && answer_options.map(({ answer_label, answer_id }, ansindex) => {
                      return (
                        <InputCheckbox key={ansindex} label={answer_label} id={answer_id} name={question_id} onChange={(e) => handleRadioQuestion(e, question_id)} />
                      )
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div class="flex justify-between">
        <ButtonCom label='Cancel' />
        <ButtonCom label='Save' />
      </div>


    </form>
  );
}

export default withToaster(HostForm);
