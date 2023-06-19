import AppContext from '../etc/Context';
import { useContext } from "react";
import AppService from '../etc/AppService';
import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ScienceIcon from '@mui/icons-material/Science';
import EditIcon from '@mui/icons-material/Edit';

export default function HomePage() {
  const { userPanels, markers, setUserPanels } = useContext(AppContext);
  const navigate = useNavigate();

  const handleEditPanel = id => navigate('/panel/'+id)

  const handleDeletePanel = id => {
    if(window.confirm("Delete this panel?")) {
      let updatedUserPanels = { ...userPanels }
      delete updatedUserPanels[id]
      setUserPanels(updatedUserPanels)
      AppService.saveUserPanels(updatedUserPanels)
    }
  }

  const handleAddNewPanel = () => navigate('/panel/new')

  const renderPanels = ()=> (<>
    <Typography gutterBottom variant="h4" component="div">Your panels</Typography>
      <List>
        {Object.values(userPanels).map( 
          (p, i) => ( 
            <ListItem key={i}
              secondaryAction={<span>
                <IconButton onClick={() => handleEditPanel(p.id)} edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeletePanel(p.id)} edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </span>}
            >
              <ListItemAvatar>
                <Avatar><ScienceIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={p.name}
                secondary={AppService.getMarkerNamesList(p.markersIds, markers)}
              />
            </ListItem>
          )
        )}
      </List>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center">
          <Button size="large" onClick={handleAddNewPanel}  variant="outlined" startIcon={<ScienceIcon />}>
            Add new panel
          </Button>
          <Typography gutterBottom variant="subtitle1" component="p">
            or pick one from our <Link to='/templates'>predefined panel</Link> templates
          </Typography>
      </Grid>
  </>)

  const renderEmptyState = () =>(<Grid container direction="column" alignItems="center" justifyContent="center" className='empty'>
    <Typography align="center" gutterBottom variant="h6" component="div">Welcome 👋 Let's get started!</Typography>
    <br/>
    <Button size="large" onClick={handleAddNewPanel}  variant="outlined" startIcon={<ScienceIcon />}>
      Add new panel
    </Button>
    <Typography gutterBottom variant="subtitle1" component="p">
      or pick one from our <Link to='/templates'>predefined panel</Link> templates
    </Typography>
  </Grid>)
  
  return (<>
      {Object.keys(userPanels).length ? 
        renderPanels():
        renderEmptyState()
      }
    </>
  );
}