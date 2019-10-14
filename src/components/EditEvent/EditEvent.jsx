import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/styles';
import {CardContent, Grid, FormControl, TextField, Button} from '@material-ui/core';

const styles = theme => ({
    rootDiv: {
        margin: '0px 100px 0px 100px'
    },
    grid: {
        justify: 'center'
    },
    button: {
        color: 'white',
        backgroundColor: '#457736',
        float: 'right',
        margin: '0px 130px 0px 0px'
    },
    textFields: {
        margin: '10px 10px 10px 30px',
        width: '400px'
    },
    description: {
        margin: '10px 10px 10px 30px',
        width: '925px'
    },
    times: {
        margin: '10px 10px 10px 30px'
    }
})

class EditEvent extends Component {

    state = {
        name: '',
        description: '',
        address: '',
        city: '',
        zip_code: '',
        event_url: '',
        id: Number(this.props.match.params.id)
    }

    componentDidMount () {
        this.props.dispatch({
            type: 'GET_EVENT_DETAILS',
            payload: Number(this.props.match.params.id)
        })
    }//end componentDidMount

    handleChange = (propertyName, event) => {
        this.setState ({
            [propertyName]: event.target.value,
            id: this.props.match.params.id
        })
        console.log(this.state)
    }//end handleChange

    handleSubmitButton = () => {
        console.log('clicked')
        this.props.dispatch({
            type: 'EDIT_EVENT',
            payload: {
                name: this.state.name || this.props.event.event_name,
                description: this.state.description || this.props.event.description,
                address: this.state.address || this.props.event.address,
                city: this.state.city || this.props.event.city,
                zip_code: this.state.zip_code || this.props.event.zip_code,
                event_url: this.state.event_url || this.props.event.event_url,
                id: Number(this.props.match.params.id)
            }
        })
        this.props.dispatch({
            type: 'GET_EVENT_DETAILS',
            payload: this.props.match.params.id
        })
        this.props.history.goBack()
    }//end handleSubmitButton

    render() {
        return (
            <div className={this.props.classes.rootDiv}>
                <h1>Edit Event</h1>
                {JSON.stringify(this.state)}
                <Grid container spacing={3} className={this.props.classes.grid}>
                    <Grid item xs={12}>
                        <CardContent>
                            <h2>Edit your upcoming event</h2>
                            <p>Please edit the fields that need to be edited!</p>
                            <FormControl variant="outlined">
                            {
                                this.props.event.map((ev) => {
                                    return <>
                                    <label className={this.props.classes.textFields}>Change the event name</label>
                                    <TextField
                                        className={this.props.classes.textFields}
                                        type="text"
                                        label={ev.name}
                                        placeholder={ev.event_name}
                                        variant="outlined"
                                        onChange={(event) => this.handleChange('name', event)}
                                    />
                                    <label className={this.props.classes.textFields}>Change the event description</label>
                                    <TextField
                                        className={this.props.classes.description}
                                        type="text"
                                        label={ev.description}
                                        variant="outlined"
                                        mutiline rows = "4"
                                            onChange={(event) => this.handleChange('description', event)}
                                    />
                                    <label className={this.props.classes.textFields}>Change event image url</label>
                                    <TextField
                                        className={this.props.classes.description}
                                        type="text"
                                        label={ev.event_url}
                                        variant="outlined"
                                        onChange={(event) => this.handleChange('event_url', event)}
                                    />
                                        <label className={this.props.classes.textFields}>Change date <br></br> The current date inputed is: {ev.start_date}</label>
                                       {/* <TextField
                                            className={this.props.classes.textFields}
                                            type="date"
                                            placeholder={ev.start_date}
                                            variant="outlined"
                                            onChange={(event) => this.handleChange(Number('date'), event)}
                                       /> */}
                                    <label className={this.props.classes.textFields}>Change address</label>
                                    <TextField
                                        className={this.props.classes.textFields}
                                        type="text"
                                        label={ev.address}
                                        variant="outlined"
                                        onChange={(event) => this.handleChange('address', event)}
                                    />
                                    <label className={this.props.classes.textFields}>Change city</label>
                                    <TextField
                                        className={this.props.classes.textFields}
                                        type="text"
                                        label={ev.city}
                                        variant="outlined"
                                        onChange={(event) => this.handleChange('city', event)}
                                    />
                                    <label className={this.props.classes.textFields}>Change state</label>
                                    <TextField
                                        className={this.props.classes.textFields}
                                        type="text"
                                        label={ev.state}
                                        variant="outlined"
                                        onChange={(event) => this.handleChange('state', event)}
                                    />
                                    <label className={this.props.classes.textFields}>Change zip code</label>
                                    <TextField
                                        className={this.props.classes.textFields}
                                        type="number"
                                        label={ev.zip_code}
                                        variant="outlined"
                                        onChange={(event) => this.handleChange('zip_code', event)}
                                    />
                                   
                                    </>
                                })
                            }
                              
                                
    
                            </FormControl>
                        </CardContent>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CardContent>
                            <Button className={this.props.classes.button} variant="contained"
                                onClick={this.handleSubmitButton}>Submit</Button>
                        </CardContent>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.event.eventDetails
    }
}

export default connect(mapStateToProps)(withStyles(styles)(EditEvent));