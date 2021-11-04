import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees, updateEmployee, getAllEmployees } from '../../app/index'
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import SearchComponent from '../SearchComponent/SearchComponent'
import { Container, Pagination } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Masonry from 'react-masonry-css'

function EmployeeContainer({ employeeData, fetchEmployees, updateEmployee }) {

    const [employees, setEmployees] = useState(employeeData);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage, setEmployeesPerPage] = useState(20);
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const pageNumber = Math.ceil(employees.employees.length / employeesPerPage);

    const breakpoints = {
        default: 4,
        1600: 3,
        1100: 2,
        700: 1,
    }

    useEffect(() => {
        if (!employeeData.employees[0]) {
            fetchEmployees();
        }
    }, [])

    useEffect(() => {
        setEmployees(employeeData);
    }, [employeeData])

    function handleUpdateEmployee(sanitizedEmployeeInfo) {
        updateEmployee(sanitizedEmployeeInfo);

        if (!searchResults[0]) return;
        const newResults = searchResults.slice();
        let employeeIndex = null;

        for (let i = 0; i < newResults.length; i++) {
            if (newResults[i].uuid === sanitizedEmployeeInfo.uuid) {
                employeeIndex = i;
                break;
            }
        }
        newResults.splice(employeeIndex, 1, sanitizedEmployeeInfo);

        setSearchResults(newResults);
    }

    function onPageChange(e) {
        setCurrentPage(Number(e.target.textContent));
    }

    function onSearchChange(e) {
        if (!searchField) {
            setSearchField(e.target);
        } else {
            setSearchQuery(searchField.value.toLowerCase());
        }
    }

    function handleSearch(e) {
        e.preventDefault();

        if (!searchQuery) {
            setSearchResults([]);
            showNoResultsMessage();
            return;
        };

        const results = employeeData.employees.filter(employee => {
            if (employee['label']) {
                return employee['label'].toLowerCase().includes(searchQuery);
            }
        });

        if (results.length === 0) {
            showNoResultsMessage();
        }

        setSearchResults(results);
    }

    function clearSearchResults() {
        setSearchQuery('');
        setSearchResults([]);
        searchField.value = '';
        return;
    }

    function showNoResultsMessage() {
        document.getElementById('searchQueryResultMessage').style.display = "block";

        setTimeout(() => {
            document.getElementById('searchQueryResultMessage').style.display = "none";
        }, 3000);
    }

    return (
        <div>
            {employees.loading ?
                <h2>Loading</h2>
                : employees.error ? (
                    <h2>{employees.error}</h2>
                ) : (
                        <div>
                            <h2>Employee List</h2>
                            {employees && employees.employees &&
                                <>
                                    <SearchComponent onSearchChange={onSearchChange} handleSearch={handleSearch} />
                                    <Container data-testid="container-1">
                                        <h4 id="searchQueryResultMessage" style={{ display: "none", backgroundColor: "#8080807a", borderRadius: "1em", padding: "0.5em" }}>No results from this query.</h4>

                                        {searchResults.length > 0 &&
                                            <>
                                                <Button sx={{ marginBottom: "2em" }} variant="outlined" startIcon={<ArrowBackIcon />} onClick={clearSearchResults}>Back</Button>
                                                <Masonry
                                                    breakpointCols={breakpoints}
                                                    className="my-masonry-grid"
                                                    columnClassName="my-masonry-grid_column"
                                                >
                                                    {searchResults.map(employee => {
                                                        return <EmployeeCard
                                                            key={employee.uuid}
                                                            data-id={employee.uuid}
                                                            employee={employee}
                                                            handleUpdateEmployee={handleUpdateEmployee} />
                                                    })}
                                                </Masonry>
                                            </>
                                        }

                                        {searchResults.length === 0 &&
                                            <>
                                                <Masonry
                                                    breakpointCols={breakpoints}
                                                    className="my-masonry-grid"
                                                    columnClassName="my-masonry-grid_column"
                                                >
                                                    {currentEmployees.map(employee => {
                                                        return <EmployeeCard
                                                            key={employee.uuid}
                                                            data-id={employee.uuid}
                                                            employee={employee}
                                                            handleUpdateEmployee={handleUpdateEmployee} />
                                                    })}
                                                </Masonry>
                                                <Pagination
                                                    data-testid="pagination-1"
                                                    hideNextButton={true}
                                                    hidePrevButton={true}
                                                    color="primary"
                                                    sx={{
                                                        margin: "2em",
                                                        display: "flex",
                                                        justifyContent: "center"
                                                    }}
                                                    count={pageNumber}
                                                    onChange={onPageChange}
                                                />
                                            </>
                                        }

                                    </Container>
                                </>
                            }
                        </div>
                    )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        employeeData: state.employee,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployees: () => dispatch(fetchEmployees()),
        updateEmployee: (sanitizedEmployeeInfo) => dispatch(updateEmployee(sanitizedEmployeeInfo)),
        getAllEmployees: () => dispatch(getAllEmployees()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeContainer);
