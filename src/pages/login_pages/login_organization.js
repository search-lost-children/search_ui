import Input from "../../components/input/input";
import Button from "../../components/button/button";
import React, { useState, useEffect } from 'react';
import Select from "../../components/select/select";
import { useHistory } from "react-router-dom";
import axios from "axios";

let array = [
    {
        name: '', id:'1'
    },
    {
        name: 'save', id:'2'
    },
    {
        name: 'lost', id:'3'
    },
    {
        name: 'save lost', id:'4'
    }

];


let rand_array = array.map(function (el){
    return(
        {
            label: el.name, value: el.id
        }
    )

})
function Login_organization (){
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectOrg, setSelectOrg] = useState('');
    const history  = useHistory();


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
    });

    let user_organization = (
        {
            organization: selectOrg
        }
    )

   function fill_check(selectVal) {
       if (selectVal === ''){
           alert('empty field')
       }else{
           axios.post('api/v1/users', user_organization);
          // history.push('/')
       }
   }

    return (
        <div className="About">

            <h1>login organization</h1>
            <p>you already have account in different organizations. Choose one to log in</p>
            <Select label={'Select Form'} value={selectOrg} options={selectOptions} onChange={(val)=>{setSelectOrg(val)}}> </Select>
            <Button value={'submit'} onClick={()=>{fill_check(selectOrg)}}></Button>
        </div>
    )
}

export default Login_organization