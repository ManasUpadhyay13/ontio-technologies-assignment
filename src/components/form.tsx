import * as Yup from 'yup'
import { useEffect, useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getCountries } from '../utils/getCoutriesName';
import { Autocomplete } from '@mui/material';
import '../styles/form.css'

type FormProps = {
    active: Number
}

const Form = ({ active }: FormProps) => {


    const [gender, setGender] = useState('');
    const [countries, setCountries] = useState<any>([])
    const [govIdType, setGovIdType] = useState('');

    const schema = Yup.object().shape({
        name: Yup.string().min(3).required("Required, Min 3 characters"),
        age: Yup.number().positive().required("Required Postive Number"),
        sex: Yup.string(),
        mobile: Yup.number(),
        gov_id_type: Yup.string(),
        gov_id: Yup.string(),
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
            gov_id_type: "",
            gov_id: "",
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

    const { register } = methods;


    // let watchingValues

    // (active === 0) && watchingValues = watch(["name", "age", "sex", "mobile", "gov_id_type", "gov_id"])
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
        <div className='form'>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '35ch' },
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridTemplateRows: "repeat(2, 1fr)",
                }}
                autoComplete="off"
            >

                {
                    (active === 0) && (
                        <>
                            <TextField
                                label="Name"
                                required
                                variant="outlined"
                                {...register("name")}
                            />

                            <TextField
                                label="age"
                                required
                                type='number'
                                variant="outlined"
                                {...register("age")}
                            />

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={gender}
                                    label="Sex"
                                    {...register("sex")}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label="Mobile"
                                type='number'
                                {...register("mobile")}
                            />

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
                                    <TextField
                                        label="Enter 12 digits Aadhar Number"
                                        required
                                        {...register("gov_id")}
                                    />
                                )
                            }


                            {
                                (govIdType === "pan card") && (
                                    <TextField
                                        label="Enter 10 digits Pan Number"
                                        required
                                        {...register("gov_id")}
                                    />
                                )
                            }
                        </>
                    )
                }


                {
                    (active === 1) && (
                        <>
                            <TextField
                                required
                                label="Address"
                                {...register("address")}
                            />

                            <TextField
                                required
                                label="State"
                                {...register("state")}
                            />
                            <TextField
                                required
                                label="City"
                                {...register("city")}
                            />
                            <Autocomplete
                                disablePortal
                                id="controllable-states-demo"
                                options={countries}
                                {...register("country")}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Country" />}
                            />

                            <TextField
                                required
                                label="PinCode"
                                {...register("pincode")}
                            />

                        </>
                    )
                }

            </Box>
        </div>
    )
}

export default Form