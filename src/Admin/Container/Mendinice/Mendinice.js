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
import { deletemedicin, getmedicin, postmedicin, putmedicin } from '../../../redux/action/medicin.action';
import { useDispatch, useSelector } from 'react-redux';

function MedNew(props) {
    const [MedData, setMedData] = useState([]);
    const [did, setDid] = useState();
    const [eid, setEid] = useState();
    const [dopen, setDOpen] = React.useState(false);
    const MedicinData = useSelector(state => state.medicine);
    const dispatch = useDispatch();

    console.log(MedicinData.medicine);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleDClose = () => {
        setDOpen(false);
    };

    useEffect(() => {
        // let localData = JSON.parse(localStorage.getItem("medicine"));

        // if (localData !== null) {
        //     setMedData(localData)
        // }
        dispatch(getmedicin());
    }, [])

    const  medicineData = (values) => {
        // let localData = JSON.parse(localStorage.getItem("medicine"));

        // let idData = Math.round(Math.random() * 1000);
        // let Mdata = { ...values, id: idData }

        // if (localData !== null) {
        //     localData.push(Mdata)
        //     localStorage.setItem("medicine", JSON.stringify(localData))
        //     setMedData(localData)
        // } else {
        //     setMedData([Mdata])
        //     localStorage.setItem("medicine", JSON.stringify([Mdata]))
        // }
        // formikobj.resetForm()

        dispatch(postmedicin(values))
    }

    const handleUpdateData = (values) => {

        // let localData = JSON.parse(localStorage.getItem("medicine"));

        // let updateData = localData.map((l) => {

        //     if (l.id === values.id) {
        //         return values;
        //     } else {
        //         return l;
        //     }
        // })

        // localStorage.setItem("medicine", JSON.stringify(updateData))
        // setMedData(updateData)
        setEid("");
        setValues();
        formikobj.resetForm();

        dispatch(putmedicin(values));
    }


    const hendelDelet = (id) => {
        // let localData = JSON.parse(localStorage.getItem("medicine"));

        // let dData = localData.filter((l) => l.id !== did);

        // localStorage.setItem("medicine", JSON.stringify(dData));
        // setMedData(dData)
        
        dispatch(deletemedicin(id));
        handleDClose();
        setDid();
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'Mname', headerName: 'First name', width: 130 },
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
        Mname: yup.string().required('please enter name'),
        qua: yup.number().required("please enter quantity").positive().integer(),
        price: yup.number().required("please enter Price").positive().integer(),
        year: yup.number().required("please enter Year").positive().integer(),
    });


    const formikobj = useFormik({
        initialValues: {
            Mname: '',
            qua: '',
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
            <h1>Medision component</h1>

            <div >
                <div>
                    <Button sx={{ variant: "outlined", border: "1px solid blue", left: "1300px" }} onClick={handleClickOpen}>
                        Add Medicine
                    </Button>
                </div>


                <Dialog open={open} onClose={handleClose}>

                    {
                        (eid) ? <DialogTitle>Update Medicine Data</DialogTitle> :
                            <DialogTitle>Add medicine</DialogTitle>
                    }

                    <Divider>
                        <Chip label="Add medicine" />
                    </Divider>

                    <DialogContent>
                        <Formik values={formikobj}>
                            <Form onSubmit={handleSubmit}>

                                <TextField
                                    margin="dense"
                                    id="Mname"
                                    label="Medision Name"
                                    type="text"
                                    name='Mname'
                                    value={values.Mname}
                                    fullWidth
                                    variant="filled"
                                    onChange={e => { setFieldTouched('Mname'); handleChange(e) }}
                                    onBlur={handleBlur}
                                />
                                {errors.Mname !== '' && touched.Mname ? <p className='form-error'>{errors.Mname}</p> : null}


                                <TextField
                                    margin="dense"
                                    id="qua"
                                    label="Qua"
                                    type="number"
                                    name='qua'
                                    value={values.qua}
                                    fullWidth
                                    variant="filled"
                                    onChange={e => { setFieldTouched('qua'); handleChange(e) }}
                                    onBlur={handleBlur}
                                />
                                {errors.qua !== '' && touched.qua ? <p className='form-error'>{errors.qua}</p> : null}

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
                        Are sure to delete this medicine.
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
                    rows={MedicinData.medicine}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>

        </div >
    );
}

export default MedNew;