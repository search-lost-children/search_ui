import React, {useState} from 'react';
import './documentation.css'
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import Radio from "../../components/radio/radio";
import TextArea from "../../components/textarea/textarea";
import Select from "../../components/select/select";
import CheckBox from "../../components/checkbox/checkbox";
import GridTable from '@nadavshaar/react-grid-table';
import ModalWindow from "../../components/ModalWindow/ModalWindow";

function DocumentationPage() {
    const [inputVal, setInputVal] = useState('');
    const [textAreaVal, setTextAreaVal] = useState('');
    const [radioVal, setRadioVal] = useState('');
    const [selectVal, setSelectVal] = useState('');
    const [checkboxVal, setCheckboxVal] = useState(false);

    const Username = ({tableManager, value, field, data, column, colIndex, rowIndex}) => {
        return (
            <div className='rgt-cell-inner' style={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                <img src={data.avatar} alt="user avatar"/>
                <span className='rgt-text-truncate' style={{marginLeft: 10}}>{value}</span>
            </div>
        )
    }
    const columns = [
        {
            id: 1,
            field: 'username',
            label: 'Username',
            cellRenderer: Username,
        },
        {
            id: 2,
            field: 'gender',
            label: 'Gender',
        },
        {
            id: 3,
            field: 'last_visited',
            label: 'Last Visited',
            sort: ({a, b, isAscending}) => {
                let aa = a.split('/').reverse().join(),
                    bb = b.split('/').reverse().join();
                return aa < bb ? isAscending ? -1 : 1 : (aa > bb ? isAscending ? 1 : -1 : 0);
            }
        },
        {
            id: 4,
            field: 'test',
            label: 'Score',
            getValue: ({value, column}) => value.x + value.y
        }
    ];
    const rows = [
        {
            "id": 1,
            "username": "wotham0",
            "gender": "Male",
            "last_visited": "12/08/2019",
            "test": {"x": 1, "y": 2},
            "avatar": "https://robohash.org/atquenihillaboriosam.bmp?size=32x32&set=set1"
        },
        {
            "id": 2,
            "username": "dbraddon2",
            "gender": "Female",
            "last_visited": "16/07/2018",
            "test": {"x": 3, "y": 4},
            "avatar": "https://robohash.org/etsedex.bmp?size=32x32&set=set1"
        },
        {
            "id": 3,
            "username": "dridett3",
            "gender": "Male",
            "last_visited": "20/11/2016",
            "test": {"x": 5, "y": 8},
            "avatar": "https://robohash.org/inimpeditquam.bmp?size=32x32&set=set1"
        }
    ];

    function Actions({close}) {
        return (<Button
            className="button"
            value={'Close'}
            onClick={() => {
                console.log('modal closed ');
                close();
            }}
        >
        </Button>)
    }


    return (<div className={"documentationPage"}>
        <div>
            <h3>Input</h3>
            <pre>
                <code>
                    <div>
                        {'<Input type="login" label={"Login"} value={value} onChange={onChange}></Input>'}
                    </div>
                    <div>type='??????(??????????, ??????????, ???????????? ?? ????.)'</div>
                    <div>label='?????????? ?????? ????????????'</div>
                    <div>value='?????????????? ???????????? ???????????? ????-??????????????????'</div>
                    <div>onChange='?????? ?????????? ???????????? ?????????? ?????? ??????????????'</div>
                </code>
            </pre>
            <Input type='login' label={'Login'} value={inputVal} onChange={(val) => setInputVal((val))}></Input>
        </div>
        <div>
            <h3>Button</h3>
            <pre>
                <code>
                    {'<Button value={\'PUSH ME\'} variant={\'outlined\'} color={\'default\'} onClick={()=>{alert(\'button is clicked\')}}></Button>'}
                    <div>value='?????????????? ???????????? ????????????'</div>
                    <div>variant: outlined (??????????????), contained (?? ????????????????)</div>
                    <div>color: default (??????????), primary (??????????), secondary (??????????????)</div>
                    <div>label='?????????? ?????? ????????????'</div>
                    <div>onClick='?????? ?????????? ???????????? ???????????? ?????? ??????????????' </div>
                </code>
            </pre>

            <Button value={'PUSH ME'} onClick={() => {
                alert('button is clicked')
            }}></Button>
        </div>


        <div>
            <h3>TextArea</h3>
            <pre>
                <code>
                    {'<TextArea type=\'text\' label={\'Text Area\'} value={\'text here...\'} onChange={()=>{}}></TextArea>'}
                    <div>type='??????(??????????, ???????????????? ?? ????.)'</div>
                    <div>label='?????????? ?????? ???????????????????? ????????'</div>
                    <div>value='?????????????? ???????????????????? ???????? ????-??????????????????'</div>
                    <div>onChange='?????? ?????????? ???????????? ?????????????????? ???????? ?????? ??????????????'</div>
                </code>
            </pre>
            <TextArea type='text' label={'Text Area'} value={textAreaVal} onChange={(val) => {
                setTextAreaVal(val)
            }}></TextArea>
        </div>

        <div>
            <h3>Select</h3>
            <pre>
                <code>
                    {'<Select label={\'Select Form\'} value={\'Value 1\'} options={[{name: "option1"}]} onChange={()=>{}}> </Select>'}
                    <div>label='?????????? ?????? ??????????????????'</div>
                    <div>value='???????????????? ??????????????????'</div>
                    <div>options=[] - ?? options ?????????? ???????????????? ????????????! ????????????????-??????????</div>
                    <div>onChange='?????? ?????????? ???????????? ???????????? ?????? ???????????? ??????????'</div>
                </code>
            </pre>
            <Select
                label={'Select Form'}
                value={selectVal}
                options={[{label: '', value: ''}, {label: '?????? ?????????? 1', value: 'value1'}, {
                    label: '?????? ?????????? 2',
                    value: 'value2'
                }]}
                onChange={(val) => {
                    setSelectVal(val)
                }}></Select>
        </div>

        <div>
            <h3>CheckBox</h3>
            <pre>
                <code>
                    {'<CheckBox name={\'CheckBox\'} checked={checked} label={\'CheckBox\'} onChange={onClick}></CheckBox>'}
                    <div> name='?????? ????????????????'</div>
                    <div>checked=true - ???????? ?????????????? ????????????</div>
                    <div>label='?????????? ?????? ????????????????'</div>
                    <div>onChange='?????? ?????????? ???????????? ?????????????? ?????? ??????????????'</div>
                </code>
            </pre>
            <CheckBox name={'CheckBox'} checked={checkboxVal} label={'CheckBox'} onChange={(val) => {
                setCheckboxVal(val)
            }}></CheckBox>
        </div>

        <div>
            <h3>Modal Window</h3>
            <pre>
                <code>
                    {'<ModalWindow trigger={<Button value={\'OPEN MODAL\'}></Button>} title={\'Modal Title\'} actions={Actions}>'}
                    <br/>{'<div> You can put your text here </div>'}
                    <br/>{'</ModalWindow>'}
                    <div>trigger=????, ?????? ?????????? ?????????????????????? ?????????????????? ????????(?? ???????????? ???????????? ?????? ?????????????? ???? ????????????)</div>
                    <div>title='??????????????????'</div>
                    <div>actions=?????????? ????????????????(?? ???????????? ???????????? ???????????? ????????????????, ?????????? ???????? ?????? ???????? Popup)</div>
                    <div>???????????? div ???????????????? ???????????????????? ????????</div>
                 </code>
            </pre>
            <ModalWindow
                trigger={<Button value={'OPEN MODAL'}></Button>}
                title={'Modal Title'}
                actions={Actions}
            >
                <div>
                    <i>You can put your text here, like this:</i><br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                    Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                    delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                    <br/>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                    commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                    explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                </div>
            </ModalWindow>
        </div>
        <div>
            <h3>Radio</h3>
            <pre>
                <code>
                    {'<Radio name={\'RadioButton\'} value={\'val1\'} checked={false} label={\'Radio Button\'} onClick={()=>{}}></Radio>'}
                    <div>name='?????? ??????????-??????????????'</div>
                    <div>value= ???????????????? ??????????</div>
                    <div>checked=false-???????? ??????????-???????????? ????????????</div>
                    <div>label='?????????? ?????? ??????????-??????????????'</div>
                    <div>onChange='?????? ?????????? ???????????? ??????????-???????????? ?????? ??????????????'</div>
                </code>
            </pre>
            <Radio value={'val1'} onChange={(val) => {
                setRadioVal(val)
            }} label={'Radio Button1'} name={'RadioButton'} checked={radioVal === 'val1'}></Radio>
            <Radio value={'val2'} onChange={(val) => {
                setRadioVal(val)
            }} label={'Radio Button2'} name={'RadioButton'} checked={radioVal === 'val2'}></Radio>
        </div>
        <div>
            <h3>Table</h3>
            <pre>

            </pre>
            <GridTable columns={columns} rows={rows}></GridTable>
        </div>

    </div>);
}

export default DocumentationPage