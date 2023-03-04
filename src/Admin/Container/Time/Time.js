import React from 'react';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { Checkbox, Chip, Divider, FormControlLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useDispatch, useSelector } from 'react-redux';
import { deletetime, gettime, posttime, puttime } from '../../../redux/action/time.action';

function Time(props) {
    const [MedData, setMedData] = useState([]);
    const [did, setDid] = useState();
    const [eid, setEid] = useState();
    const [dopen, setDOpen] = React.useState(false);
    const TimeData = useSelector(state => state.time)
    const dispatch = useDispatch();

    console.log(TimeData.time);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleDClose = () => {
        setDOpen(false);
    };

    useEffect(() => {
        dispatch(gettime())
    }, [])

    const  medicineData = (values) => {
        dispatch(posttime(values))
    }

    const handleUpdateData = (values) => {
        setEid("");
        setValues();
        formikobj.resetForm();
        dispatch(puttime(values))
    }


    const hendelDelet = (id) => {
        dispatch(deletetime(id))
        handleDClose();
        setDid();
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'name', width: 130 },
        { field: 'price', headerName: 'price', width: 130 },
        { field: 'year', headerName: 'year', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => {
                return (
                    <>
                        <IconButton onClick={() => { setDid(params.row.id); setDOpen(true) }} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>

                        <IconButton
                            onClick={() => { handleUpdate(params.row) }}

                            aria-label="delete">
                            <ModeEditIcon />
                        </IconButton>
                    </>
                )
            }
        }

    ];

    let schema = yup.object().shape({
        id:yup.number().required("please enter id").positive().integer(),
        name: yup.string().required('please enter name'),
        price: yup.number().required("please enter Price").positive().integer(),
        year: yup.number().required("please enter Year").positive().integer(),
    });


    const formikobj = useFormik({
        initialValues: {
            id: '',
            name: '',
            price: '',
            year: ''
        },

        validationSchema: schema,
        onSubmit: values => {

            if (eid) {
                handleUpdateData(values)
            } else {
                medicineData(values)
            }
            setOpen(false);
        },
    });


    const { handleChange, handleBlur, handleSubmit, errors, touched, setFieldTouched, setValues, values, setFieldValue } = formikobj


    const handleUpdate = (values) => {
        setEid(values);
        setOpen(true);
        setValues(values);
    }


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div>
        <h1>Time component</h1>

        <div >
            <div>
                <Button sx={{ variant: "outlined", border: "1px solid blue", left: "1300px" }} onClick={handleClickOpen}>
                    Add Time
                </Button>
            </div>


            <Dialog open={open} onClose={handleClose}>

                {
                    (eid) ? <DialogTitle>Update Time Data</DialogTitle> :
                        <DialogTitle>Add Time</DialogTitle>
                }

                <Divider>
                    <Chip label="Add time" />
                </Divider>

                <DialogContent>
                    <Formik values={formikobj}>
                        <Form onSubmit={handleSubmit}>

                            <TextField
                                margin="dense"
                                id="id"
                                label="course-id"
                                type="text"
                                name='id'
                                value={values.id}
                                fullWidth
                                variant="filled"
                                onChange={e => { setFieldTouched('id'); handleChange(e) }}
                                onBlur={handleBlur}
                            />
                            {errors.id !== '' && touched.id ? <p className='form-error'>{errors.id}</p> : null}


                            <TextField
                                margin="dense"
                                id="name"
                                label="course-name"
                                type="text"
                                name='name'
                                value={values.name}
                                fullWidth
                                variant="filled"
                                onChange={e => { setFieldTouched('name'); handleChange(e) }}
                                onBlur={handleBlur}
                            />
                            {errors.name !== '' && touched.name ? <p className='form-error'>{errors.name}</p> : null}

                            <TextField
                                margin="dense"
                                id="price"
                                label="price"
                                type="number"
                                name='price'
                                value={values.price}
                                fullWidth
                                variant="filled"
                                onChange={e => { setFieldTouched('price'); handleChange(e) }}
                                onBlur={handleBlur}
                            />
                            {errors.price !== '' && touched.price ? <p className='form-error'>{errors.price}</p> : null}

                            <TextField
                                margin="dense"
                                id="year"
                                label="year"
                                type="number"
                                name='year'
                                value={values.year}
                                fullWidth
                                variant="filled"
                                onChange={e => { setFieldTouched('year'); handleChange(e) }}
                                onBlur={handleBlur}
                            />
                            {errors.year !== '' && touched.year ? <p className='form-error'>{errors.year}</p> : null}

                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                {
                                    (eid) ? <Button type="submit">Update</Button> :
                                        <Button type="submit">Add</Button>
                                }

                            </DialogActions>

                        </Form>
                    </Formik>
                </DialogContent>

            </Dialog>
        </div>

        <Dialog
            open={dopen}
            onClose={handleDClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are sure to delete this time.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleDClose()}>Disagree</Button>
                <Button onClick={() => hendelDelet(did)} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>

        <div style={{ height: 400, width: '80%', margin: '0px auto 0px auto' }}>
            <DataGrid
                rows={TimeData.time}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>

    </div >
    );
}

export default Time;