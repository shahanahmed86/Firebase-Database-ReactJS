import React from 'react';

export default function Preview ({data, onEdit, onDel}) {
    return(
        <div>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(val => {
                        return(
                            <tr key={val.key}>
                                <td>{val.name}</td>
                                <td>{val.email}</td>
                                <td>{val.classGroup}</td>
                                <td>
                                    <input 
                                        type='button' value='Edit'
                                        className='btn btn-secondary'
                                        onClick={() => onEdit(val.key)} />
                                    <input 
                                        type='button' value='Delete'
                                        className='btn btn-danger'
                                        onClick={() => onDel(val.key)} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}