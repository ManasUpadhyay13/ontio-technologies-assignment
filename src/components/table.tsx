import DataTable from 'react-data-table-component';
import '../styles/table.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserDataType } from '../types/type';

const columns = [
    {
        name: 'Name',
        selector: (row: UserDataType) => row.name,
    },
    {
        name: 'Age',
        selector: (row: UserDataType) => row.age.toString(),
    },
    {
        name: 'Sex',
        selector: (row: UserDataType) => row.sex,
    },
    {
        name: 'Mobile Number',
        selector: (row: UserDataType) => row.mobile.toString(),
    },
    {
        name: 'Gov ID',
        selector: (row: UserDataType) => row.gov_id_type,
    },
    {
        name: 'Aadhar Number',
        selector: (row: UserDataType) => row.aadhar_card.toString(),
    },
    {
        name: 'Pan Number',
        selector: (row: UserDataType) => row.pan_card,
    },
    {
        name: 'Address',
        selector: (row: UserDataType) => row.address,
    },
    {
        name: 'State',
        selector: (row: UserDataType) => row.state,
    },
    {
        name: 'City',
        selector: (row: UserDataType) => row.city,
    },
    {
        name: 'Country',
        selector: (row: UserDataType) => row.country,
    },
    {
        name: 'Pincode',
        selector: (row: UserDataType) => row.pincode,
    },
];

export function Table() {
    const users = useSelector((store: any) => store.users);
    console.log("table", users, users.users.length)
    const navigate = useNavigate()
    const modifiedUsers = (users.users).map((user: UserDataType) => {
        if (user.gov_id_type === 'aadhar card') {
            return { ...user, pan_card: '-' };
        } else if (user.gov_id_type === 'pan card') {
            return { ...user, aadhar_card: '-' };
        }
        return user; // return the original user if gov_id_type is neither 'aadhar card' nor 'pan card'
    });


    return (
        <>
            <button
                onClick={() => navigate("/")}
            >Add Data</button>
            {
                (users.users.length > 0) ? (
                    <div className='table'>
                        <DataTable
                            columns={columns}
                            pagination
                            selectableRowsHighlight
                            data={modifiedUsers}
                        />
                    </div>
                ) :
                    (
                        <div className="no-data">
                            <h3>NO DATA</h3>
                        </div>
                    )
            }
        </>
    );
}