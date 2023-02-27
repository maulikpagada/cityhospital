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
import { deletedoctor, getdoctor, postdoctor, putdoctor } from '../../../redux/action/doctor.action';
import { useDispatch, useSelector } from 'react-redux';

function Doctor(props) {
    const [MedData, setMedData] = React.useState([]);
    const [did, setDid] = useState();
    const [eid, setEid] = useState();
    const [dopen, setDOpen] = React.useState(false);

    const DoctorData = useSelector(state => state.doctor);
    const dispatch = useDispatch();

    console.log(DoctorData.doctor);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleDClose = () => {
        setDOpen(false);
    };

    useEffect(() => {
        let localData = JSON.parse(localStorage.getItem("Doctor"));

        if (localData !== null) {
            setMedData(localData)
        }

        dispatch(getdoctor());
    }, [])

    const hendelDelet = (did) => {
        console.log(did);
        // let localData = JSON.parse(localStorage.getItem("Doctor"));

        // let dData = localData.filter((l) => l.id !== did);

        // localStorage.setItem("Doctor", JSON.stringify(dData));
        // setMedData(dData)
        console.log("delete");
       

        // dispatch(deletedoctor(values))

        dispatch(deletedoctor(did))
        handleDClose();
        setDid();
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Name', headerName: 'Name', width: 130 },
        { field: 'Description', headerName: 'Description', width: 130 },
        { field: 'Qualification', headerName: 'Qualification', width: 130 },
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
        Name: yup.string().required('please enter name'),
        Description: yup.string().required("please enter Description"),
        Qualification: yup.number().required("please enter Qualification").positive().integer()
    });

    const doctorData = (values) => {
        // let localData = JSON.parse(localStorage.getItem("Doctor"));

        // let idData = Math.round(Math.random() * 1000);
        // let Mdata = { ...values, id: idData }

        // if (localData !== null) {
        //     localData.push(Mdata)
        //     localStorage.setItem("Doctor", JSON.stringify(localData))
        //     setMedData(localData)
        // } else {
        //     setMedData([Mdata])
        //     localStorage.setItem("Doctor", JSON.stringify([Mdata]))
        // }
        // formikobj.resetForm()




        dispatch(postdoctor(values))





        // dispatch(postdoctor(values))
    }

    const formikobj = useFormik({
        initialValues: {
            Name: '',
            Description: '',
            price: ''
        },

        validationSchema: schema,
        onSubmit: values => {
            if (eid) {
                handleUpdateData(values)
            } else {
                doctorData(values)
            }
            setOpen(false);
        },
    })

    const { handleChange, handleBlur, handleSubmit, errors, touched, setFieldTouched, setValues, values, setFieldValue } = formikobj
    const handleUpdate = (values) => {
        console.log("handleupdate");
        setEid(values);
        setOpen(true);
        setValues(values);
    }


    const handleUpdateData = (values) => {

        // let localData = JSON.parse(localStorage.getItem("Doctor"));

        // let updateData = localData.map((l) => {

        //     if (l.id === values.id) {
        //         return values;
        //     } else {
        //         return l;
        //     }
        // })

        // localStorage.setItem("Doctor", JSON.stringify(updateData))

        // setMedData(updateData)
        setEid("");
        setValues();
        formikobj.resetForm()

        dispatch(putdoctor(values))
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
            <h1>Doctor component</h1>

            <div>
                <div>
                    <Button sx={{ variant: "outlined", border: "1px solid blue", left: "1300px" }} onClick={handleClickOpen}>
                        Add Doctor
                    </Button>
                </div>

                <Dialog open={open} onClose={handleClose}>
                    {
                        (eid) ? <DialogTitle>Update Doctor Data</DialogTitle> :
                            <DialogTitle>Add doctor</DialogTitle>
                    }

                    <Divider>
                        <Chip label="Add doctor" />
                    </Divider>

                    <DialogContent>
                        <Formik values={formikobj}>
                            <Form onSubmit={handleSubmit}>

                                <TextField
                                    margin="dense"
                                    id="Name"
                                    label="Doctor Name"
                                    type="text"
                                    name='Name'
                                    value={values.Name}
                                    fullWidth
                                    variant="filled"
                                    onChange={e => { setFieldTouched('Name'); handleChange(e) }}
                                    onBlur={handleBlur}
                                />
                                {errors.Name !== '' && touched.Name ? <p className='form-error'>{errors.Name}</p> : null}


                                <TextField
                                    margin="dense"
                                    id="Description"
                                    label="Description"
                                    type="text"
                                    name='Description'
                                    value={values.Description}
                                    fullWidth
                                    variant="filled"
                                    onChange={e => { setFieldTouched('Description'); handleChange(e) }}
                                    onBlur={handleBlur}
                                />
                                {errors.Description !== '' && touched.Description ? <p className='form-error'>{errors.Description}</p> : null}


                                <TextField
                                    margin="dense"
                                    id="Qualification"
                                    label="Qualification"
                                    type="text"
                                    name='Qualification'
                                    value={values.Qualification}
                                    fullWidth
                                    variant="filled"
                                    onChange={e => { setFieldTouched('Qualification'); handleChange(e) }}
                                    onBlur={handleBlur}
                                />

                                {errors.Qualification !== '' && touched.Qualification ? <p className='form-error'>{errors.Qualification}</p> : null}


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
                        Are sure to delete this doctor name.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => hendelDelet(did)}>Yes</Button>
                    <Button onClick={() => handleDClose()} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>


            <div style={{ height: 400, width: '80%', margin: '0px auto 0px auto' }}>
                <DataGrid
                    rows={DoctorData.doctor}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Doctor;