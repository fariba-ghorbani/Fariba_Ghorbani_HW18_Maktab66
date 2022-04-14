import React from 'react'
import { v4 as uuid } from 'uuid';

function Province({formik, provinceData}) {

    return (
        <>
            <div className="province d-flex flex-column flex-sm-row" >
                <select 
                    className={`select flex-fill w-100 ${!formik.values.province? "non-selected": ""}`}
                    name="province" 
                    onChange={formik.handleChange}
                    value={formik.values.province}> 

                    <option className="default" value="">استان</option>
                    {Object.keys(provinceData).map(prov => {
                        return <option key={uuid()}>{prov}</option>
                    })}
                </select>
                
                <select 
                    className={`select flex-fill w-100 ${!formik.values.city? "non-selected": ""}`}
                    name="city" 
                    onChange={formik.handleChange}
                    value={formik.values.city}>

                    {formik.values.province?
                    <><option className="default" value="" selected hidden>شهرستان</option>
                    {provinceData[formik.values.province].map(city => {
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
