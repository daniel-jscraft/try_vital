let APP_PREFIX = 'VITAL_';

let generateUID = ()=> {
    let f = (Math.random() * 46656) | 0;
    let s = (Math.random() * 46656) | 0;
    f = ("000" + f.toString(36)).slice(-3);
    s = ("000" + s.toString(36)).slice(-3);
    return f + s;
}

const makeEmptyPanel = ()=> {
    const newId = generateUID()
    return {
        id: newId,
        markersIds: [],
        name: 'My new panel', 
        collectionMethod: 'mail'
    }
}

const AppService = {
    fetchUserPanel: (id, userPanels)=> {
        const panel = userPanels[id]
        return panel || makeEmptyPanel()
    },
    saveUserPanels: (panels) => {
        localStorage.setItem(
            APP_PREFIX + 'userPanels', 
            JSON.stringify(panels)
        )
    },
    getUserPanels: () => {
        let panels = localStorage.getItem(APP_PREFIX + 'userPanels')
        return JSON.parse(panels)
    },
    getMarkerNamesList: (ids, markers)=> {
        const namesList = ids.map(id => {
            const marker = markers.find(m => m.id === id)
            return marker?.name
        })
        return namesList.join(', ')
    },
    getMarkerName: (id, markers) => {
        const marker = markers.find(m => m.id === id)
        return marker?.name
    },
    getNewUID: () => generateUID()
}

export default AppService