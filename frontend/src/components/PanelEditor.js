import { useContext } from 'react';
import AppContext from '../etc/Context';
import { Button, TextField } from '@mui/material';
import AppService from '../etc/AppService';
import { useNavigate } from "react-router-dom";

function PanelEditor()  {
    const navigate = useNavigate();

    const { markers, activePanel, setActivePanel, userPanels, setUserPanels} = useContext(AppContext);

    const removeMarkerFromPanel = id => {
        const newSelected = activePanel.markersIds.filter( markerId => markerId !== id )
        setActivePanel(prev => ({
            ...prev,
            markersIds: newSelected
        }))
    }

    const savePanel = () => {
        let newPanels = JSON.parse(JSON.stringify(userPanels));
        newPanels[activePanel.id] = activePanel
        setUserPanels(newPanels)
        AppService.saveUserPanels(newPanels)
        alert('🧪 Panel saved!')
        navigate('/')
    }

    return (<>
        <TextField 
            id="standard-basic" 
            value={activePanel.name}
            onChange={(e) => {
                setActivePanel(prev => ({
                    ...prev,
                    name: e.target.value
                }))
            }} />
        <ul>
            {activePanel.markersIds.map(
                (markerId, i) => <li key={i}>
                    {markerId} {AppService.getMarkerName(markerId, markers)}
                    <Button onClick={()=> removeMarkerFromPanel(markerId)}>
                        Remove
                    </Button>
                </li>
            )}
        </ul>
        <Button variant="contained" onClick={savePanel}>💾 Save panel</Button>
    </>);
}

export default PanelEditor