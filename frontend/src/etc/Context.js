import { createContext, useState, useEffect} from 'react';
import AppService from './AppService';
import axios from 'axios';

const AppContext = createContext({
    markers: [], 
    setMarkers: ()=> {} , 
    activePanel: {}, 
    setActivePanel: ()=> {}, 
    userPanels: {}, 
    setUserPanels: ()=> {}
});

export default AppContext

export const AppContextProvider = ({children}) => {  
    const [markers, setMarkers] = useState([])
    const [activePanel, setActivePanel] = useState({
        markersIds: [],
        name: '', 
        collectionMethod: ''
    })
    const savedUserPanels = AppService.getUserPanels()
    const [userPanels, setUserPanels] = useState(savedUserPanels || {})
    
    useEffect( () => {
    axios.get('/api')
        .then((data)=> setMarkers(data.data.data.markers))
        .catch(e => { })
    }, [])

    return (<AppContext.Provider value={{markers, setMarkers, activePanel, setActivePanel, userPanels, setUserPanels}}>
        {children}
    </AppContext.Provider>)
}
