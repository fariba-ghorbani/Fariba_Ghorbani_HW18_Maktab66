import React from 'react'
import { v4 as uuid } from 'uuid';

function Province({values, handleChange, provinceData}) {

    return (
        <>
            <div className="province d-flex flex-column flex-sm-row" >
                <select 
                    className={`select flex-fill w-100 ${!values.province? "non-selected": ""}`}
                    name="province" 
                    onChange={handleChange}
                    value={values.province}> 

                    <option className="default" value="">استان</option>
                    {Object.keys(provinceData).map(prov => {
                        return <option key={uuid()}>{prov}</option>
                    })}
                </select>
                
                <select 
                    className={`select flex-fill w-100 ${!values.city? "non-selected": ""}`}
                    name="city" 
                    onChange={handleChange}
                    value={values.city}>

                    {values.province?
                    <><option className="default" value="" selected hidden>شهرستان</option>
                    {provinceData[values.province].map(city => {
                        return <option key={uuid()}>{city}</option>
                    })}</>
                    : 
                    <><option className="default" value="" selected hidden>شهرستان</option>
                    <option value="" disabled>ابتدا استان محل زندگی خود را انتخاب کنید</option>
                    </>}
                </select>
            </div>
        </>
    )
}

export default Province;
