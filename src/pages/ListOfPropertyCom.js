import React, { useEffect, useState, Fragment, useRef } from 'react'
import { SelectDropdown, InputBox } from '../components/InputComponent'
import useCustomSelector from '../hooks/useCustomSelector'
import { useNavigate } from 'react-router-dom'
import PaginationCom from '../components/PaginationCom'

const SearchPg = () => {
    const { homeTypeList, livingTypeList, priceRangeList, sharingTypeList, propertyList } = useCustomSelector('masterApiSlice');
    const navigate = useNavigate(null)
    const [filterPgInfo, setFilterInfo] = useState({ homeType: '', livingType: '', sharingType: '', priceRange: '' })

    const handleSelect = (e) => {
        const { id, value } = e.target
        setFilterInfo(prev => ({
            ...prev, [id]: value
        }))
    };


    const navigateRoute = (item) => {
        console.log('itemitemitemza', item)
        navigate(`/search/${item._id}`)
    }

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
            <div>

                {/*----------------------------------------------------  show list component ------------------------------------------------------------------------------ */}
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-1 py-4 sm:px-3 sm:py-6 lg:max-w-7xl lg:px-2">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Property details</h2>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {propertyList?.map((item, index) => {
                                console.log('item', item)
                                return (<>
                                    <div key={index} className="group relative shadow-md cursor-pointer" onClick={() => navigateRoute(item)}>
                                        <div className="w-full overflow-hidden  bg-gray-200  relative group-hover:opacity-75">
                                            <img src="https://via.placeholder.com/500/" alt={`Image-${index}`} />
                                        </div>
                                        <div className="mt-2 flex justify-between p-2">
                                            <div>
                                                <h3 className="text-sm text-gray-900"> {item.name} </h3>
                                                <p className="mt-1 text-sm text-gray-500">{item?.address?.addressLineOne}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">{item.mobile}</p>
                                        </div>
                                    </div>
                                </>)
                            })}
                        </div>
                    </div>
                </div>
                <PaginationCom list={propertyList}  />
            </div>
        </div>
    )
}


export default ListOfProperty
