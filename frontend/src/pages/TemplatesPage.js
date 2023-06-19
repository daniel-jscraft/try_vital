import AppContext from '../etc/Context';
import { useContext } from "react";
import AppService from '../etc/AppService';
import { Button, Card, Typography, CardActions, Grid, CardContent } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ScienceIcon from '@mui/icons-material/Science';

// we should get this form the server
const PANEL_TEMPLATES = [
    {name: 'Female General Wellness', markersIds: [149, 148], collectionMethod: 'Dried Blood Spot'},
    {name: 'CMP', markersIds: [166, 173], collectionMethod: 'Serum'},
    {name: 'Lipid Panel', markersIds: [152, 167, 170, 173], collectionMethod: 'Serum'} 
]

export default function TemplatesPage() {
  const { userPanels, markers, setUserPanels } = useContext(AppContext);
  const navigate = useNavigate();

  const handleAddTemplates = (template) => {
    let uid = AppService.getNewUID()
    let newPanels = JSON.parse(JSON.stringify(userPanels));
    newPanels[uid] = {
        id: uid,
        ...template
    }
    setUserPanels(newPanels)
    AppService.saveUserPanels(newPanels)
    alert('A new panel will be created from this template!')
    navigate('/')
  }
  
  return (<div>
      <Typography gutterBottom variant="h4" component="div" className='centered'>
        Pick one template to add to your panels
      </Typography>
      <Grid container spacing={2}>
          {PANEL_TEMPLATES.map( 
            (t, i) => {
              return(<Grid item xs={6}> 
                <Card variant="outlined" key={i}>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div" className='centered'>
                        <ScienceIcon /> {t.name}  
                    </Typography>
                    <ul>
                      {t.markersIds.map(
                          (mId,i) => <li key={i}>{AppService.getMarkerName(mId, markers)}</li>
                      )}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => handleAddTemplates(t)}>Make panel from template</Button>
                  </CardActions>
                </Card>
              </Grid>)
            }
          )}
      </Grid>
    </div>
  );
}