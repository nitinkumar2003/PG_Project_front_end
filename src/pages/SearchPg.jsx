import React, { useState } from 'react'
import { SelectDropdown ,InputBox} from '../components/InputComponent'
import { homeTypeList, livingTypeList ,sharingTypeList,priceRangeList} from '../utilities/Constant'

const SearchPg = () => {
    const [filterPgInfo,setFilterInfo]=useState({homeType:'',livingType:'',sharingType:'',priceRange:'' })

    
    const handleSelect = (e) => {
        const {id,value}=e.target   
        setFilterInfo(prev=>({
            ...prev,[id]:value
        }))

    };

    return (
        <div className="py-20 container mx-auto px-4 sm:px-6 lg:px-8 shadow">
            <h5 className='font-bold text-2xl sm:text-3xl border-b mb-4 pb-2'>Find Your Pg</h5>
            {/* <input type="text" className="w-full border p-2 rounded-lg mb-4" placeholder="Search location" /> */}
            <InputBox placeholder='Search location' allScreen="true" />
            <div className="flex">
                <SelectDropdown
                    options={homeTypeList}
                    value={filterPgInfo.homeType}
                    handleSelect={handleSelect}
                    label="Select Home"
                    id='priceRange'
                />
                <SelectDropdown
                    options={livingTypeList}
                    value={filterPgInfo.livingType}
                    handleSelect={handleSelect}
                    label="Select Living"
                    id='livingType'
                />
                <SelectDropdown
                    options={sharingTypeList}
                    value={filterPgInfo.sharingType}
                    handleSelect={handleSelect}
                    label="Select Sharing"
                    id='sharingType'
                />
                <SelectDropdown
                    options={priceRangeList}
                    value={filterPgInfo.priceRange}
                    handleSelect={handleSelect}
                    label="Select Price"
                    id='priceRange'
                />
            </div>
        </div>
    )
}

export default SearchPg
