import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Alerts = () => {
    const alertcontext = useContext(AlertContext);
    const { alerts } = alertcontext;
    return (
        alerts.length > 0 && alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`} >
                <i className="fas fa-info-circle" /> {alert.msg}
            </div>
        ))
    );
};

export default Alerts;
