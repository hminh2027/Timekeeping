import UseModal from "@/utils/hooks/UseModal";
import {
  TICKET_FILTER,
  TICKET_STATUS,
  TICKET_STATUS_COLOR,
} from "@/utils/constants/ticket_constants";
import React, { useEffect, useState } from "react";
import SubmitTicket from "./Submit";
import Modal from "@/components/Common/Modal";
import { DesktopFilter, MobileFilter } from "./Filters";
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
  const sortOptions = {
    [TICKET_FILTER.limit]: 10,
    [TICKET_FILTER.page]: 1,
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
      setDataArray(data);
    }
  }, [data]);

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
