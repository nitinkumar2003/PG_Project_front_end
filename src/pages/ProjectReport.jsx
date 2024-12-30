import React from 'react'
import { $report } from '../utilities/Report'
const ProjectReport = () => {

  const styles = {
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '1.5',
    // fontFamily: 'Arial, sans-serif' // You can change this to any font family you prefer,

  };

  const subStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '1.5',
    // fontFamily: 'Arial, sans-serif' // You can change this to any font family you prefer,

  }
  const paragraphStyle = {
    fontFamily: 'Arial, sans-serif',  // Apply a simple font-family (Arial as primary, sans-serif as fallback)
    // letterSpacing: '1px',             // Adjust letter spacing
    wordSpacing: '6px',               // Adjust word spacing
    textAlign: 'justify',             // Justifies the text alignment
    fontSize: '12px',                 // Adjust font size
    lineHeight: '1.5',                // Adjust line spacing
  };

  const subPointStyle = {
    // ...styleSpan,
    fontSize: '14px',
    fontWeight: 'bold',

  }
  const styleSpan = {
    fontWeight: 'bold',
    lineHeight: '1.5',
  }

  return (
    <div>
      <div className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">

        {$report.map((item, index) => {
          return <div className='mt-4 mb-2 '>
            <h1 style={styles} className='mb-2 mt-2'><span style={styleSpan}>{index + 1}.</span> {item?.label}</h1>
            {item?.value && <>
              <p style={paragraphStyle}>{item?.value}</p>
            </>}

            {item?.sub?.length > 0 && item?.sub?.map((sItem, sIndex) => {
              return <div className='mt-5 mb-2 ms-2'>
              {
                
                sItem?.label &&  
                <h1 style={subStyle} className='mb-2 mt-2'><span style={styleSpan}> {index+1}.{sIndex + 1}.</span> {sItem?.label}</h1>
              }
                {sItem?.value && <p style={paragraphStyle}>{sItem?.value}</p>}

                {sItem?.sub_points?.length > 0 && sItem?.sub_points?.map((spItem, spIndex) => {
                  return <div className='ms-5'>
                    <p style={paragraphStyle}><span style={subPointStyle}>{index+1}.{sIndex + 1}.{spIndex + 1}. {spItem?.label} </span>{spItem?.value}</p>

                    {spItem?.sub_points?.length > 0 && spItem?.sub_points?.map((spSItem,spIndex)=>{
                      return <p className='ms-5' style={paragraphStyle}>{spSItem?.value}</p>
                    })}
                  </div>
                })}
              </div>

            })}      </div>
        })}

      </div>
    </div>
  )
}

export default ProjectReport
