import UseModal from "@/utils/hooks/UseModal";
import { TICKET_FILTER } from "@/utils/constants/ticket_constants";
import React, { useState, useEffect, useMemo } from "react";
import SubmitTicket from "./Submit";
import Modal from "@/components/Common/Modal";
import Header from "./TicketHeader";
import { TicketList } from "./TicketList";
import { DesktopFilter, MobileFilter } from "./Filters";
import {
  useGetMeTicketQuery,
  useGetMyTicketWithSortQuery,
} from "src/rest/ticket/ticket.query";
import { useQueryClient } from "@tanstack/react-query";
import { USER_TICKET } from "@/utils/constants/react-query";
import CustomTable from "@/components/Common/Table/CustomTable";
import Link from "next/link";

const TicketContent = () => {
  const [data, setData] = useState();
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
  const { data: ticketsWithSort } = useGetMyTicketWithSortQuery(sortOptions);

  useEffect(() => {
    const arr = [];
    console.log(data);
    ticketsWithSort.map((ticket) => {
      const [content, id] = ticket;
      arr.push({
        key: id,
        recipient: `${content.recipient.firstName} ${content.recipient.lastName}`,
        title: content.title,
        status: content.status,
        createdAt: content.createdDate,
        action: "",
      });
    });
    setData(arr);
  });

  const columns = [
    { title: "ID", key: "key" },
    {
      title: "Recipient",
      key: "recipient",
      render: (obj) => (
        <Link href="http://localhost:3005/">{<div>{obj.recipient}</div>}</Link>
      ),
    },
    {
      title: "Title",
      key: "title",
      render: (obj) => (
        <div className="w-fit rounded-xl bg-[#fff5e6] px-3 text-[#ff9f0a]">
          {obj.title}
        </div>
      ),
    },
    {
      title: "Type",
      key: "type",
      render: (obj) => (
        <div className="w-fit rounded-xl bg-[#e5f7ed] px-3 text-[#00b14f]">
          {obj.type}
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (obj) => (
        <div className="w-fit rounded-xl bg-[#e5f7ed] px-3 text-[#00b14f]">
          {obj.status}
        </div>
      ),
    },
    {
      title: "Created At",
      key: "createdAt",
      render: (obj) => (
        <div className="w-fit rounded-xl bg-[#e5f7ed] px-3 text-[#00b14f]">
          {obj.createdAt}
        </div>
      ),
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

  return (
    <div className="flex-col flex-1 gap-8 m-4">
      <div
        className="flex flex-col m-1 overflow-auto rounded-lg "
        style={{
          backgroundColor: "#fff",
          boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
        }}
      >
        <Header toggleModal={toggle} />
        <DesktopFilter
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
        />

        {/* <TicketList
          tickets={ticketsWithSort}
          onSort={(option) => setSortOption(option)}
          sortOption={sortOption}
        /> */}

        {data && columns && <CustomTable dataSource={data} columns={columns} />}
      </div>

      <Modal isShowing={isShowing} hide={toggle} closeButton={true}>
        <SubmitTicket hide={toggle} />
      </Modal>
    </div>
  );
};

export default TicketContent;
