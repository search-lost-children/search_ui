import Input from "../../components/input/input";
import Button from "../../components/button/button";
import React, { useState, useEffect } from 'react';
import Select from "../../components/select/select";
import axios from "axios";

let rand_array = [
    {
    label: 'save', value:'value1'
    },
    {
    label: 'lost', value:'value1'
    },
    {
    label: 'save lost', value:'value1'
    }

]
function Login_organization (){
    const [selectOptions, setSelectOptions] = useState([]);

    useEffect(()=>{

        axios.get('http://example.com')
            .then(function (response) {
                // handle success
                //selectOptions(response)
                setSelectOptions(rand_array)
                console.log('1');
            })
            .catch(function (error) {
                // handle error
                setSelectOptions(rand_array)
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    })

    return (
        <div className="About">

            <h1>login organization</h1>
            <p>you already have akount in different organizations. Choose one to log in</p>
            <Select label={'Select Form'} value={'Value 1'} options={selectOptions} onChange={()=>{}}> </Select>
        </div>
    )
}

export default Login_organization