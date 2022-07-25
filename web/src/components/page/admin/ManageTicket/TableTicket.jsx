import React, { useReducer } from "react";
import Approve from "./Approve";
import { useDispatch } from "react-redux";
const initSort = {
    createdAt: false,
    startDate: false,
    endDate: false,
  };
function reducer(state, action) {
switch (action.type) {
    case "SORT_CREATED_AT": {
    return { ...initSort, createdAt: action.data };
    }
    case "SORT_START_DATE": {
    state = { ...initSort };
    state.startDate = action.data;
    return state;
    }
    case "SORT_END_DATE": {
    state = { ...initSort };
    state.endDate = action.data;
    return state;
    }
    default:
    return state;
}
}
const TableTicket = React.memo((props) => {
    const tickets = props.tickets;
    console.log("TICKETS LIST ",tickets)
    const [state, dispatch] = useReducer(reducer, initSort);
    const { createdAt, startDate, endDate } = state;

    const sortHandle = (sortField, sortType) => {
    const sortOption = {
        sortField,
        sortType,
    };
    props.onSort(sortOption);
    };
    return (
        <table class="table dataTable-table" id="pc-dt-simple">
        <thead>
            <tr>
                <th data-sortable="" style={{width: "7.64706%"}}>
                    <a href="#" class="dataTable-sorter">New</a>
                </th>
                <th data-sortable="" style={{width: "19.5294%"}}>
                    <a href="#" class="dataTable-sorter">Title</a>
                </th>
                <th data-sortable="" style={{width: "11.7647%"}}>
                    <a href="#" class="dataTable-sorter">Ticket Code</a>
                </th>
                <th data-sortable="" style={{width: "16.4706%"}}>
                    <a href="#" class="dataTable-sorter">Employee</a>
                </th>
                <th data-sortable="" style={{width: "10.5882%"}}>
                    <a href="#" class="dataTable-sorter">Priority</a>
                </th>
                <th data-sortable="" style={{width: "12.2353%"}} class="">
                    <a href="#" class="dataTable-sorter">Date</a>
                </th>
                <th data-sortable="" style={{width: "16.1176%"}} class="asc">
                    <a href="#" class="dataTable-sorter">Created By</a>
                </th>
                <th data-sortable="" style={{width: "26.3529%"}}>
                    <a href="#" class="dataTable-sorter">Description</a>
                </th>
                <th width="200px" data-sortable="" style={{width: "13.5294%"}}>
                    <a href="#" class="dataTable-sorter">Action</a>
                </th>
            </tr>
        </thead>
        <tbody>
            
          
        </tbody>
    </table>
    )
})

const Ticket = (props) => {
    
    return (
        <tr>
            <td>
            </td>
            <td>Mollit similique eaq</td>
            <td>120641</td>
            <td>Darius Cooley
            </td>
            <td>
                <div className="badge bg-info p-2 px-3 rounded status-badde3">Medium</div>
            </td>
            <td>Jul 1, 2022</td>
            <td>Rajodiya Infotech</td>
            <td>
                <p style={{whiteSpace: "nowrap", width: "200px", overflow: "hidden",textOverflow: "ellipsis"}}>Ad ab ad voluptas ma</p>
            </td>
            <td class="Action">
                <span>
                    <div className="action-btn bg-primary ms-2">
                        <a href="https://demo.rajodiya.com/hrmgo-saas/ticket/45/reply"
                            className="mx-3 btn btn-sm  align-items-center" data-bs-toggle="tooltip" title=""
                            data-title="Replay" data-bs-original-title="Reply">
                            {/* <i className="ti ti-arrow-back-up text-white"></i> */}
                            <i class="fa-thin fa-pen"></i>
                        </a>
                    </div>
                    <div className="action-btn bg-danger ms-2">
                        <form method="POST" action="https://demo.rajodiya.com/hrmgo-saas/ticket/45"
                            accept-charset="UTF-8" id="delete-form-45"><input name="_method" type="hidden"
                                value="DELETE"/><input name="_token" type="hidden"
                                value="ic5TpBw03kwNUNigQGoF0mD8clI1vM162rUHOMBf"/>
                            <a href="#" class="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                data-bs-toggle="tooltip" title="" data-bs-original-title="Delete" aria-label="Delete"><i
                                    className="ti ti-trash text-white "></i></a>
                        </form>
                    </div>
                </span>
            </td>
        </tr>
    )
}

export default TableTicket;