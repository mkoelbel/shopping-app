import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Location = () => {
    const { dispatch } = useContext(AppContext);
    const changeLocation = (val) => {
        dispatch({
            type: 'CHANGE_LOCATION',
            payload: val
        });
    };
    return (
        <div className='alert alert-secondary'>
            Location {
                <select name="location" id='location' onChange={event => changeLocation(event.target.value)}>
                    <option value='$'>US($)</option>
                    <option value='CAD'>Canada(CAD)</option>
                </select>
            }
        </div>
    );
};

export default Location;