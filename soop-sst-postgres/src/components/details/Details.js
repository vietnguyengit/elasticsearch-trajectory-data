import React, {useState} from "react";
import {useLocation} from 'react-router-dom'
import Header from "../header/Header";
import moment from 'moment';
import {
  Grid, Box, Button, Dialog, DialogContent, Link, DialogTitle, DialogActions,ListItemIcon,ListItemText,
  DialogContentText, List, ListItem} from "@material-ui/core";
import DescriptionIcon from '@material-ui/icons/Description';
import EmailIcon from '@material-ui/icons/Email';
import style from './Details.module.css'
import Map from "../map/maplibre/Map";
import Layers from "../map/maplibre/layers/Layers";
import AppConstant from "../../common/Constant";
import {Controls} from "../map/openlayer/control";
import NavigationControl from "../map/maplibre/controls/NavigationControl";
import ScaleControl from "../map/maplibre/controls/ScaleControl";
import MapboxDrawControl from "../map/maplibre/controls/MapboxDrawControl";
import PolygonLayer from "../map/maplibre/layers/PolygonLayer";
import DisplayCoordinate from "../map/maplibre/controls/DisplayCoordinate";
import VectorTileLayer from "../map/maplibre/layers/VectorTileLayer";

import Chart from './Chart'

const Details = (props) => {

  const location = useLocation();
  const state = location.state

  const [openCite, setOpenCite] = useState(false)

  const handleCiteClick = (event) => {
    setOpenCite(true);
  };

  const handleCiteClose = () => {
    setOpenCite(false);
  };

  return (
    <React.Fragment>
      <Header/>
      <Box className={style.details__outerbox}>
      <Grid
        container
        spacing={1}
        columns={12}
        alignItems="flex-start"
        justifyContent="center"
        style={{ minHeight: '10vh' }}>

        <Grid item xs={12}>
          <h1>SOOP SST From Postgres</h1>
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*  Contributing Organization :*/}
        {/*  <Button variant="contained" >Cite this record</Button>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12}>*/}
        {/*  <div className={style.details__innerbox_date}>{moment(state.value._source.tempExtentBegin.toUpperCase()).utc().format('DD MMM yyyy')} - {}</div>*/}
        {/*</Grid>*/}
        <Grid item xs={12}>
          <div className={style.details__innerbox_map}>
            <Map
              zoom = {AppConstant.MAP.DEFAULT_ZOOM}
              centerLongitude = {AppConstant.MAP.DEFAULT_LOCATION.lng}
              centerLatitude = {AppConstant.MAP.DEFAULT_LOCATION.lat}>
              <Layers> 
                {
                  // There is no need to use PolygonLayer as we use the VectorTileLayer, however you can use this PolygonLayer to draw
                  // shapes that you want 
                  // <PolygonLayer name="data-area" polygon={state.value._source.spatial_extent.coordinates}></PolygonLayer>
                }
                <VectorTileLayer/>
              </Layers>
              <Controls>
                <NavigationControl/>
                <ScaleControl/>
                {/*<MapboxDrawControl/>*/}
                <DisplayCoordinate/>
              </Controls>
            </Map>
          </div>
        </Grid>
        {/*<Grid item xs={9}>*/}
        {/*  <div className={style.details__innerbox_content}>*/}
        {/*    <h3>Abstract</h3>*/}
        {/*    {state.value._source.abstract}*/}
        {/*  </div>*/}
        {/*  <div className={style.details__innerbox_content}>*/}
        {/*    <h3>Credit</h3>*/}
        {/*    {state.value._source.credit}*/}
        {/*  </div>*/}
        {/*  <div className={style.details__innerbox_content}>*/}
        {/*    <h3>Parameters</h3>*/}
        {/*    <ul>*/}
        {/*      {state.value._source.parameter.map(v => <li>{v}</li>)}*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*  <Chart/>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={3}>*/}
        {/*  <div className={style.details__innerbox_content}>*/}
        {/*    <h3>Status</h3>*/}
        {/*    <ul>*/}
        {/*      {typeof state.value._source.status !== 'string' ? state.value._source.status.map(v => <li>{v}</li>) : state.value._source.status}*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*  <div className={style.details__innerbox_content}>*/}
        {/*    <h3>Download</h3>*/}
        {/*    <List className={style.details__innerbox_box}>*/}
        {/*      {state.value._source.link.map(v => {*/}
        {/*        const d = v.split('|');*/}
        {/*        return (*/}
        {/*          <ListItem disablepadding={"true"}>*/}
        {/*            <ListItemIcon><DescriptionIcon/></ListItemIcon>*/}
        {/*            <ListItem button component={"a"} href={d[2]}>*/}
        {/*              <ListItemText primary={d[0] + " (" +  d[1] + ")"}/>*/}
        {/*            </ListItem>*/}
        {/*          </ListItem>);*/}
        {/*        }*/}
        {/*      )}*/}
        {/*    </List>*/}
        {/*  </div>*/}
        {/*  <div className={style.details__innerbox_content}>*/}
        {/*    <h3>License</h3>*/}
        {/*    <img src={state.value._source.imageLink} onClick={handleCiteClick} alt={'license'}/>*/}
        {/*    <Dialog*/}
        {/*      open={openCite}*/}
        {/*      onClose={handleCiteClose}*/}
        {/*      aria-labelledby="alert-dialog-title"*/}
        {/*      aria-describedby="alert-dialog-description">*/}

        {/*      <DialogTitle id="alert-dialog-title">*/}
        {/*        <Link href={state.value._source.legalConstraints[1]}>{state.value._source.legalConstraints[0]}</Link>*/}
        {/*      </DialogTitle>*/}
        {/*      <DialogContent dividers>*/}
        {/*        {state.value._source.legalConstraints.slice(2).map(item => (*/}
        {/*          <DialogContentText spacing={2}>{item}</DialogContentText>*/}
        {/*        ))}*/}
        {/*      </DialogContent>*/}
        {/*      <DialogActions>*/}
        {/*        <Button onClick={handleCiteClose} autoFocus>OK</Button>*/}
        {/*      </DialogActions>*/}
        {/*    </Dialog>*/}
        {/*  </div>*/}
        {/*  <div className={style.details__innerbox_content}>*/}
        {/*    <h3>Contact</h3>*/}
        {/*    <List className={style.details__innerbox_box}>*/}
        {/*      {state.value._source.responsibleParty.map(v => {*/}
        {/*        const d = v.split('|');*/}
        {/*        return (*/}
        {/*          <ListItem disablepadding={"true"}>*/}
        {/*            <ListItemIcon><EmailIcon/></ListItemIcon>*/}
        {/*            <ListItem button component={"a"} href={"mailto:" + d[4]}>*/}
        {/*              <ListItemText primary={d[0] + " (" +  d[2] + ")"}/>*/}
        {/*            </ListItem>*/}
        {/*          </ListItem>*/}
        {/*        );*/}

        {/*      })}*/}
        {/*    </List>*/}
        {/*  </div>*/}
        {/*  <div className={style.details__innerbox_content} style={{marginTop: '10px'}}>*/}
        {/*    <a href={"https://catalogue-imos.aodn.org.au/geonetwork/srv/eng/catalog.search#/metadata/" + state.value._source.uuid}>View full metadata record (GeoNetwork)</a>*/}
        {/*  </div>*/}
        {/*</Grid>*/}
      </Grid>
      </Box>
    </React.Fragment>
  )
}

export default Details;