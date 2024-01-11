import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


const PaginationCom = ({ handlePageChange, totalPages, currentPage }) => {
    return (
        <>  
         <div className="flex flex-1 justify-between sm:hidden mt-1">
            <a className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer" onClick={() => handlePageChange(currentPage - 1)}>Previous</a>
            <a className="relative inline-flex items-center  border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
            Page <span className="font-medium"> &nbsp;{currentPage} &nbsp;</span> of <span className="font-medium"> &nbsp;{totalPages}</span>
            </a>
           
            <a className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
        </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
                <div>
                    <p className="text-sm text-gray-700 me-4">
                        Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a onClick={() => handlePageChange(currentPage - 1)} className="relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"   >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                        &nbsp;
                        <a onClick={() => handlePageChange(currentPage + 1)} className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </nav>
                </div>
            </div>
        </>

        // </div>
    )
}


export default PaginationCom;
