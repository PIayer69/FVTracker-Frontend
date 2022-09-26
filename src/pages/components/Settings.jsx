import { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import '../assets/settings.css';

const Settings = () => {
    const months = Array.from({length: 12}, (item, i) => new Date(0, i).toLocaleString('pl-PL', {month: 'long'}));
    const settlement_periods = {
        1: '1 miesiąc',
        2: '2 miesiące',
        6: '6 miesięcy',
        12: '12 miesięcy',
    };
    const rules = {
        metering: 'Net-Metering (stare zasady)',
        billing: 'Net-Billing (nowe zasady)',
    }
    const initialSettings = Object.freeze({
        id: 2,
        pv_power: 0,
        produced_start: 0,
        received_start: 0,
        sent_start: 0,
        settlement_month: 1,
        settlement_period: 1,
        rules: "metering",
        energy_buy_price: 0.80,
        energy_sell_price: 0.80,
        user: 1
    });
    const [ settings, setSettings ] = useState(initialSettings);

    useEffect(() => {
        axiosInstance
        .get('user/1/')
        .then(res => {
            setSettings(res.data)
        })
    }, []);

    const handleChange = (e) => {
        if (e.target.validity.valid){
            setSettings(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    };

    const saveSettings = (e) => {
        e.preventDefault();

        axiosInstance
        .patch('user/1/', JSON.stringify(settings))
        .then(res => {
            console.log(res)
            if(res.status === 200){
                console.log('success')
            }
        })
    }

  return (
    <div className="settings-container">
            <form>
                <div className="form-container">
                    <span className="form-section">
                        <div className="section-title">Ustawienia instalacji Fotowoltaiki</div>
                        
                        <label htmlFor="pv_power">Moc instalacji (kW)</label>
                        <input type="text" pattern="[0-9]*.[0-9]*" name="pv_power" value={settings.pv_power} onChange={(e) => handleChange(e)}/>
                        
                        <label htmlFor="produced_start">Falownik (wartość początkowa)</label>
                        <input type="text" pattern="[0-9]*" name="produced_start" value={settings.produced_start} onChange={(e) => handleChange(e)}/>
                        
                        <label htmlFor="received_start">Pobrane 1.8.0 (wartość początkowa)</label>
                        <input type="text" pattern="[0-9]*" name="received_start" value={settings.received_start} onChange={(e) => handleChange(e)}/>
                        
                        <label htmlFor="sent_start">Wysłane 2.8.0 (wartość początkowa)</label>
                        <input type="text" pattern="[0-9]*" name="sent_start" value={settings.sent_start} onChange={(e) => handleChange(e)}/>
                    </span>
                    <span className="form-section">
                        <div className="section-title">Ustawienia rozliczenia instalacji</div>
                        
                        <label htmlFor="settlement_month">Miesiąc rozliczenia</label>
                        <select name="settlement_month" value={settings.settlement_month} onChange={(e) => handleChange(e)}>
                            {
                                months.map((month, i) => <option key={i+1} value={i+1}>{month}</option>)
                            }
                        </select>
                        
                        <label htmlFor="settlement_period">Okres rozliczenia</label>
                        <select name="settlement_period" value={settings.settlement_period} onChange={(e) => handleChange(e)}>
                            {
                                Object.keys(settlement_periods).map((key) => <option key={key} value={key}>{settlement_periods[key]}</option>)
                            }
                        </select>

                        <label htmlFor="energy_buy_price">Cena prądu (zakup)</label>
                        <input type="text" pattern="[0-9]*.[0-9]*" name="energy_buy_price" value={settings.energy_buy_price.toFixed(2)} onChange={(e) => handleChange(e)}/>
                        
                        <label htmlFor="energy_sell_price">Cena prądu (sprzedaż)</label>
                        <input type="text" pattern="[0-9]*.[0-9]*" name="energy_sell_price" value={settings.energy_sell_price.toFixed(2)} onChange={(e) => handleChange(e)}/>
                        
                        <label htmlFor="rules">Zasady rozliczenia</label>
                        <select name="rules" value={settings.rules} onChange={(e) => handleChange(e)}>
                            {
                                Object.keys(rules).map((key) => <option key={key} value={key}>{rules[key]}</option>)
                            }
                        </select>
                    </span>
                </div>
                <input type="submit" onClick={(e) => saveSettings(e)} value="Zapisz"/>
            </form>
    </div>
  )
}

export default Settings