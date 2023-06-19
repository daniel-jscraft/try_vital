import PanelEditor from "../components/PanelEditor";
import Table from "../components/Table";
import { useParams } from "react-router-dom";
import AppService from "../etc/AppService";
import AppContext from '../etc/Context';
import { useEffect, useContext } from "react";
import { Button, Card, Typography, CardActions, Grid, CardContent } from '@mui/material';


export default function EditPanelPage() {
  const {id} = useParams();
  const { activePanel, setActivePanel, userPanels } = useContext(AppContext);
  useEffect(()=> {
    const panel = AppService.fetchUserPanel(id, userPanels)
    setActivePanel(panel)
  }, [id])
  return (<>
      <Typography gutterBottom variant="h4" component="div" className='centered'>
        Panel editor
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <PanelEditor />
        </Grid>
        <Grid item xs={8}> 
          <Table />
        </Grid>
      </Grid>
    </>
  );
}
