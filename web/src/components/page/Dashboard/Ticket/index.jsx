import UseModal from "@/utils/hooks/UseModal";
import {
  TICKET_FILTER,
  TICKET_STATUS,
  TICKET_STATUS_COLOR,
  ALL_TICKET_TYPES,
  STATUS_TICKET,
} from "@/utils/constants/ticket_constants";
import React, { useEffect, useState } from "react";
import SubmitTicket from "./Submit";
import Modal from "@/components/Common/Modal";
import {
  DesktopFilter,
  MobileFilter,
} from "@/components/Common/Table/TableFilter";
import {
  useCancelTicketMutation,
  useGetMyTicketWithSortQuery,
} from "src/rest/ticket/ticket.query";
import { useQueryClient } from "@tanstack/react-query";
import { USER_TICKET } from "@/utils/constants/react-query";
import Link from "next/link";
import CustomTable from "@/components/Common/Table/CustomTable";
import TableHeader from "@/components/Common/Table/TableHeader";
import TableButton from "@/components/Common/Table/TableButton";
import { useRouter } from "next/router";
import Pagination from "@/components/Common/Pagination";

const TicketContent = () => {
  const router = useRouter();
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
  const [paginationOptions, setPaginationOptions] = useState({
    page: "1",
    limit: "3",
  });
  const sortOptions = {
    [TICKET_FILTER.limit]: paginationOptions.limit,
    [TICKET_FILTER.page]: paginationOptions.page,
    [TICKET_FILTER.title]: filterOptions.title,
    [TICKET_FILTER.status]: filterOptions.status,
    [TICKET_FILTER.type]: filterOptions.type,
    [TICKET_FILTER.field]: sortOption.sortBy,
    [TICKET_FILTER.orderBy]: sortOption.orderBy,
  };

  const { data } = useGetMyTicketWithSortQuery(sortOptions);
  const { mutate: cancelTicket } = useCancelTicketMutation();
  const queryClient = useQueryClient();
  const cancelHandler = (id) => {
    cancelTicket(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(USER_TICKET.WITH_SORT);
      },
    });
  };

  const columns = [
    {
      title: "ID",
      key: "key",
      render: (obj) => {
        return (
          <Link href={`ticket/${obj.key}`}>
            <div className="cursor-pointer text-blue-300">{obj.key}</div>
          </Link>
        );
      },
    },
    {
      title: "Recipient",
      key: "recipient",
      render: (obj) => {
        return (
          <Link href={`http://localhost:3005/`}>
            <div className="cursor-pointer text-blue-300">
              {obj.recipient.firstName + " " + obj.recipient.lastName}
            </div>
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
        const color = TICKET_STATUS_COLOR[obj.status.toString().toUpperCase()];
        return (
          <div
            className={`w-fit rounded-xl bg-[${color.background}] px-3 text-[${color.text}]`}
          >
            {obj.status}
          </div>
        );
      },
    },
    {
      title: "Created At",
      key: "createdAt",
      sortable: true,
    },
    {
      title: "Action",
      key: "action",
      render: (obj) => (
        <div className="flex">
          <div>
            <button
              onClick={() => router.push(`/dashboard/ticket/${obj.key}`)}
              className="v-btn"
            >
              Edit
            </button>
            {obj.status === TICKET_STATUS.PENDING && (
              <button
                onClick={() => cancelHandler(obj.key)}
                className="v-btn-gray"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (data) {
      setDataArray(data.tickets);
    }
  }, [data]);
  const ticketTypes = ALL_TICKET_TYPES;
  const ticketStatus = STATUS_TICKET;
  const dataSort = [
    {
      name: "title",
      type: "input",
      style: "w-full rounded-full bg-transparent py-[10px] pl-4 outline-none",
      value: "",
      data: [],
    },
    {
      name: "type",
      type: "select",
      style: "flex flex-row items-center justify-between mr-[-6rem]",
      value: "",
      data: ticketTypes,
    },
    {
      name: "status",
      type: "select",
      style: "flex flex-row items-center justify-between",
      value: "",
      data: ticketStatus,
    },
  ];
  return (
    <div className="m-4 flex-1 flex-col gap-8">
      <div
        className="m-1 flex flex-col overflow-auto rounded-lg "
        style={{
          backgroundColor: "#fff",
          boxShadow: "10px 10px 15px -3px rgba(0,0,0,0.2)",
        }}
      >
        <div className="card-body">
          <TableHeader
            title={"Tickets"}
            btnList={[
              <TableButton
                key={0}
                func={() => toggle()}
                label={"Create ticket"}
              />,
            ]}
          />
          <DesktopFilter
            onSubmit={(filterOptions) => {
              setFilterOptions(filterOptions);
              queryClient.invalidateQueries(USER_TICKET.WITH_SORT);
            }}
            dataSort={dataSort}
            className="hidden lg:flex"
          />
          <MobileFilter
            onSubmit={(filterOptions) => {
              setFilterOptions(filterOptions);
              queryClient.invalidateQueries(USER_TICKET.WITH_SORT);
            }}
            className="lg:hidden"
          />
          {dataArray && columns && (
            <>
              {/* TODO: RERENDERED 7 times fix pls */}
              <CustomTable dataSource={dataArray} columns={columns} />
              <Pagination
                total={data && Math.ceil(data.total / data.size)}
                onChange={(page) => {
                  setPaginationOptions({ ...paginationOptions, page });
                }}
              />
            </>
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
