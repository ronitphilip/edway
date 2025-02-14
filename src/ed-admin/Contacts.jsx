import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { getAllEnquiresAPI, updateEnquiryAPI } from '../api/allAPI';
import DashboardSkeleton from './DashboardSkeleton ';

const Contacts = () => {
    const token = sessionStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("contacted");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllEnquiresAPI(headers).then((res) => {
            if (res.status === 200) {
                setContacts(res.data);
                filterContacts(res.data, selectedStatus);
            }
        }).finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        filterContacts(contacts, selectedStatus);
    }, [contacts, selectedStatus]);

    const filterContacts = (enquires, status) => {
        const filtered = enquires.filter((enquiry) => enquiry.status === status);
        setFilteredContacts(filtered);
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setSelectedStatus(newStatus);
        filterContacts(contacts, newStatus);
    };

    const updateEnquiryStatus = async (id, newStatus) => {
        try {
            const res = await updateEnquiryAPI(id, { status: newStatus }, headers);
            if (res.status === 200) {
                const updatedEnquires = contacts.map((contact) =>
                    contact._id === id ? { ...contact, status: newStatus } : contact
                );
                setContacts(updatedEnquires);

                filterContacts(updatedEnquires, selectedStatus);
            }
        } catch (error) {
            console.error("Error updating alert status:", error);
        }
    };

    if (isLoading) return <DashboardSkeleton />;

    return (
        <>
            <div className="row ed-minheight">
                <div className="col-lg-3">
                    <Sidebar />
                </div>

                <div className="col-lg-9">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="mt-3">Enquires</h1>
                        <select className="form-select w-auto" value={selectedStatus} onChange={handleStatusChange}>
                            <option value="contacted">Show Contacted</option>
                            <option value="pending">Show Pending</option>
                            <option value="rejected">Show Rejected</option>
                        </select>
                    </div>

                    <div>
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th style={{ width: '5%' }}>#</th>
                                    <th style={{ width: '10%' }}>Name</th>
                                    <th style={{ width: '10%' }}>Mobile</th>
                                    <th style={{ width: '10%' }}>Location</th>
                                    <th style={{ width: '10%' }}>Qualification</th>
                                    <th style={{ width: '20%' }}>Preference</th>
                                    <th style={{ width: '10%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredContacts.length > 0 ? (
                                        filteredContacts.map((enquiry, index) => (
                                            <tr key={enquiry._id}>
                                                <td style={{ width: '5%' }}>{index + 1}</td>
                                                <td style={{ width: '10%' }}>{enquiry?.name}</td>
                                                <td style={{ width: '10%' }}>{enquiry?.mobileNumber}</td>
                                                <td style={{ width: '10%' }}>{enquiry?.locality}</td>
                                                <td style={{ width: '10%' }}>{enquiry?.highestQualification}</td>
                                                <td style={{ width: '20%' }}>{enquiry?.preferredCollege}, {enquiry?.preferredCourse}</td>
                                                <td style={{ width: '10%' }}>
                                                    <select className="form-select" value={enquiry?.status} onChange={(e) => updateEnquiryStatus(enquiry._id, e.target.value)}>
                                                        <option value="contacted">Contacted</option>
                                                        <option value="pending">Pending</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">No contacts found</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contacts;
