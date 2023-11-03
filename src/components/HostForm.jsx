import React,{useEffect,useState} from 'react';
import { InputBox, InputCheckbox, MultiSelectDropDown } from './InputComponent';
import ButtonCom from './ButtonCom';
import $Services from '../network/Services';
import useCustomSelector from '../hooks/useCustomSelector';

const HostForm = () => {
  const { homeTypeList, livingTypeList, priceRangeList, sharingTypeList } = useCustomSelector('masterApiSlice');
  const [questionsList,setQuestionsList]=useState([])

  useEffect(() => {
    getAppQuestiosn()
  }, [])

  const getAppQuestiosn = () => {
    $Services.getAppQuestiosn('').then((res) => {
      console.log('res of getting questions', res)
      setQuestionsList(res.data)
    }).catch((err) => console.log('err in gettig questions', err))

  }
  return (
    <form>
      <div className='border-2 p-2 rounded-lg border-gray-600 '>
        <h6 className='font-bold text-1xl sm:text-1xl border-b mb-4'>Basic Details</h6>
        <InputBox placeholder='Enter Property Name' allScreen="true" />
        <div className="flex">
          <InputBox placeholder='Property Owner Name' />
          <InputBox placeholder='Property Owner Email' />
        </div>
        <div className="flex">
          <InputBox placeholder='Care taker first name' />
          <InputBox placeholder='Care taker last name' />
        </div>
        <div className="flex">
          <InputBox placeholder='Care taker email' />
          <InputBox placeholder='Care taker mobile' />
        </div>
        <InputBox placeholder='Enter Location' allScreen="true" />
      </div>
      <div className='border-2 p-2 rounded-lg border-gray-600 mt-2'>
        <h6 className='font-bold text-1xl sm:text-1xl border-b mb-4 pb-2'>Services</h6>
        <div className="flex">
          <MultiSelectDropDown placeholder='Select Property' isMulti="true" options={homeTypeList.filter(item => item.value != 1)} />
          <MultiSelectDropDown placeholder='Select Property' isMulti="true" options={livingTypeList.filter(item => item.value != 1)} />
        </div>
        <div className="flex">
          <MultiSelectDropDown placeholder='Select Living' isMulti="true" options={sharingTypeList.filter(item => item.value != 1)} />
          <MultiSelectDropDown placeholder='Select Price' isMulti="true" options={priceRangeList.filter(item => item.value != 1)} />
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questionsList?.length > 0 && questionsList?.map(({ question_label, answer_options, question_id }, quesIndex) => {
              console.log('answer_options', quesIndex, answer_options)
              return (
                <div className="flex justify-between items-center  ml-2">
                  <label className="text-gray-700">({quesIndex + 1}) {question_label}</label>
                  <div className="flex items-center">
                    {answer_options.length > 0 && answer_options.map(({ answer_label }, ansindex) => {
                      return (
                        <InputCheckbox label={answer_label} idForName={question_id} />
                      )
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='flex justify-between m-2' >
        {/* <ButtonCom label='Submit' /> */}
        {/* <ButtonCom label='Cancel' /> */}
      </div>

    </form>
  );
}

export default HostForm;
