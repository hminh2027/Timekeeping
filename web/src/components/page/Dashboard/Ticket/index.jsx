import UseModal from "@/utils/hooks/UseModal";
import { TICKET_FILTER } from "@/utils/constants/ticket_constants";
import React, { useEffect, useState } from "react";
import SubmitTicket from "./Submit";
import Modal from "@/components/Common/Modal";
// import { DesktopFilter, MobileFilter } from "./Filters";
import { DesktopFilter, MobileFilter } from "@/components/Common/Table/TableFilter";
import { useGetMyTicketWithSortQuery } from "src/rest/ticket/ticket.query";
import { useQueryClient } from "@tanstack/react-query";
import { USER_TICKET } from "@/utils/constants/react-query";
import Link from "next/link";
import CustomTable from "@/components/Common/Table/CustomTable";
import TableHeader from "@/components/Common/Table/TableHeader";
import TableButton from "@/components/Common/Table/TableButton";
import { ALL_TICKET_TYPES, STATUS_TICKET } from "@/utils/constants/ticket_constants";

const TicketContent = () => {
  const [dataArray, setDataArray] = useState();
  const { isShowing, toggle } = UseModal();
  const [filterOptions, setFilterOptions] = useState({
    title: "",
    type: "",
    status: "",
  });
  const [sortOption, setSortOption] = useState({
    sortBy: "createdAt",
    orderBy: false,
  });

  const { data } = useGetMyTicketWithSortQuery(sortOptions);
  const queryClient = useQueryClient();
  const sortOptions = {
    [TICKET_FILTER.limit]: 10,
    [TICKET_FILTER.page]: 1,
    [TICKET_FILTER.title]: filterOptions.title,
    [TICKET_FILTER.status]: filterOptions.status,
    [TICKET_FILTER.type]: filterOptions.type,
    [TICKET_FILTER.field]: sortOption.sortBy,
    [TICKET_FILTER.orderBy]: sortOption.orderBy,
  };

  useEffect(() => {
    if (data) {
      setDataArray(data);
    }
  }, [data]);

  const TICKET_STATUS = {
    REJECTED: {
      background: "#ffedeb",
      text: "#ff564c",
    },
    APPROVED: {
      background: "#e5f7ed",
      text: "#00b14f",
    },
    CANCELLED: {
      background: "#f5f5f5",
      text: "#9f9f9f",
    },
    PENDING: {
      background: "#fff5e6",
      text: "#ff9f0a",
    },
  };

  const columns = [
    { title: "ID", key: "key" },
    {
      title: "Recipient",
      key: "recipientName",
      render: (obj) => {
        console.log(obj);
        return (
          <Link href="http://localhost:3005/">
            <a className={``}>{obj.recipientName}</a>
          </Link>
        );
      },
    },
    {
      title: "Title",
      key: "title",
    },
    {
      title: "Type",
      key: "type",
    },
    {
      title: "Status",
      key: "status",
      render: (obj) => {
        // const color = TICKET_STATUS[obj.status.toString().toUpperCase()].text;
        // console.log(color);
        return (
          <div
            className={`w-fit rounded-xl bg-[${TICKET_STATUS.PENDING.background}] px-3 text-[${TICKET_STATUS.PENDING.text}]`}
          >
            {TICKET_STATUS["PENDING"].text}
          </div>
        );
      },
    },
    {
      title: "Created At",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (obj) => (
        <div className="w-fit rounded-xl bg-[#e5f7ed] px-3 text-[#00b14f]">
          {obj.action}
        </div>
      ),
    },
  ];
  const [ticketTypes, setTicketTypes] = useState(ALL_TICKET_TYPES);
  const [ticketStatus, setTicketStatus] = useState(STATUS_TICKET);
  const dataSort = [
    {
      name: "search",
      type: "input",
      style: "w-full rounded-full bg-transparent py-[10px] pl-4 outline-none",
      value: "",
      data: []
    },
    {
      name: "type",
      type: "select",
      style: "flex flex-row items-center justify-between mr-[-6rem]",
      value: "",
      data: ticketTypes
    },
    {
      name: "status",
      type: "select",
      style: "flex flex-row items-center justify-between",
      value: "",
      data: ticketStatus
    }
  ]

  return (
    <div className="flex-col flex-1 gap-8 m-4">
      <div
        className="flex flex-col m-1 overflow-auto rounded-lg "
        style={{
          backgroundColor: "#fff",
          boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
        }}
      >
        <div className="card-body">
          <TableHeader
            title={"Tickets"}
            btnList={[
              <TableButton func={() => toggle()} label={"Create ticket"} />,
            ]}
          />
          {/* <DesktopFilter
            onSubmit={(filterOptions) => {
              setFilterOptions(filterOptions);
              queryClient.invalidateQueries(USER_TICKET.WITH_SORT);
            }}
            className="hidden lg:flex"
          />
          <MobileFilter
            onSubmit={(filterOptions) => {
              setFilterOptions(filterOptions);
              queryClient.invalidateQueries(USER_TICKET.WITH_SORT);
            }}
            className="lg:hidden"
          /> */}
          <DesktopFilter
            onSubmit={(filterOptions) => {
              setFilterOptions(filterOptions)
              queryClient.invalidateQueries(USER_TICKET.WITH_SORT);
            }}
            className="hidden lg:flex"
            dataSort = {dataSort}
          />
          <MobileFilter
            onSubmit={(filterOptions) => {
              setFilterOptions(filterOptions)
              queryClient.invalidateQueries(USER_TICKET.WITH_SORT);
            }}
            className="lg:hidden"
            dataSort = {dataSort}
          />
          {dataArray && columns && (
            <CustomTable dataSource={dataArray} columns={columns} />
          )}
        </div>
      </div>

      <Modal isShowing={isShowing} hide={toggle} closeButton={true}>
        <SubmitTicket hide={toggle} />
      </Modal>
    </div>
  );
};

export default TicketContent;
