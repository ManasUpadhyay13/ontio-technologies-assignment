import * as React from 'react';
import { useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getCountries } from '../utils/getCoutriesName';
import { Autocomplete, FormHelperText } from '@mui/material';
import '../styles/form.css'
import { useDispatch } from 'react-redux';
import { addUser } from '../store/reducers/reducer';
import { useNavigate } from 'react-router-dom';

const steps = ['Personal Details', 'Address Details'];

const FormContainer = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [gender, setGender] = useState('');
    const [countries, setCountries] = useState<any>([])
    const [govIdType, setGovIdType] = useState('');
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const schema = Yup.object().shape({
        name: Yup.string().min(3, "Required, Min 3 characters").required("Kindly Enter the name"),
        age: Yup.number().positive("Age should be positive").required("Please enter the age"),
        sex: Yup.string().required("Please select a valid gender"),
        mobile: Yup.number().positive("Mobile number should be positive").min(10, "Mobile should be 10 digits"),
        gov_id_type: Yup.string().required("Please select one option"),
        aadhar_card: Yup.number().positive("Aadhar should be positive").min(12, "Aadhar Number must be of 12 digits"),
        pan_card: Yup.string().length(10, "Pan Number must be of 10 digits"),
        address: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        country: Yup.string(),
        pincode: Yup.string()
    })

    const defaultValues = useMemo(
        () => ({
            name: "",
            age: 1,
            sex: "male",
            mobile: 0,
            gov_id_type: "aadhar card",
            aadhar_card: 0,
            pan_card: "0000000000",
            address: "",
            state: "",
            city: "",
            country: "",
            pincode: ""
        }),
        []
    )

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues,
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = methods;


    const onSubmit = handleSubmit((data) => {
        console.log(data)
        if (activeStep === 0) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            dispatch(addUser(data))
            navigate("/table")
        }
    })


    const handleNext = () => {
        onSubmit()
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
    };


    const handleGovIdType = (event: SelectChangeEvent) => {
        setGovIdType(event.target.value as string);
    };


    const getCountriesData = async () => {
        const data = await getCountries()
        setCountries(data)
    }

    useEffect(() => {
        getCountriesData()
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length && (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                </React.Fragment>
            )}


            <div className="form" >

                <Box
                    component="form"
                    onSubmit={onSubmit}
                    sx={{
                        '& > :not(style)': { m: 2, width: '35ch' },
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gridTemplateRows: "repeat(2, 1fr)",
                    }}
                    autoComplete="off"
                >
                    {
                        (activeStep === 0) && (
                            <>

                                <FormControl>
                                    <TextField
                                        label="Name"
                                        required
                                        variant="outlined"
                                        {...register('name')}
                                        error={!!errors.name}
                                        helperText={errors.name?.message || ''}
                                    />
                                </FormControl>

                                <FormControl>
                                    <TextField
                                        label="Age"
                                        required
                                        type='number'
                                        variant="outlined"
                                        {...register('age')}
                                        error={!!errors.age}
                                        helperText={errors.age?.message || ''}
                                    />
                                </FormControl>

                                <FormControl fullWidth required>
                                    <InputLabel id="demo-simple-select-error-label" error={!!errors.sex}>Sex</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-error-label"
                                        value={gender}
                                        label="Sex"
                                        {...register("sex")}
                                        onChange={handleChange}
                                        error={!!errors.sex}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors.sex?.message || ''}</FormHelperText>
                                </FormControl>

                                <FormControl>
                                    <TextField
                                        label="Mobile Number"
                                        required
                                        type='number'
                                        variant="outlined"
                                        {...register('mobile')}
                                        error={!!errors.mobile}
                                        helperText={errors.mobile?.message || ''}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Goverment Id Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        value={govIdType}
                                        label="Goverment Id Type"
                                        {...register("gov_id_type")}
                                        onChange={handleGovIdType}
                                    >
                                        <MenuItem value="aadhar card">Aadhar Card</MenuItem>
                                        <MenuItem value="pan card">PAN Card</MenuItem>
                                    </Select>
                                </FormControl>


                                {
                                    (govIdType === "aadhar card") && (

                                        <FormControl>
                                            <TextField
                                                label="Aadhar Card Number"
                                                required
                                                variant="outlined"
                                                type='number'
                                                {...register('aadhar_card')}
                                                error={!!errors.aadhar_card}
                                                helperText={errors.aadhar_card?.message || ''}
                                            />
                                        </FormControl>
                                    )
                                }


                                {
                                    (govIdType === "pan card") && (
                                        <FormControl>
                                            <TextField
                                                label="Pan Card Number"
                                                required
                                                variant="outlined"
                                                {...register('pan_card')}
                                                error={!!errors.pan_card}
                                                helperText={errors.pan_card?.message || ''}
                                            />
                                        </FormControl>
                                    )
                                }
                            </>
                        )
                    }


                    {
                        (activeStep === 1) && (
                            <>
                                <TextField
                                    label="Address"
                                    {...register("address")}
                                />

                                <TextField
                                    label="State"
                                    {...register("state")}
                                />
                                <TextField
                                    label="City"
                                    {...register("city")}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="controllable-states-demo"
                                    options={countries}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} {...register("country")} label="Country" />}
                                />

                                <TextField
                                    type='number'
                                    label="PinCode"
                                    {...register("pincode")}
                                />

                            </>
                        )
                    }
                </Box>

            </div>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: "space-between" }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>

                {
                    activeStep === 0 ? (
                        <Button onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button type='submit' onClick={onSubmit}>
                            Finish
                        </Button>
                    )
                }

            </Box>

        </Box>
    )
}

export default FormContainer