import React, {Component} from 'react';
import './config.jsx';
import * as firebase from 'firebase';
import Preview from './preview.jsx';

export default class Database extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            classGroup: '',
            key: '',
            data: [],
            editing: false,
        }

        this.ref = firebase.database().ref().child('students');
    }

    componentDidMount () {
        this.getData();
    }

    getData = () => {
        this.ref.on('value', snapshot => {
            const obj = snapshot.val();
            const data = [];
            for (let key in obj) {
                obj[key].key = key;
                data.push(obj[key]);
            }
            this.setState({data});
            console.log(obj);
        });      
    }

    getValue = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    onSave = () => {
        const {name, email, classGroup, key, editing} = this.state;
        if (!editing) {
            const id = this.ref.push().key;
            this.ref.child(id).set({
                name, email, classGroup,
                key: id
            });
        }
        else {
            this.ref.child(key).set({
                name, email, classGroup, key,
                editing: false
            });
        }
        this.setState({
            name: '',
            email: '',
            classGroup: '',
            key: '',
            editing: false,
        });
    }
    
    onEdit = key => {
        this.ref.child(key).on('value', snapshot => {
            const obj = snapshot.val();
            if (obj) {
                const {name, email, classGroup, key} = obj;
                this.setState({
                    name, email, classGroup, key,
                    editing: true,
                });
            }
        })
    }
    
    onDismiss = key => {
        this.ref.child(key).set({
            [key]: null,
        });
        this.setState({
            name: '',
            email: '',
            classGroup: '',
            key: '',
            editing: false,
        });
    }
    
    render() {
        const {name, email, classGroup, editing, data} = this.state;
        return(
            <div className='container'>
                <table className='form-group'>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>
                                <input 
                                    type='text' name='name' value={name}
                                    className='form-control'
                                    onChange={this.getValue} />
                            </td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>
                                <input 
                                    type='email' name='email' value={email}
                                    className='form-control'
                                    onChange={this.getValue} />
                            </td>
                        </tr>
                        <tr>
                            <th>Class</th>
                            <td>
                                <input 
                                    type='text' name='classGroup' value={classGroup}
                                    className='form-control'
                                    onChange={this.getValue} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <input
                                    type='button' value={editing ? 'Update' : 'Submit'}
                                    className={editing ? 'btn btn-secondary' : 'btn btn-primary'}
                                    onClick={this.onSave} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {data.length > 0 ?
                    <Preview data={data} onEdit={this.onEdit} onDel={this.onDismiss} />
                : ''}
            </div>
        );
    }
}